import { AppView } from '../view/AppView';
import { GoodsData } from '../additional/types/types';
import * as noUiSlider from 'nouislider';

export class AppModel {
    private goods: GoodsData[];
    private view: AppView;
    private updatedGoods?: GoodsData[];

    constructor(data: GoodsData[]) {
        this.goods = data;
        this.view = new AppView();
    }

    start() {
        this.view.renderGoods(this.goods);
        this.view.renderFilters(this.goods);
    }

    updateData(
        search: string,
        sort: string,
        color: Array<string>,
        diameter: Array<string>,
        pcd: Array<string>,
        wide: Array<string>,
        inCart: Array<string>,
        priceRange: Array<number>,
        offsetRange: Array<number>,
        brand: Array<string>
    ) {
        this.updatedGoods = [...this.goods];
        if (search) {
            this.updatedGoods = this.searchFilter(search, this.updatedGoods);
        }
        if (color.length > 0) {
            this.updatedGoods = this.colorFilter(color, this.updatedGoods);
        }
        if (diameter.length > 0) {
            this.updatedGoods = this.diameterFilter(diameter, this.updatedGoods);
        }
        if (pcd.length > 0) {
            this.updatedGoods = this.pcdFilter(pcd, this.updatedGoods);
        }
        if (wide.length > 0) {
            this.updatedGoods = this.wideFilter(wide, this.updatedGoods);
        }
        if (brand.length > 0) {
            this.updatedGoods = this.brandFilter(brand, this.updatedGoods);
        }
        if (priceRange.length > 0) {
            this.updatedGoods = this.priceFilter(priceRange, this.updatedGoods);
        }
        if (offsetRange.length > 0) {
            this.updatedGoods = this.offsetFilter(offsetRange, this.updatedGoods);
        }
        if (sort) {
            this.updatedGoods = this.sortFilter(sort, this.updatedGoods);
        }
        this.view.renderGoods(this.updatedGoods, inCart);
    }

    private searchFilter(rule: string, goods: GoodsData[]): GoodsData[] {
        const regexp = new RegExp(rule, 'i');
        const updatedData: GoodsData[] = goods.filter((item) => {
            if (regexp.test(item.name)) {
                return item;
            }
        });
        (<HTMLInputElement>document.querySelector('#search')).value = rule;
        return updatedData;
    }

    private sortFilter(rule: string, goods: GoodsData[]): GoodsData[] {
        const sortField = document.querySelector('#current-sort') as HTMLElement;
        let updatedData = goods;
        if (rule === 'byHighPrice') {
            sortField.textContent = 'The most exepensive first';
            updatedData = goods.sort((a, b) => {
                const parsedA = parseInt(a.price, 10);
                const parsedB = parseInt(b.price, 10);
                return parsedB - parsedA;
            });
        }
        if (rule === 'byLowPrice') {
            sortField.textContent = 'The cheapest first';
            updatedData = goods.sort((a, b) => {
                const parsedA = parseInt(a.price, 10);
                const parsedB = parseInt(b.price, 10);
                return parsedA - parsedB;
            });
        }
        if (rule === 'byNameReversely') {
            sortField.textContent = 'From Z to A';
            updatedData = goods.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }
        if (rule === 'byName') {
            sortField.textContent = 'From A to Z';
            updatedData = goods.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
        return updatedData;
    }

    private colorFilter(colorsArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        colorsArray.forEach((color) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.color === color);
            updatedData = [...updatedData, ...tempData];
        });
        const colorCheckboxes = document.querySelectorAll('[name="color"]') as NodeListOf<HTMLInputElement>;
        colorCheckboxes.forEach((item) => {
            if (colorsArray.includes(item.value)) {
                item.checked = true;
            }
        });
        return updatedData;
    }

    private diameterFilter(diametersArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        diametersArray.forEach((diameter) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.parameters.diameter === diameter);
            updatedData = [...updatedData, ...tempData];
        });
        const diameterCheckboxes = document.querySelectorAll('[name="diam"]') as NodeListOf<HTMLInputElement>;
        diameterCheckboxes.forEach((item) => {
            if (diametersArray.includes(item.value)) {
                item.checked = true;
            }
        });
        return updatedData;
    }

    private pcdFilter(pcdArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        pcdArray.forEach((pcd) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.parameters.pcd === pcd);
            updatedData = [...updatedData, ...tempData];
        });
        const pcdCheckboxes = document.querySelectorAll('[name="pcd"]') as NodeListOf<HTMLInputElement>;
        pcdCheckboxes.forEach((item) => {
            if (pcdArray.includes(item.value)) {
                item.checked = true;
            }
        });
        return updatedData;
    }

    private wideFilter(wideArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        wideArray.forEach((wide) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.parameters.wide === wide);
            updatedData = [...updatedData, ...tempData];
        });
        const wideCheckboxes = document.querySelectorAll('[name="wide"]') as NodeListOf<HTMLInputElement>;
        wideCheckboxes.forEach((item) => {
            if (wideArray.includes(item.value)) {
                item.checked = true;
            }
        });
        return updatedData;
    }

    private brandFilter(brandArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        brandArray.forEach((brand) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.brand === brand);
            updatedData = [...updatedData, ...tempData];
        });
        const brandCheckboxes = document.querySelectorAll('[name="brand"]') as NodeListOf<HTMLInputElement>;
        brandCheckboxes.forEach((item) => {
            if (brandArray.includes(item.value)) {
                item.checked = true;
            }
        });
        return updatedData;
    }

    private priceFilter(priceRange: Array<number>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        const [minPrice, maxPrice] = priceRange;
        let tempData: GoodsData[] = [];
        tempData = goods.filter((item) => {
            if (Number(parseInt(item.price, 10)) >= minPrice && Number(parseInt(item.price, 10)) <= maxPrice) {
                return item;
            }
        });
        updatedData = [...updatedData, ...tempData];
        const slider = document.getElementById('price-slider') as noUiSlider.target;
        slider.noUiSlider?.set([priceRange[0], priceRange[1]]);

        return updatedData;
    }

    private offsetFilter(offsetRange: Array<number>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        const [minPrice, maxPrice] = offsetRange;
        let tempData: GoodsData[] = [];
        tempData = goods.filter((item) => {
            if (item.parameters.ET >= minPrice && item.parameters.ET <= maxPrice) {
                return item;
            }
        });
        updatedData = [...updatedData, ...tempData];
        const slider = document.getElementById('offset-slider') as noUiSlider.target;
        slider.noUiSlider?.set([offsetRange[0], offsetRange[1]]);

        return updatedData;
    }
}
