import {action} from 'satcheljs'
import { PostItem } from '../store/PostItem.ts';

export const addPost = action(
    'ADD_POST',
    (post: PostItem) => ({post: post})
);

// addPost(new PostItem(1, "MonsteR", 23, 123124123, "Supabase (YC S20) – An open source Firebase alternative", "post", "https://news.ycombinator.com"));
// addPost(new PostItem(2, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));
// addPost(new PostItem(3, "MonsteR", 23, 123124123, "Qt Online Installer 3.2.3 ", "post", "https://news.ycombinator.com"));
// addPost(new PostItem(4, "MonsteR", 23, 123124123, "AWS services explained in one line each ", "post", "https://news.ycombinator.com"));
