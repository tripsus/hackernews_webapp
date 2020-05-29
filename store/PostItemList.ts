import {createStore} from 'satcheljs';
import { PostItem } from './PostItem';

const postList:Array<PostItem> = new Array<PostItem>();
const postListStore = createStore<Array<PostItem>>('postListStore', postList);

export default postListStore;
