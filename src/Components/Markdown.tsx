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
    onFillinChange: Function;
}

export type MarkdownFillinsProps = ReactMarkdownOptions & MarkdownFillinsAdditionalProps;

// Process the supplied fillins
export function MarkdownFillins(props: MarkdownFillinsProps) {
    const katexoptions: KatexOptions = { trust: (context) => context.command === '\\htmlId' }; // This is our secret fillin replacer
    const rehypeplugins: PluggableList = [[rehypeKatex, katexoptions], rehypeFillins];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
    const newProps:ReactMarkdownOptions = {
        ...props,
        remarkPlugins: remarkplugins,
        rehypePlugins: rehypeplugins,
        components: {
            input: ({ node, ...inputprops }) => 
                {
                    // Only change the fillins
                    if(inputprops.id && inputprops.id.startsWith("fillin_"))
                        return <input size={1} onChange={value => { props.onFillinChange(inputprops.id, value) }} style={{ color: 'blue' }} {...inputprops} />
                    else
                        return <input {...inputprops} />
                }
        }
    };
    return <ReactMarkdown {...newProps} />;
}

// Our regular Markdown generator without Fillins. Here we turn on Katex and Github extensions.
export default function Markdown(props: ReactMarkdownOptions) {
    const rehypeplugins: PluggableList = [rehypeKatex];
    const remarkplugins: PluggableList = [remarkGfm, remarkMath];
    const newProps: ReactMarkdownOptions = {
        ...props,
        remarkPlugins: remarkplugins,
        rehypePlugins: rehypeplugins
    };
    return <ReactMarkdown {...newProps} />;
}