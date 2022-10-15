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
    /*
    return (
        <Box>
            <Grid container spacing={4}>
                <Grid xs={12}>
            <Typography paragraph variant="h2">About Matt's Maths Problems</Typography>
            <Typography paragraph variant="body1">
                Matt's Maths Problems will generate endless questions for you,
                with a new problem every time.
                    </Typography>
                </Grid>
                <Grid>
                    <Paper>
                        <Box padding={3}>
            <Typography paragraph variant="h3">Frequently Asked Questions</Typography>
            <Typography paragraph variant="h4">Are you collecting all my data?</Typography>
            <Typography paragraph variant="body1">
                No. All of Matt's Maths Problems runs in your browser, so nothing should leave your computer.
            </Typography>
            <Typography paragraph variant="body1">
                If that's wrong please let us know right away because something has gone very very bad.
            </Typography>
                            <Typography paragraph variant="h4">Do you know if I get a question wrong?</Typography>
            <Typography paragraph variant="body1">
                I can't tell if you got a question wrong, but if I could I would tell you
                that I'm proud of you for trying! The more you practice and the more you try
                the more you learn.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <Box padding={3}>
            <Typography paragraph variant="h3">Stuff that we use</Typography>
            <Typography paragraph variant="body1">
                If I'm going to be honest, Matt's Maths Problems uses far more stuff that
                Matt didn't write than stuff that Matt did write. If I were to instead call
                it "Matt and React and Mozilla and Unified and Khan Academy and all the other's Maths Problems"
                then the name would be far more accurate.
            </Typography>
            <Typography paragraph variant="body1">
                Unfortunately that would be a really long name, so instead I just took full credit and named it after myself.
            </Typography>
            <Typography paragraph variant="body1">
                Matt's Maths Problems wouldn't be possible without these projects (and more):
            </Typography>
            <ol>
                <li>React: It allows all this to run in your web browser.</li>
                <li>Cloudflare and Github: They host this all for free which is pretty great.</li>
                <li>Mozilla Nunjucks: With Nunjucks we can make questions and answers which is really helpful for writing problems.</li>
                <li>MUI: Without MUI the app would look like a toaster. MUI makes it look like a really really fancy and responsive toaster.</li>
                <li>Khan Academy's Katex: A maths equation needs to look cool, and Katex makes it look cool.</li>
                <li>Unified, React Markdown, Rehype, Remark, and a whole bunch of React plugins allow us to make questions with 
                    headings and bold and all that formatting.
                </li>
                            </ol>
                        </Box>
                    </Paper>
            </Grid>
            </Grid>


        </Box>
        
    )
    */
}