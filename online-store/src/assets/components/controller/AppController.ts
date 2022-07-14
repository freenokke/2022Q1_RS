import { AppModel } from '../model/AppModel';
import { GoodsData } from '../additional/types/types';

export class AppController {
    private model: AppModel;
    private searchState = '';
    private sortState = '';
    private colorState: Array<string> = [];
    private diameterState: Array<string> = [];
    private pcdState: Array<string> = [];

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
        this.colorCheckboxEvent();
        this.diamCheckboxEvent();
        this.pcdCheckboxEvent();
    }

    private updateFilters(): void {
        this.model.updateData(this.searchState, this.sortState, this.colorState, this.diameterState, this.pcdState);
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

    private colorCheckboxEvent() {
        const checkBoxesList = document.querySelectorAll('[name="color"]') as NodeListOf<HTMLInputElement>;

        checkBoxesList.forEach((item) => {
            item.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.colorState.push(target.value);
                } else {
                    this.colorState = this.colorState.filter((item) => {
                        if (target.value !== item) {
                            return item;
                        }
                    });
                }
                this.updateFilters();
            });
        });
    }

    private diamCheckboxEvent() {
        const checkBoxesList = document.querySelectorAll('[name="diam"]');

        checkBoxesList.forEach((item) => {
            item.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.diameterState.push(target.value);
                } else {
                    this.diameterState = this.diameterState.filter((item) => {
                        if (target.value !== item) {
                            return item;
                        }
                    });
                }
                this.updateFilters();
            });
        });
    }

    private pcdCheckboxEvent() {
        const checkBoxesList = document.querySelectorAll('[name="pcd"]');

        checkBoxesList.forEach((item) => {
            item.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.pcdState.push(target.value);
                } else {
                    this.pcdState = this.pcdState.filter((item) => {
                        if (target.value !== item) {
                            return item;
                        }
                    });
                }
                this.updateFilters();
            });
        });
    }
}
