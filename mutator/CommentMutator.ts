import {mutator} from 'satcheljs';
import { addComment } from '../action/actions.ts';
import {commentList} from '../store/store.ts';

const commentMutator =  mutator(addComment, (actionMessage) => {
    console.debug("MonsteR::Mutator::", actionMessage);
    commentList().push(actionMessage.commentItem);
});

export default commentMutator;