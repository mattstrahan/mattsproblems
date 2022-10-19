import { Box } from "@mui/material";
import aboutMMP from './AboutMMP.md';
import aboutFAQ from './AboutFAQ.md';
import aboutStuffWeUse from './AboutStuffWeUse.md';
import { FetchMarkdown } from "../components/Markdown";

export default function About() {
    return (
        <Box>
        <FetchMarkdown children={aboutMMP} />
        <FetchMarkdown children={aboutFAQ} />
        <FetchMarkdown children={aboutStuffWeUse} />
        </Box>
    )
}