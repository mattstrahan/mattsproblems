import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";

export interface MPPaperProps {
    paddingY?: number;
}

export default function MPPaper(props:PaperProps & MPPaperProps) {

    const paperprops = {...props, children:undefined}
    if("paddingY" in props)
        return (
            <Box paddingY={props.paddingY}>
            <Paper {...paperprops}>
                <Box padding={3}>
                    {props.children}
                </Box>
            </Paper>
            </Box>
        );
    return (
        <Paper {...paperprops}>
            <Box padding={3}>
                {props.children}
            </Box>
        </Paper>
    );
}