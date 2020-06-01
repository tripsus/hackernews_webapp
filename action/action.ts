import {action, actionCreator} from 'satcheljs'
import { PostItem } from '../store/PostItem';

export const addPost = action(
    'ADD_POST',
    (post: PostItem) => {
        return {post: post}}
);

export const fetchTopPosts = action(
    'TOP_POSTS_FETCH',
    (postType: string) => { 
        return {postType:postType}
    }
);

export const fetchPosts = action(
    'FETCH_NEXT_SET',
    (postType: string) => {
        return {postType:postType}
    }
)