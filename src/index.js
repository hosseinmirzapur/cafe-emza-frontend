import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './containers/App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from "./redux/store/store";

// styles
import './assets/styles/bootstrap.min.css'
import './assets/styles/colors.scss'
import './assets/styles/styles.scss'
import './assets/styles/fontIranYekan.css'
import './assets/styles/ReactToastify.css'
import './assets/styles/dialog.scss'
import './assets/styles/mantine.scss'

// Swiper Styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import "swiper/css/effect-fade";

const root = createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    // </React.StrictMode>
);
// window.addEventListener('keydown', () => {
//     console.clear()
// })
