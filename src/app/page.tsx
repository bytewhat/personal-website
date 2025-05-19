import Link from "next/link";
import {Github, Twitter} from "lucide-react";
import {Post, RssResponse} from "@/lib/types";
import {PostItem} from "@/components/post-item";

async function getPosts(): Promise<Post[]> {
    try {
        const fetchResponse = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bytewhat",
            {next: {revalidate: 3600}}
        );

        if (!fetchResponse.ok) {
            throw new Error("Failed to fetch posts from RSS feed");
        }

        const rssApiResponse: RssResponse = await fetchResponse.json();

        return rssApiResponse.items.map((rssItem) => {
            const excerptMatch = rssItem.description.match(/<p class=\"medium-feed-snippet\">(.*?)<\/p>/);
            const postExcerpt = excerptMatch ? excerptMatch[1] : "";

            const postDate = new Date(rssItem.pubDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            return {
                id: rssItem.guid,
                title: rssItem.title,
                link: rssItem.link,
                excerpt: postExcerpt,
                date: postDate,
                tags: rssItem.categories || [],
            };
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
            <header className="border-muted bg-muted/30 mb-8 rounded-lg border p-3 md:mb-10 md:p-4">
                <div className="mb-4 flex items-center">
                    <div className="flex space-x-2">
                        <div className="bg-destructive h-3 w-3 rounded-full opacity-70"></div>
                        <div className="bg-muted-foreground h-3 w-3 rounded-full opacity-40"></div>
                        <div className="bg-muted-foreground h-3 w-3 rounded-full opacity-40"></div>
                    </div>
                    <div className="text-muted-foreground flex-1 text-center font-mono text-xs">~/byte</div>
                </div>

                <div className="font-mono">
                    <div className="mb-2 flex">
                        <span className="text-muted-foreground mr-2">$</span>
                        <span className="typing-animation">whoami</span>
                    </div>
                    <div>
                        <p className="mb-2 text-xl font-bold md:text-2xl">byte</p>
                        <p className="text-muted-foreground text-sm md:text-base">
                            developer sharing insights on web development, JavaScript, and modern tech.
                        </p>
                    </div>

                    <div className="mt-4 flex flex-wrap space-x-4 md:mt-6">
                        <Link
                            href="https://x.com/bytewhat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary flex items-center text-sm transition-colors"
                        >
                            <Twitter size={14} className="mr-1"/>
                            <span>@bytewhat</span>
                        </Link>
                        <Link
                            href="https://github.com/bytewhat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary flex items-center text-sm transition-colors"
                        >
                            <Github size={14} className="mr-1"/>
                            <span>bytewhat</span>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="mb-10 md:mb-12">
                <div className="mb-4 flex items-center md:mb-6">
                    <div className="bg-primary mr-2 h-2 w-2 rounded-full"></div>
                    <h2 className="font-mono text-base tracking-tight md:text-lg">latest posts</h2>
                </div>

                <div className="border-muted rounded-lg border border-dashed p-3 md:p-4">
                    {posts.length > 0 ? (
                        <ul className="space-y-4 md:space-y-6">
                            {posts.map((post, index) => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    index={index}
                                    isLastItem={index === posts.length - 1}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground py-8 text-center">
                            <p>no posts available</p>
                        </div>
                    )}

                    {posts.length > 0 && (
                        <div className="mt-3 pt-2 text-right md:mt-4">
                            <Link
                                href="https://bytewhat.medium.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary inline-flex items-center font-mono text-sm transition-colors"
                            >
                                <span className="mr-1">more</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
