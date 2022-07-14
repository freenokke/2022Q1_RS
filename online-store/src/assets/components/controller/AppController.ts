import { AppModel } from '../model/AppModel';
import { GoodsData } from '../additional/types/types';

export class AppController {
    private model: AppModel;
    private searchState = '';
    constructor(goods: GoodsData[]) {
        this.model = new AppModel(goods);
    }

    start(): void {
        this.model.start();
        this.makeEvents();
    }

    private makeEvents(): void {
        this.searchEvent();

    private updateFilters(): void {
        this.model.updateData(this.searchState);
    }

    private searchEvent() {
        const searchInput = document.querySelector('#search') as HTMLInputElement;
        searchInput.addEventListener('input', () => {
            this.searchState = searchInput.value;
            this.updateFilters();
        });
    }

}
