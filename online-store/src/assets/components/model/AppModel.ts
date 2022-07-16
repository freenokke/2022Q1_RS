import { AppView } from '../view/AppView';
import { GoodsData } from '../additional/types/types';

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
        priceRange: Array<number>
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
        if (priceRange.length > 0) {
            this.updatedGoods = this.priceFilter(priceRange, this.updatedGoods);
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
        return updatedData;
    }

    private sortFilter(rule: string, goods: GoodsData[]): GoodsData[] {
        let updatedData = goods;
        if (rule === 'byHighPrice') {
            updatedData = goods.sort((a, b) => {
                const parsedA = parseInt(a.price, 10);
                const parsedB = parseInt(b.price, 10);
                return parsedB - parsedA;
            });
        }
        if (rule === 'byLowPrice') {
            updatedData = goods.sort((a, b) => {
                const parsedA = parseInt(a.price, 10);
                const parsedB = parseInt(b.price, 10);
                return parsedA - parsedB;
            });
        }
        if (rule === 'byNameReversely') {
            updatedData = goods.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }
        if (rule === 'byName') {
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
        return updatedData;
    }

    private diameterFilter(diametersArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        diametersArray.forEach((diameter) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.parameters.diameter === diameter);
            updatedData = [...updatedData, ...tempData];
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
        return updatedData;
    }

    private wideFilter(wideArray: Array<string>, goods: GoodsData[]): GoodsData[] {
        let updatedData: GoodsData[] = [];
        wideArray.forEach((wide) => {
            let tempData: GoodsData[] = [];
            tempData = goods.filter((item) => item.parameters.wide === wide);
            updatedData = [...updatedData, ...tempData];
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
        return updatedData;
    }
}
