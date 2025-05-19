import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Post} from "@/lib/types";

interface PostItemProps {
    post: Post;
    index: number;
    isLastItem: boolean;
}

export function PostItem({post, index, isLastItem}: PostItemProps) {
    return (
        <li className="group">
            <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex">
                    <div
                        className="text-primary/70 shrink-0 pt-0.5 pr-2 font-mono text-xs select-none md:pr-3 md:text-sm">
                        {`[${index}]`}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="group-hover:text-primary truncate font-mono text-base tracking-tight transition-colors md:text-lg">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm">
                            {post.excerpt}
                        </p>
                        <div
                            className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-[10px] md:gap-3 md:text-xs">
                            <time className="font-mono">{post.date}</time>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                                {post.tags.map((tag: string, tagIndex: number) => (
                                    <span
                                        key={tagIndex}
                                        className="bg-muted rounded px-1.5 py-0.5 font-mono text-[9px] md:text-[10px]"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {!isLastItem && <Separator className="my-3 md:my-4"/>}
        </li>
    );
}
