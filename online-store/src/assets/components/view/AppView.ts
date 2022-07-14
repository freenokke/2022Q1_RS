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

    renderFilters(goods: GoodsData[]) {
        function colorFilter() {
            const filtersArea = document.querySelector('#colorsList') as HTMLElement;
            if (!filtersArea) throw new Error('#colorList is not found');
            const fragment = document.createDocumentFragment();
            const existingColors: Set<string> = new Set();
            goods.forEach((item) => {
                existingColors.add(item.color);
            });
            const setToArr: string[] = Array.from(existingColors);
            for (let i = 0; i < setToArr.length; i++) {
                const block = document.createElement('div');
                block.className = 'flex items-center';
                const input = document.createElement('input');
                input.className = 'cursor-pointer checkbox-input';
                input.name = 'color';
                input.id = `filter-color-${i}`;
                input.type = 'checkbox';
                input.value = setToArr[i];
                const label = document.createElement('label');
                label.className = 'ml-3 text-sm text-gray-600 cursor-pointer text-gray-700';
                label.setAttribute('for', input.id);
                label.textContent = input.value;
                block.append(input, label);
                fragment.append(block);
            }
            filtersArea.append(fragment);
        }

        function diameterFilter() {
            const filtersArea = document.querySelector('#diamsList') as HTMLElement;
            if (!filtersArea) throw new Error('#diamsList is not found');
            const fragment = document.createDocumentFragment();
            const existingDiameters: Set<string> = new Set();
            goods.forEach((item) => {
                existingDiameters.add(item.parameters.diameter);
            });
            const setToArr = Array.from(existingDiameters).sort((a, b) => Number(a) - Number(b));
            for (let i = 0; i < setToArr.length; i++) {
                const block = document.createElement('div');
                block.className = 'flex items-center';
                const input = document.createElement('input');
                input.className = 'cursor-pointer checkbox-input';
                input.id = `filter-diameter-${i}`;
                input.name = 'diam';
                input.type = 'checkbox';
                input.value = setToArr[i].toString();
                const label = document.createElement('label');
                label.className = 'ml-3 text-sm text-gray-600 cursor-pointer text-gray-700';
                label.setAttribute('for', input.id);
                label.textContent = input.value + '"';
                block.append(input, label);
                fragment.append(block);
            }
            filtersArea.append(fragment);
        }

        function pcdFilter() {
            const filtersArea = document.querySelector('#pcdList') as HTMLElement;
            if (!filtersArea) throw new Error('#pcdList is not found');
            const fragment = document.createDocumentFragment();
            const existingPcd: Set<string> = new Set();
            goods.forEach((item) => {
                existingPcd.add(item.parameters.pcd);
            });
            const setToArr = Array.from(existingPcd).sort((a, b) => Number(a) - Number(b));
            for (let i = 0; i < setToArr.length; i++) {
                const block = document.createElement('div');
                block.className = 'flex items-center';
                const input = document.createElement('input');
                input.className = 'cursor-pointer checkbox-input';
                input.id = `filter-pcd-${i}`;
                input.name = 'pcd';
                input.type = 'checkbox';
                input.value = setToArr[i].toString();
                const label = document.createElement('label');
                label.className = 'ml-3 text-sm text-gray-600 cursor-pointer text-gray-700';
                label.setAttribute('for', input.id);
                label.textContent = input.value;
                block.append(input, label);
                fragment.append(block);
            }
            filtersArea.append(fragment);
        }

        colorFilter();
        diameterFilter();
        pcdFilter();
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
