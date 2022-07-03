import News from './news/news';
import Sources from './sources/sources';
import { SourceType, ArticleType, TopHeadlinesEndpointResponse, SourcesEndpointResponse } from '../../types';
import { IAppView } from '../../types';

export class AppView implements IAppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: TopHeadlinesEndpointResponse) {
        const values = (data?.articles ? data?.articles : []) as ArticleType[];
        this.news.draw(values);
    }

    drawSources(data: SourcesEndpointResponse) {
        const values = (data?.sources ? data?.sources : []) as SourceType[];
        this.sources.draw(values);
    }

    clearNews() {
        this.news.clear();
    }

    clearSources() {
        this.sources.clear();
    }
}

export default AppView;
