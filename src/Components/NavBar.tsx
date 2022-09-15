import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";



function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{flexGrow: 1}}>
                    Matt's Maths Problems
                </Typography>
                    <Button component={RouterLink} to="/courses" variant="contained">
                        Courses
                    </Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;