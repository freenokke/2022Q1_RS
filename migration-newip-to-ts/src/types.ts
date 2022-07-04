export type ArticleType = {
    readonly author: string;
    readonly content: string;
    readonly description: string;
    readonly publishedAt: string;
    readonly source: { id: string; name: string };
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string;
};

export type SourceType = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
};

export type TopHeadlinesEndpointResponse = {
    readonly status: string;
    readonly totalResults: number;
    articles: ArticleType;
};

export type SourcesEndpointResponse = {
    readonly status: string;
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

export interface IController {
    getSources: (e: Event, country: string, callback: Callback<SourcesEndpointResponse>) => void;
    getNews: (e: Event, callback: Callback<TopHeadlinesEndpointResponse>) => void;
}

export interface IApp {
    start: () => void;
}

export enum StatusCode {
    unauthorized = 401,
    notFound = 404,
}
