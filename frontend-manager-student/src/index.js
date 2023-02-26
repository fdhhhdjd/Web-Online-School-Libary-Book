import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import store from 'redux/store';
import App from './App';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './styles/style.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root'),
);

reportWebVitals();
