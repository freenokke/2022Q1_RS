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
export interface ISource {
    draw: (data: SourceType[]) => void;
}

export interface INews {
    draw: (data: ArticleType[]) => void;
}
