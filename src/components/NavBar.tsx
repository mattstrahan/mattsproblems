import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";



function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <Button sx={{ textTransform: 'none', textAlign: "left", color:"white" }} component={RouterLink} to="/">
                    <Typography variant="h4" >
                        Matt's Maths Problems
                    </Typography>
                </Button>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button component={RouterLink} to="/topics" variant="contained">
                        Topics
                    </Button>
                    <Button component={RouterLink} to="/courses" variant="contained">
                        Courses
                    </Button>
                    <Button component={RouterLink} to="/about" variant="contained">
                        About
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;