import './news.css';
import { ArticleType, INews } from '../../../types';

class News implements INews {
    draw(data: ArticleType[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as Element;

            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLDivElement).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (<HTMLElement>newsClone.querySelector('.news__meta-author')).textContent = item.author || item.source.name;
            (<HTMLElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            if (newsClone.querySelector('.news__description-title') !== null) {
                (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            } else {
                throw new Error('Element with class ".news__description-title" not found');
            }
            if (newsClone.querySelector('.news__description-source') !== null) {
                (<HTMLElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            } else {
                throw new Error('Element with class ".news__description-source" not found');
            }
            if (newsClone.querySelector('.news__description-content')) {
                (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
            } else {
                throw new Error('Element with class ".news__description-content" not found');
            }
            if (newsClone.querySelector('.news__read-more a') !== null) {
                (<HTMLElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);
            } else {
                throw new Error('Element with class ".news__read-more a" not found');
            }
            fragment.append(newsClone);
        });

        if (document.querySelector('.news') !== null) {
            (<HTMLElement>document.querySelector('.news')).innerHTML = '';
            (<HTMLElement>document.querySelector('.news')).appendChild(fragment);
        } else {
            throw new Error('Element with class ".news" not found');
        }
    }
}

export default News;
