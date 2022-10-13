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
import { TextFieldProps, Typography } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';

export interface reHypeFillinsOptions {
}

// This is the secret sauce for fill ins. It looks for spans with a HTML ID of "fillin_" and changes them to inputs
// Because we've set \\htmlId in Katex options, we can look for spans with that ID and capture them.
/** @type {import('unified').Plugin<[Options?]>} */
export function rehypeFillins(options: reHypeFillinsOptions){
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
}

// Process the supplied fillins
export function MarkdownFillins(props: ReactMarkdownOptions & MarkdownFillinsAdditionalProps) {
    const katexoptions: KatexOptions = { trust: (context) => context.command === '\\htmlId' }; // This is our secret fillin replacer
    const rehypeplugins: PluggableList = [[rehypeKatex, katexoptions], rehypeFillins];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
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
                        return <Input id={inputprops.id} size="small" onChange={value => {if(props.onFillinChange !== undefined) props.onFillinChange(inputprops.id, value) }} style={{ height: "1em", padding: "2px 2px" }} {...props.additionalInputProps} />
                    } else
                        return <input {...inputprops} />
                }
        }
    };
    return <ReactMarkdown {...newProps} />;
}

// Process the supplied fillins
export function FetchMarkdown(props: ReactMarkdownOptions) {
    const [markdownText, setMarkdownText] = React.useState<string>("");
    useEffect( () => {
        fetch(props.children).then((response) => response.text()).then((text) => {
            setMarkdownText(text)
          })
     });
    const katexoptions: KatexOptions = { trust: (context) => context.command === '\\htmlId' }; // This is our secret fillin replacer
    const rehypeplugins: PluggableList = [[rehypeKatex, katexoptions], rehypeFillins];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
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
            p: ({ node, ...props }) => <Typography variant='body1' paragraph {...props} />
        }
    };
    return <ReactMarkdown {...newProps} children={markdownText} />;
}

// Our regular Markdown generator without Fillins. Here we turn on Katex and Github extensions.
export default function Markdown(props: ReactMarkdownOptions) {
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
            p: ({ node, ...props }) => <Typography variant='body1' paragraph {...props} />
        }
    };
    return <ReactMarkdown {...newProps} />;
}