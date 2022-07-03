import './sources.css';
import { SourceType, ISource } from '../../../types';

class Sources implements ISource {
    draw(data: SourceType[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp !== null) {
            data.forEach((item) => {
                const sourceClone = (<HTMLTemplateElement>sourceItemTemp).content.cloneNode(true);

                ((sourceClone as Element).querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                ((sourceClone as Element).querySelector('.source__item') as HTMLElement).setAttribute(
                    'data-source-id',
                    item.id
                );

                fragment.append(sourceClone);
            });
        } else {
            throw new Error('Element with id "#sourceItemTemp" not found');
        }

        if (document.querySelector('.sources') !== null) {
            this.clear();
            (document.querySelector('.sources') as HTMLElement).append(fragment);
        } else {
            throw new Error('Element with class ".sources" not found');
        }
    }

    clear() {
        (document.querySelector('.sources') as HTMLElement).innerHTML = '';
    }
}

export default Sources;
