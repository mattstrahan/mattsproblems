import { FetchMarkdown } from "../components/Markdown";
import WelcomePage from "./Welcome.md"

export default function Welcome() {
    return (
        <FetchMarkdown>{WelcomePage}</FetchMarkdown>
        
    )
}