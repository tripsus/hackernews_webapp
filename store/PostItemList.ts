import {createStore} from 'satcheljs';
import { IPostItem } from './PostItem';

const postList:Array<IPostItem> = new Array<IPostItem>();
const postListStore = createStore<Array<IPostItem>>('postListStore', postList);

export {postListStore};
