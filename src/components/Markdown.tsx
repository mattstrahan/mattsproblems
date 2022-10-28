import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex, {Options as KatexOptions} from 'rehype-katex'
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { Options as ReactMarkdownOptions } from 'react-markdown';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import hast from 'hast';
import mdast from 'mdast';
import { visit } from 'unist-util-visit'
import Input, { InputProps } from '@mui/material/Input';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';
import JXG from 'jsxgraph';
import { JSGFigureStore } from '../classes/Problem';

// The type for useKatex hasn't been implemented yet. I've asked typescript to ignore.
// @ts-ignore
JXG.Options.text.useKatex=true;

interface reHypeFillinsOptions {
}

// This is the secret sauce for fill ins. It looks for spans with a HTML ID of "fillin_" and changes them to inputs
// Because we've set \\htmlId in Katex options, we can look for spans with that ID and capture them.
/** @type {import('unified').Plugin<[Options?]>} */
function rehypeFillins(options: reHypeFillinsOptions){
    return function (tree: mdast.Root) {
        visit(tree, 'element', (node: hast.Element, index: number) => {
            if (node.properties && node.properties.id && node.properties.id.toString().startsWith("fillin_")) {
                node.tagName = "input"
            }
        })
    }
}

export interface MarkdownFillinsAdditionalProps {
    onFillinChange?: Function;
    additionalInputProps?: InputProps;
    autoFocus?: boolean;
}

// Process the supplied fillins
export function MarkdownFillins(props: ReactMarkdownOptions & MarkdownFillinsAdditionalProps) {
    const katexoptions: KatexOptions = { trust: (context) => context.command === '\\htmlId' }; // This is our secret fillin replacer
    const rehypeplugins: PluggableList = [[rehypeKatex, katexoptions], rehypeFillins];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
    let firstAutoFocus=false;
    const newProps:ReactMarkdownOptions = {
        ...props,
        remarkPlugins: remarkplugins,
        rehypePlugins: rehypeplugins,
        components: {
            // MUI components
            h1: ({ node, ...props }) => <Typography variant='h1' paragraph {...props} />,
            h2: ({ node, ...props }) => <Typography variant='h2' paragraph {...props} />,
            h3: ({ node, ...props }) => <Typography variant='h3' paragraph {...props} />,
            h4: ({ node, ...props }) => <Typography variant='h4' paragraph {...props} />,
            h5: ({ node, ...props }) => <Typography variant='h5' paragraph {...props} />,
            h6: ({ node, ...props }) => <Typography variant='h6' paragraph {...props} />,
            p: ({ node, ...props }) => <Typography variant='body1' paragraph {...props} />,
            // Fillins
            input: ({ node, ...inputprops }) => 
                {
                    // Only change the fillins
                    if(inputprops.id && inputprops.id.startsWith("fillin_")) {
                        return <Input
                            autoFocus={props.autoFocus && !firstAutoFocus ? firstAutoFocus=true : false}
                            id={inputprops.id}
                            size="small"
                            onChange={value => {if(props.onFillinChange !== undefined) props.onFillinChange(inputprops.id, value) }}
                            style={{ height: "1.2em", fontSize:'1em', width: '1.5em', padding: "3px 3px", backgroundColor: "#eee", alignContent: 'center' }}
                            {...props.additionalInputProps} />
                    } else
                        return <input {...inputprops} />
                }
        }
    };
    return <ReactMarkdown {...newProps} />;
}

export interface MarkdownFiguresAdditionalProps {
    jsgFigureStore?: { [key: string]: JSGFigureStore }
}

// Our regular Markdown generator without Fillins. Here we turn on Katex and Github extensions.
export default function Markdown(props: ReactMarkdownOptions & MarkdownFiguresAdditionalProps) {
    useEffect(() => {
        if(props.jsgFigureStore) {
            for (let bid in props.jsgFigureStore) {
                try {
                let board = JXG.JSXGraph.initBoard(bid, {showCopyright:false,
                    showNavigation: props.jsgFigureStore[bid]?.attributes?.showNavigation ? true : false,
                    registerEvents: props.jsgFigureStore[bid]?.attributes?.registerEvents ? true : false});
                board.jc.parse(props.jsgFigureStore[bid].logic);
                }
                catch(exception){
                    //TODO show exception
                }
            }
        }
    })

    const rehypeplugins: PluggableList = [rehypeKatex];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
    const newProps: ReactMarkdownOptions = {
        ...props,
        remarkPlugins: remarkplugins,
        rehypePlugins: rehypeplugins,
        components: {
            // MUI components
            h1: ({ node, ...props }) => <Typography variant='h1' paragraph {...props} />,
            h2: ({ node, ...props }) => <Typography variant='h2' paragraph {...props} />,
            h3: ({ node, ...props }) => <Typography variant='h3' paragraph {...props} />,
            h4: ({ node, ...props }) => <Typography variant='h4' paragraph {...props} />,
            h5: ({ node, ...props }) => <Typography variant='h5' paragraph {...props} />,
            h6: ({ node, ...props }) => <Typography variant='h6' paragraph {...props} />,
            p: ({ node, ...props }) => <Typography variant='body1' paragraph {...props} />,
            img: ({ node, ...iprops }) => 
                {
                    // Only change the fillins
                    if(props.jsgFigureStore !== undefined
                        && iprops.src === "jsxgraph_figurestore"
                        && iprops.alt !== undefined
                        && iprops.alt in props.jsgFigureStore) {
                            return <div id={iprops.alt} style={{ width: "100%", height: 500 }}>Board</div>
                    } else
                        return <img {...iprops} />
                }
        }
    };
    return <ReactMarkdown {...newProps} />;
}


// Fetch a markdown file from the server then process it as markdown
export function FetchMarkdown(props: ReactMarkdownOptions) {
    const [markdownText, setMarkdownText] = React.useState<string>("");
    useEffect( () => {
        fetch(props.children).then((response) => response.text()).then((text) => {
            setMarkdownText(text)
          })
     });
    return <Markdown {...props} children={markdownText} />;
}
