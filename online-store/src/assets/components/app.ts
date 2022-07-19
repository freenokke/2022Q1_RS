import { AppController } from './controller/AppController';
import { GoodsData } from './additional/interfaces/interfaces';

export class App {
    private controller: AppController;

    constructor(data: GoodsData[]) {
        this.controller = new AppController(data);
    }

    public start() {
        this.controller.start();
        this.localeStorageEvent();
    }

    private localeStorageEvent() {
        window.addEventListener('unload', () => {
            let prop: keyof AppController;
            for (prop in this.controller) {
                if (prop.endsWith('State')) {
                    localStorage.setItem(prop.slice(0, prop.search('S')), JSON.stringify(this.controller[prop]));
                }
            }
        });

        window.addEventListener('load', () => {
            let prop: keyof AppController;
            for (prop in this.controller) {
                if (prop.endsWith('State')) {
                    const filterName = prop.slice(0, prop.search('S'));
                    if (localStorage.getItem(filterName) !== null) {
                        this.controller[prop] = JSON.parse(<string>localStorage.getItem(filterName));
                    }
                }
            }
            (document.querySelector('#search') as HTMLInputElement).focus();
            this.controller.updateFilters();
        });
    }
}
