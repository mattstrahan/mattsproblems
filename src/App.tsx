import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Root from './containers/Root';
import { store } from './store/configureStore';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Root store={store} />
    </div>
  );
}

export default App;
