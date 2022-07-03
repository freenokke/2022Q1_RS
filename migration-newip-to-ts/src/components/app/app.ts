import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { SourcesEndpointResponse, TopHeadlinesEndpointResponse, IApp } from '../../types';
import { Countries } from '../app/countries';

class App implements IApp {
    private controller: AppController;
    private view: AppView;
    private country = 'us';

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        this.addCountrySelect();
        this.addEvents();
    }

    private addEvents() {
        const sources = document.querySelector('.sources');
        const categories = document.querySelectorAll('.categories-item');
        const languages = document.querySelectorAll('.lang-option');
        const select = document.querySelector('#lang');

        if (sources !== null) {
            sources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: TopHeadlinesEndpointResponse) => this.view.drawNews(data))
            );
        } else {
            throw new Error(`Element with class ".sources" is not found`);
        }

        if (categories.length > 0) {
            categories.forEach((item) => {
                item.addEventListener('click', (e) => {
                    this.controller.getSources(e, this.country, (data: SourcesEndpointResponse) =>
                        this.view.drawSources(data)
                    );
                });
            });
        } else {
            throw new Error(`Categories list is not found`);
        }

        if (select !== null && languages.length > 0) {
            select.addEventListener('change', () => {
                this.country = (select as HTMLSelectElement).value;
                this.view.clearNews();
                this.view.clearSources();
            });
        } else {
            throw new Error(`Languages list is not found`);
        }
    }

    private addCountrySelect() {
        const selectLang = document.querySelector('#lang');

        if (selectLang !== null) {
            selectLang as HTMLSelectElement;
            const keys = Object.keys(Countries);
            const values = Object.values(Countries);
            for (let i = 0; i < keys.length; i++) {
                const optionElement = document.createElement('option');
                optionElement.className = 'lang-option';
                optionElement.textContent = values[i];
                optionElement.value = keys[i];
                if (optionElement.value === 'us') {
                    optionElement.setAttribute('selected', '');
                }

                selectLang.append(optionElement);
            }
        } else {
            throw new Error(`Element with id "#lang" is not found`);
        }
    }
}

export default App;
