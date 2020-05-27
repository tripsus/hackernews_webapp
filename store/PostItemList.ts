import {createStore} from 'satcheljs'
import { PostItem } from './PostItem'

let postListStore = createStore('postListStore', {postList: Array<PostItem>()});
export default postListStore;
// PostItemList.push(new PostItem(1, "MonsteR", 23, 123124123, "Supabase (YC S20) – An open source Firebase alternative", "post", "https://news.ycombinator.com"));
// PostItemList.push(new PostItem(2, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));
// PostItemList.push(new PostItem(3, "MonsteR", 23, 123124123, "Qt Online Installer 3.2.3 ", "post", "https://news.ycombinator.com"));
// PostItemList.push(new PostItem(4, "MonsteR", 23, 123124123, "AWS services explained in one line each ", "post", "https://news.ycombinator.com"));
