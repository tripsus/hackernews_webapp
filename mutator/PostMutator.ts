import {mutator} from 'satcheljs';
import { addPost } from '../action/action.ts';
import {postListStore} from '../store/PostItemList.ts';

const postMutator =  mutator(addPost, (actionMessage) => {
    console.log("MonsteR::Mutator::", actionMessage);
    postListStore().push(actionMessage.post);
});

export default postMutator;