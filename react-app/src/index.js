import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { ModalProvider } from "./components/Modal/Modal";
import configureStore from "./store/index";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
