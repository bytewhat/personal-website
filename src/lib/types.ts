export interface RssItem {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    categories: string[];
}

export interface RssFeed {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
}

export interface RssResponse {
    status: string;
    feed: RssFeed;
    items: RssItem[];
}

export interface Post {
    id: string;
    title: string;
    link: string;
    excerpt: string;
    date: string;
    tags: string[];
}
