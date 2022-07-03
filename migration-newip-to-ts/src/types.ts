import AppController from './components/controller/controller';
import AppView from './components/view/appView';

export type ArticleType = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};

export type SourceType = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type TopHeadlinesEndpointResponse = {
    status: string;
    totalResults: number;
    articles: ArticleType;
};

export type SourcesEndpointResponse = {
    status: string;
    sources: SourceType;
};

export type LoadData = {
    endpoint: string;
    options?: {
        [prop: string]: string;
    };
};

export type Callback<T> = (data: T) => void;

export interface ISource {
    draw: (data: SourceType[]) => void;
}

export interface INews {
    draw: (data: ArticleType[]) => void;
}

export interface IAppView {
    drawNews: (data: TopHeadlinesEndpointResponse) => void;
    drawSources: (data: SourcesEndpointResponse) => void;
}

export interface ILoader {
    baseLink: string;
    options: {
        [prop: string]: string;
    };

    getResp: (data: LoadData, callback: (arg: unknown) => void) => void;
    errorHandler: (res: Response) => Response;
    makeUrl: (options: { [prop: string]: string }, endpoint: string) => string;
    load: (
        method: string,
        endpoint: string,
        callback: (data: SourcesEndpointResponse) => void,
        options: { [prop: string]: string }
    ) => void;
}

export interface IController {
    getSources: (callback: Callback<SourcesEndpointResponse>) => void;
    getNews: (e: Event, callback: Callback<TopHeadlinesEndpointResponse>) => void;
}

export interface IApp {
    controller: AppController;
    view: AppView;

    start: () => void;
}

export enum StatusCode {
    unauthorized = 401,
    notFound = 404,
}
