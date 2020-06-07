import {createStore} from 'satcheljs';
import {ICommentItem} from './CommentItem';

const commentList = new Array<ICommentItem>();
const commentListStore = createStore('commentListStore', commentList);

export {commentListStore};