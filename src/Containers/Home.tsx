import { useEffect } from 'react';
import { fetchInitial } from '../Reducers/RepositoryReducer';
import { useAppSelector, useAppDispatch } from '../Hooks/hooks';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';

function Home() {
  const dispatch = useAppDispatch();
  const initialrequeststatus = useAppSelector (state => state.repository.initialrequeststatus);

  useEffect(() => {
    if (initialrequeststatus === 'idle') {
      dispatch(fetchInitial());
    }
  }, [initialrequeststatus, dispatch]);

  return (
  <div>
    <NavBar />
    <Outlet />
  </div>);
}

export default Home;
