import { AppModel } from '../model/AppModel';
import { GoodsData } from '../additional/types/types';

export class AppController {
    private model: AppModel;
    private searchState = '';
    private sortState = '';
    constructor(goods: GoodsData[]) {
        this.model = new AppModel(goods);
    }

    start(): void {
        this.model.start();
        this.makeEvents();
    }

    private makeEvents(): void {
        this.searchEvent();
        this.sortEvent();

    private updateFilters(): void {
        this.model.updateData(this.searchState, this.sortState);
    }

    private searchEvent() {
        const searchInput = document.querySelector('#search') as HTMLInputElement;
        searchInput.addEventListener('input', () => {
            this.searchState = searchInput.value;
            this.updateFilters();
        });
    }

    private sortEvent(): void {
        const currentSort = document.querySelector('#current-sort') as HTMLElement;
        const sortListBtn = document.querySelector('#sort-list_button') as HTMLElement;
        const sortList = document.querySelector('#sort-list') as HTMLElement;
        const sortOptions = document.querySelectorAll('#sort-list > li') as NodeListOf<HTMLElement>;

        sortListBtn.addEventListener('click', () => {
            sortList.classList.toggle('opacity-0');
            sortList.classList.toggle('invisible');

            document.body.addEventListener('click', (e) => {
                if (!(<HTMLElement>e.target).closest('#filterByRules')) {
                    sortList.classList.add('opacity-0');
                    sortList.classList.add('invisible');
                }
            });
        });

        sortOptions.forEach((option) => {
            option.addEventListener('click', () => {
                currentSort.textContent = (option.querySelector('.sort-name') as HTMLElement).textContent;
                this.sortState = option.id;
                this.updateFilters();
                sortList.classList.toggle('opacity-0');
                sortList.classList.toggle('invisible');
            });
        });
    }

}
