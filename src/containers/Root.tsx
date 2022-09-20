import { Provider } from 'react-redux';
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
