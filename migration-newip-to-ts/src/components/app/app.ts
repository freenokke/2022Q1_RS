import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { SourcesEndpointResponse, TopHeadlinesEndpointResponse, IApp } from '../../types';

class App implements IApp {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources');
        if (sources !== null) {
            sources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: TopHeadlinesEndpointResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: SourcesEndpointResponse) => this.view.drawSources(data));
        } else {
            throw new Error(`Element with class ".sources" is not found`);
        }
    }
}

export default App;
