import {createStore} from 'satcheljs';
import { IPostItem } from './PostItem';


const postList:Array<IPostItem> = new Array<IPostItem>();
const postListStore = createStore<Array<IPostItem>>('postListStore', postList);
const postCommentRealtionMap = {}; // Maintains a map for Parent post/comment for a given comment.

export {postListStore, postCommentRealtionMap};
