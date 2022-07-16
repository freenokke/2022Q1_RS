import { AppModel } from '../model/AppModel';
import { GoodsData } from '../additional/types/types';
import * as noUiSlider from 'nouislider';

export class AppController {
    private model: AppModel;
    private searchState = '';
    private sortState = '';
    private colorState: Array<string> = [];
    private diameterState: Array<string> = [];
    private pcdState: Array<string> = [];
    private wideState: Array<string> = [];
    private cartState: Array<string> = [];
    private priceState: Array<number> = [];
    private offsetState: Array<number> = [];

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
        this.wideheckboxEvent();
        this.priceRangeEvent();
        this.offsetRangeEvent();
        this.collapseBtnEvent();
        this.resetBtnEvent();
        this.addToCartEvent();
    }

    private updateFilters(): void {
        this.model.updateData(
            this.searchState,
            this.sortState,
            this.colorState,
            this.diameterState,
            this.pcdState,
            this.wideState,
            this.cartState,
            this.priceState,
            this.offsetState
        );
        this.addToCartEvent();
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
    private wideheckboxEvent() {
        const checkBoxesList = document.querySelectorAll('[name="wide"]');

        checkBoxesList.forEach((item) => {
            item.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.wideState.push(target.value);
                } else {
                    this.wideState = this.wideState.filter((item) => {
                        if (target.value !== item) {
                            return item;
                        }
                    });
                }
                this.updateFilters();
            });
        });
    }

    private priceRangeEvent() {
        const slider = document.getElementById('price-slider') as noUiSlider.target;

        slider.noUiSlider?.on('end', (values) => {
            const [from, to] = values;
            this.priceState = [Number(from), Number(to)];
            this.updateFilters();
        });
    }

    private offsetRangeEvent() {
        const slider = document.getElementById('offset-slider') as noUiSlider.target;

        slider.noUiSlider?.on('end', (values) => {
            const [from, to] = values;
            this.offsetState = [Number(from), Number(to)];
            this.updateFilters();
        });
    }

    private collapseBtnEvent() {
        const buttons = document.querySelectorAll('#showHide') as NodeListOf<HTMLElement>;

        buttons.forEach((item) => {
            item.addEventListener('click', () => {
                const target = item.nextElementSibling?.firstElementChild as HTMLElement;
                if (!target) throw Error(`${target} is not found`);
                target.classList.toggle('hidden');
            });
        });
    }

    private resetBtnEvent() {
        const resetBtn = document.querySelector('#reset') as HTMLElement;
        const checkboxes = document.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;

        resetBtn.addEventListener('click', () => {
            this.searchState = '';
            this.sortState = '';
            this.colorState = [];
            this.diameterState = [];
            this.pcdState = [];
            this.wideState = [];

            checkboxes.forEach((item) => {
                item.checked = false;
            });
            (document.querySelector('#search') as HTMLInputElement).value = '';
            (document.querySelector('#current-sort') as HTMLElement).textContent = 'Choose...';
            (document.getElementById('slider') as noUiSlider.target).noUiSlider?.reset();
            this.updateFilters();
        });
    }

    private addToCartEvent() {
        const addToCartBtn = document.querySelectorAll('#addToCart') as NodeListOf<HTMLElement>;
        const count = document.querySelector('#cartCount') as HTMLElement;

        addToCartBtn.forEach((item) => {
            item.addEventListener('click', () => {
                const state = (item.firstChild as HTMLElement).textContent as string;

                if (state === 'add_shopping_cart') {
                    if (Number(count.textContent) < 20) {
                        (item.firstChild as HTMLElement).textContent = 'check';
                        item.classList.remove('red');
                        item.classList.add('green');
                        item.style.display = 'flex';
                        item.style.alignItems = 'center';
                        item.style.borderRadius = '20px';
                        item.style.width = 'max-content';
                        item.style.padding = '5px';
                        (item as HTMLElement).insertAdjacentHTML(
                            'beforeend',
                            '<span class="ml-3 ">added to cart</span>'
                        );
                        count.textContent = (Number(count.textContent) + 1).toString();
                        const cardId = item.parentElement?.parentElement?.id as string;
                        this.cartState.push(cardId);
                    } else {
                        alert('Sorry, all slots are full');
                    }
                } else {
                    item.classList.add('red');
                    item.classList.remove('green');
                    (item.firstChild as HTMLElement).textContent = 'add_shopping_cart';
                    item.removeAttribute('style');
                    (item.querySelector('span') as HTMLElement).remove();
                    count.textContent = (Number(count.textContent) - 1).toString();
                }

                if (Number(count.textContent) > 0) {
                    count.style.display = 'flex';
                } else {
                    count.style.display = 'none';
                }
            });
        });
    }
}
