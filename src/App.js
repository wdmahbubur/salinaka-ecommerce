import './App.css';


import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import store from './redux/store/store';

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
