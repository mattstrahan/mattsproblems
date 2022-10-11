import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";


export default function MPPaper(props:PaperProps) {
    const paperprops = {...props, children:undefined}
    return (
        <Paper {...paperprops}>
            <Box padding={3}>
                {props.children}
            </Box>
        </Paper>
    );
}