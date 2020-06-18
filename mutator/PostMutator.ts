import {mutator} from 'satcheljs';
import { addPost } from '../action/actions.ts';
import {postLists} from '../store/store.ts';

const postMutator =  mutator(addPost, (actionMessage) => {
    console.debug("MonsteR::Mutator::", actionMessage);
    postLists().push(actionMessage.post);
});

export default postMutator;