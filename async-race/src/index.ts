/* eslint-disable no-console */
import './assets/scss/style.scss';
import Application from './components/App';

const app = new Application(document.body, 'div', 'flex-column');
app.init();
