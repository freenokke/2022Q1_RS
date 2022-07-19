import { AppModel } from '../model/AppModel';
import { GoodsData } from '../additional/interfaces/interfaces';
import * as noUiSlider from 'nouislider';

export class AppController {
    private model: AppModel;
    private searchState = '';
    private sortState = '';
    private colorState: Array<string> = [];
    private diameterState: Array<string> = [];
    private pcdState: Array<string> = [];
    private wideState: Array<string> = [];
    private brandState: Array<string> = [];
    private cartState: Array<string> = [];
    private priceState: Array<number> = [];
    private offsetState: Array<number> = [];
    private isPopularState = false;

    constructor(goods: GoodsData[]) {
        this.model = new AppModel(goods);
    }

    public start(): void {
        this.model.start();
        this.makeEvents();
    }

    private makeEvents(): void {
        this.searchEvent();
        this.sortEvent();
        this.popularCheckboxEvent();
        this.colorCheckboxEvent();
        this.diamCheckboxEvent();
        this.pcdCheckboxEvent();
        this.wideheckboxEvent();
        this.brandCheckboxEvent();
        this.priceRangeEvent();
        this.offsetRangeEvent();
        this.collapseBtnEvent();
        this.totalResetBtnEvent();
        this.softResetBtnEvent();
        this.addToCartEvent();
    }

    public updateFilters(): void {
        this.model.updateData(
            this.searchState,
            this.sortState,
            this.colorState,
            this.diameterState,
            this.pcdState,
            this.wideState,
            this.cartState,
            this.priceState,
            this.offsetState,
            this.brandState,
            this.isPopularState
        );
        this.addToCartEvent();
    }

    private searchEvent() {
        const searchInput = document.querySelector('#search') as HTMLInputElement;
        const clearInput = document.querySelector('#clearSearchInput') as HTMLInputElement;

        searchInput.addEventListener('input', () => {
            this.searchState = searchInput.value;
            if (searchInput.value) {
                (clearInput.firstElementChild as HTMLElement).textContent = 'close';
            } else {
                (clearInput.firstElementChild as HTMLElement).textContent = 'search';
            }
            this.updateFilters();
        });

        clearInput.addEventListener('click', () => {
            if (searchInput.value) {
                searchInput.value = '';
                this.searchState = '';
                (clearInput.firstElementChild as HTMLElement).textContent = 'search';
            }
            this.updateFilters();
        });
    }

    private sortEvent(): void {
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

    private brandCheckboxEvent() {
        const checkBoxesList = document.querySelectorAll('[name="brand"]');

        checkBoxesList.forEach((item) => {
            item.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.brandState.push(target.value);
                } else {
                    this.brandState = this.brandState.filter((item) => {
                        if (target.value !== item) {
                            return item;
                        }
                    });
                }
                this.updateFilters();
            });
        });
    }

    private popularCheckboxEvent() {
        const checkbox = document.querySelector('[name="popular"]') as HTMLInputElement;

        checkbox.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                this.isPopularState = true;
            } else {
                this.isPopularState = false;
            }
            this.updateFilters();
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

    private totalResetBtnEvent() {
        const resetBtn = document.querySelector('#reset') as HTMLElement;
        const checkboxes = document.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;

        resetBtn.addEventListener('click', () => {
            this.searchState = '';
            this.sortState = '';
            this.colorState = [];
            this.diameterState = [];
            this.pcdState = [];
            this.wideState = [];
            this.brandState = [];
            this.cartState = [];
            this.isPopularState = false;

            checkboxes.forEach((item) => {
                item.checked = false;
            });
            (document.querySelector('#search') as HTMLInputElement).value = '';
            (document.querySelector('#current-sort') as HTMLElement).textContent = 'Choose...';

            const priceSlider = document.getElementById('price-slider') as noUiSlider.target;
            const min = priceSlider.noUiSlider?.options.range.min as number;
            const max = priceSlider.noUiSlider?.options.range.max as number;
            this.priceState = [min, max];

            const offsetFilter = document.getElementById('offset-slider') as noUiSlider.target;
            const minOffset = offsetFilter.noUiSlider?.options.range.min as number;
            const maxOffset = offsetFilter.noUiSlider?.options.range.max as number;
            this.offsetState = [minOffset, maxOffset];

            this.updateFilters();

            localStorage.clear();
        });
    }
    private softResetBtnEvent() {
        const resetBtn = document.querySelector('#resetFilters') as HTMLElement;
        const checkboxes = document.querySelectorAll('[type="checkbox"]') as NodeListOf<HTMLInputElement>;

        resetBtn.addEventListener('click', () => {
            this.colorState = [];
            this.diameterState = [];
            this.pcdState = [];
            this.wideState = [];
            this.brandState = [];
            this.isPopularState = false;

            checkboxes.forEach((item) => {
                item.checked = false;
            });

            const priceSlider = document.getElementById('price-slider') as noUiSlider.target;
            const min = priceSlider.noUiSlider?.options.range.min as number;
            const max = priceSlider.noUiSlider?.options.range.max as number;
            this.priceState = [min, max];

            const offsetFilter = document.getElementById('offset-slider') as noUiSlider.target;
            const minOffset = offsetFilter.noUiSlider?.options.range.min as number;
            const maxOffset = offsetFilter.noUiSlider?.options.range.max as number;
            this.offsetState = [minOffset, maxOffset];

            this.updateFilters();
        });
    }

    private addToCartEvent() {
        const addToCartBtn = document.querySelectorAll('#addToCart') as NodeListOf<HTMLElement>;
        const count = document.querySelector('#cartCount') as HTMLElement;
        if (this.cartState.length > 0) {
            count.textContent = this.cartState.length.toString();
            count.classList.add('flex');
            count.classList.remove('hidden');
        } else {
            count.textContent = '0';
            count.classList.add('hidden');
        }

        addToCartBtn.forEach((item) => {
            item.addEventListener('click', () => {
                const state = (item.firstChild as HTMLElement).textContent as string;
                const cardId = item.parentElement?.parentElement?.id as string;

                if (state === 'add_shopping_cart') {
                    if (Number(count.textContent) < 20) {
                        (item.firstChild as HTMLElement).textContent = 'check';
                        item.classList.remove('red');
                        item.classList.add('green', 'added');
                        (item as HTMLElement).insertAdjacentHTML(
                            'beforeend',
                            '<span class="ml-3 ">added to cart</span>'
                        );
                        count.textContent = (Number(count.textContent) + 1).toString();
                        this.cartState.push(cardId);
                    } else {
                        alert('Sorry, all slots are full');
                    }
                } else {
                    item.classList.add('red');
                    item.classList.remove('green', 'added');
                    (item.firstChild as HTMLElement).textContent = 'add_shopping_cart';
                    (item.querySelector('span') as HTMLElement).remove();
                    count.textContent = (Number(count.textContent) - 1).toString();
                    this.cartState = this.cartState.filter((item) => {
                        if (item !== cardId) {
                            return item;
                        }
                    });
                }

                if (Number(count.textContent) > 0) {
                    count.classList.remove('hidden');
                    count.classList.add('flex');
                } else {
                    count.classList.add('hidden');
                    count.classList.remove('flex');
                }
            });
        });
    }
}
