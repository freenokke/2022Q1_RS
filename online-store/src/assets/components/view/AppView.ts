import { GoodsData } from '../additional/types/types';

export class AppView {
    renderGoods(goods: GoodsData[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const template = document.querySelector('#goodsCardTemp') as HTMLTemplateElement;
        const contentBlock = document.querySelector('#goods') as HTMLElement;

        goods.forEach((item) => {
            const clone = template.content.cloneNode(true) as HTMLElement;
            (clone.querySelector('.card-title') as HTMLElement).textContent = item.name;
            (clone.querySelector('.img') as HTMLImageElement).src = item.img;
            (clone.querySelector('.brand') as HTMLElement).textContent = item.brand;
            (clone.querySelector('.color') as HTMLElement).textContent = item.color;
            (clone.querySelector('.diam') as HTMLElement).textContent = item.parameters.diameter + '"';
            (clone.querySelector('.pcd') as HTMLElement).textContent = item.parameters.pcd;
            (clone.querySelector('.wide') as HTMLElement).textContent = item.parameters.wide;
            (clone.querySelector('.et') as HTMLElement).textContent = item.parameters.ET.toString();
            (clone.querySelector('.price') as HTMLElement).textContent = item.price;

            fragment.append(clone);
        });

        if (contentBlock.firstChild) {
            contentBlock.innerHTML = '';
        }
        contentBlock.append(fragment);

        if (!contentBlock.firstChild) {
            contentBlock.insertAdjacentHTML('afterbegin', '<h5 style="text-align:center;">No matches found<h5>');
        }

        this.addToCartEvent();
    }

    addToCartEvent() {
        const addToCartBtn = document.querySelectorAll('#addToCart') as NodeListOf<HTMLElement>;
        // const cart = document.querySelector('#cart') as HTMLElement;

        addToCartBtn.forEach((item) => {
            item.addEventListener('click', () => {
                (item.firstChild as HTMLElement).textContent = 'check';
                item.classList.remove('red');
                item.classList.add('green');
            });
        });
    }
}
