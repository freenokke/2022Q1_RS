import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './assets/sass/style.scss';

import { AppController } from './assets/components/controller/AppController';
import { GoodsData } from './assets/components/additional/types/types';

async function loadData(): Promise<void> {
    const resp: Response = await fetch('./data.json');
    const json: GoodsData[] = await resp.json();
    const app: AppController = new AppController(json);
    app.start();
}

loadData();
