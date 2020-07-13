import { mutator } from 'satcheljs';
import { addPost } from '../action/actions.ts';
import { postList, postCommentRealtionMap } from '../store/store.ts';
import { NO_PARENT } from './constants.ts'

const postMutator =  mutator(addPost, (actionMessage) => {
    console.debug("MonsteR::Mutator::", actionMessage);
    postList.push(actionMessage.post);
    postCommentRealtionMap[actionMessage.post.postId] = NO_PARENT;
});

export default postMutator;