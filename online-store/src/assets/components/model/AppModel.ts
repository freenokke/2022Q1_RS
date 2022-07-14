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
    }

    updateData(search: string) {
        this.updatedGoods = [...this.goods];
        if (search) {
            this.updatedGoods = this.searchFilter(search, this.updatedGoods);
        }
        console.log(this.updatedGoods);
        this.view.renderGoods(this.updatedGoods);
    }

    searchFilter(rule: string, goods: GoodsData[]): GoodsData[] {
        const regexp = new RegExp(rule, 'i');
        const updatedData: GoodsData[] = goods.filter((item) => {
            if (regexp.test(item.name)) {
                return item;
            }
        });
        return updatedData;
    }
}
