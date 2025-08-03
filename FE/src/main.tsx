// @ts-ignore
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import App from './App.tsx';
import './style/index.css';
import store from './store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
)
