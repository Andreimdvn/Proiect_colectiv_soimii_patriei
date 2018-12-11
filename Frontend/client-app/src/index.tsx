import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {CookiesProvider} from "react-cookie";

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
