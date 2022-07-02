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

export interface INews {
    draw: (data: ArticleType[]) => void;
}
