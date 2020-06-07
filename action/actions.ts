import {action} from 'satcheljs'
import { IPostItem } from '../store/PostItem';
import {ACTION_TYPES} from './action_types.ts';
import { ICommentItem } from '../store/CommentItem';

export const addPost = action(
    ACTION_TYPES.ADD_POST,
    (post: IPostItem) => {
        return {post: post}}
);

export const fetchTopPosts = action(
    ACTION_TYPES.FETCH_TOP_POSTS,
    (postType: string) => { 
        return {postType:postType}
    }
);

export const fetchPosts = action(
    ACTION_TYPES.FETCH_NEXT_SET,
    (postType: string) => {
        return {postType:postType}
    }
);

export const fetchComments = action(
    ACTION_TYPES.FETCH_COMMENTS,
    (comment: Array<Number>) => {
        return {commentIds: comment}
    }
);

export const addComment = action(
    ACTION_TYPES.ADD_COMMENT,
    (comment:ICommentItem) => {
        return {commentItem: comment}
    }
);