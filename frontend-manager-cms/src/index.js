//!LIBRARY
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

//! CSS GLOBAL
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './index.css';
import './styles/style.scss';

//! REDUX
import store from 'redux/store';

//! MAIN
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProviderCMS } from 'context/global_context';

ReactDOM.render(
  <Provider store={store}>
    <DataProviderCMS>
      <Router>
        <App />
      </Router>
    </DataProviderCMS>
  </Provider>,

  document.getElementById('root'),
);

reportWebVitals();
