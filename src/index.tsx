import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';

import { store } from './store';
import App from 'app';

import './index.scss';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
      <NotificationContainer />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
