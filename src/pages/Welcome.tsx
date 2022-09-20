import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <Box>
            <Typography paragraph variant="h2">Welcome to Matt's Maths Problems</Typography>
            <Typography paragraph variant="body1">
                Matt's Maths Problems will generate endless questions for you,
                with a new problem every time.
            </Typography>
            <Typography paragraph variant="body1">
                If you're a student, you can practice maths questions, do tests, and learn more maths.
                The best way to get better is through practice, so give it a go!
            </Typography>
            <Typography paragraph variant="body1">
                If you're a teacher, you can build new exercises and generate worksheets for your students.
                The worksheets will be completely new every time, so you can spend time teaching rather than
                making up more questions.
            </Typography>
            <Typography paragraph variant="body1">
                Matt's Maths Problems is completely free to use for everyone. If you would like to help out by
                making new problems, exercises, or courses,
                go to the <Link to={"https://github.com/mattstrahan/mattsproblems/wiki/"}>Github Wiki</Link>!
            </Typography>
        </Box>
        
    )
}