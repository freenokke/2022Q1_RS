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

export type LoadData = {
    endpoint: string;
    options?: {
        [prop: string]: string;
    };
};

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
