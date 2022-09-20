import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

function Home() {

  return (
  <div>
    <NavBar />
    <Container maxWidth="lg">
        <Box padding={3}>
          <Outlet />
        </Box>
    </Container>
  </div>);
}

export default Home;
