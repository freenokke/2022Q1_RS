import { GoodsData } from '../additional/types/types';
import * as noUiSlider from 'nouislider';

export class AppView {
    renderGoods(goods: GoodsData[], inCart: Array<string> = []) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const template = document.querySelector('#goodsCardTemp') as HTMLTemplateElement;
        const contentBlock = document.querySelector('#goods') as HTMLElement;

        goods.forEach((item) => {
            const clone = template.content.cloneNode(true) as HTMLElement;
            (clone.querySelector('.card-title') as HTMLElement).textContent = item.name;
            (clone.querySelector('.img') as HTMLImageElement).src = item.img;
            (clone.querySelector('.color') as HTMLElement).textContent = item.color;
            (clone.querySelector('.diam') as HTMLElement).textContent = item.parameters.diameter + '"';
            (clone.querySelector('.pcd') as HTMLElement).textContent = item.parameters.pcd;
            (clone.querySelector('.wide') as HTMLElement).textContent = item.parameters.wide;
            (clone.querySelector('.et') as HTMLElement).textContent = item.parameters.ET.toString();
            (clone.querySelector('.price') as HTMLElement).textContent = item.price;
            (clone.querySelector('.card') as HTMLElement).id = item.id.toString();
            if (item.purchaseQuantity >= 10) {
                (clone.querySelector('#popular') as HTMLElement).classList.remove('hidden');
                (clone.querySelector('#popular') as HTMLElement).classList.add('flex');
            }
            if (inCart.includes(item.id.toString())) {
                ((clone.querySelector('#addToCart') as HTMLElement).firstChild as HTMLElement).textContent = 'check';
                (clone.querySelector('#addToCart') as HTMLElement).classList.remove('red');
                (clone.querySelector('#addToCart') as HTMLElement).classList.add('green');
                (clone.querySelector('#addToCart') as HTMLElement).style.display = 'flex';
                (clone.querySelector('#addToCart') as HTMLElement).style.alignItems = 'center';
                (clone.querySelector('#addToCart') as HTMLElement).style.borderRadius = '20px';
                (clone.querySelector('#addToCart') as HTMLElement).style.width = 'max-content';
                (clone.querySelector('#addToCart') as HTMLElement).style.padding = '5px';
                (clone.querySelector('#addToCart') as HTMLElement).insertAdjacentHTML(
                    'beforeend',
                    '<span class="ml-3 ">added to cart</span>'
                );
            }
            fragment.append(clone);
        });

        if (contentBlock.firstChild) {
            contentBlock.innerHTML = '';
        }
        contentBlock.append(fragment);

        if (!contentBlock.firstChild) {
            contentBlock.insertAdjacentHTML('afterbegin', '<h5 style="text-align:center;">No matches found<h5>');
        }
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

        function wideFilter() {
            const filtersArea = document.querySelector('#wideList') as HTMLElement;
            if (!filtersArea) throw new Error('#wideList is not found');
            const fragment = document.createDocumentFragment();
            const existingWide: Set<string> = new Set();
            goods.forEach((item) => {
                existingWide.add(item.parameters.wide);
            });
            const setToArr = Array.from(existingWide).sort((a, b) => Number(a) - Number(b));
            for (let i = 0; i < setToArr.length; i++) {
                const block = document.createElement('div');
                block.className = 'flex items-center';
                const input = document.createElement('input');
                input.className = 'cursor-pointer checkbox-input';
                input.id = `filter-wide-${i}`;
                input.name = 'wide';
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

        function priceFilter() {
            const slider = document.getElementById('price-slider') as noUiSlider.target;
            let minPrice = 0;
            let maxPrice = 0;

            const pricesArr = goods.map((item) => {
                const price = parseInt(item.price, 10);
                return price;
            });

            minPrice = Math.min(...pricesArr);
            maxPrice = Math.max(...pricesArr);

            const formatForSlider = {
                from: function (formattedValue: string) {
                    return Number(formattedValue);
                },
                to: function (numericValue: number) {
                    return Math.round(numericValue);
                },
            };

            noUiSlider.create(slider, {
                start: [0, maxPrice],
                connect: true,
                step: 1,
                range: {
                    min: minPrice,
                    max: maxPrice,
                },
                format: formatForSlider,
                tooltips: {
                    to: function (numericValue) {
                        return numericValue.toFixed(1);
                    },
                },
            });
        }

        function offsetFilter() {
            const slider = document.getElementById('offset-slider') as noUiSlider.target;
            let minOffset = 0;
            let maxOffset = 0;

            const pricesArr = goods.map((item) => {
                const offset = item.parameters.ET;
                return offset;
            });

            minOffset = Math.min(...pricesArr);
            maxOffset = Math.max(...pricesArr);

            const formatForSlider = {
                from: function (formattedValue: string) {
                    return Number(formattedValue);
                },
                to: function (numericValue: number) {
                    return Math.round(numericValue);
                },
            };

            noUiSlider.create(slider, {
                start: [0, maxOffset],
                connect: true,
                step: 1,
                range: {
                    min: minOffset,
                    max: maxOffset,
                },
                format: formatForSlider,
                tooltips: {
                    to: function (numericValue) {
                        return numericValue.toFixed(1);
                    },
                },
            });
        }

        colorFilter();
        diameterFilter();
        pcdFilter();
        wideFilter();
        priceFilter();
        offsetFilter();
    }
}
