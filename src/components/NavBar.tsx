import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';



function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                    <MenuItem component={RouterLink} to="/topics" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Topics</Typography>
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/courses" onClick={handleCloseNavMenu}>
                        Courses
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/create" onClick={handleCloseNavMenu}>
                        Create
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/about" onClick={handleCloseNavMenu}>
                        About
                    </MenuItem>
                </Menu>
                </Box>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Stack direction="row" spacing={2}>
                    <Button component={RouterLink} to="/topics" variant="contained">
                        Topics
                    </Button>
                    <Button component={RouterLink} to="/courses" variant="contained">
                        Courses
                    </Button>
                    <Button component={RouterLink} to="/create" variant="contained">
                        Create
                    </Button>
                    <Button component={RouterLink} to="/about" variant="contained">
                        About
                    </Button>
                </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;