import React from 'react';
import { Provider } from 'react-redux';
import Home from './Home';
import Router from './Router';

type Props = {
  store: any
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default Root;
