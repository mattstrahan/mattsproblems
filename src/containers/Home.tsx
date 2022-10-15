import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

function Home() {

  return (
  <div>
    <NavBar />
    <Container maxWidth="lg">
          <Outlet />
    </Container>
  </div>);
}

export default Home;
