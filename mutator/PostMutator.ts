import {mutator} from 'satcheljs';
import { addPost } from '../action/action'
import postListStore from '../store/PostItemList'

let postMutator = mutator(addPost, (actionMessage) => {
    console.log("MonsteR::Mutator::", actionMessage);
    postListStore().postList.push(actionMessage.post);
});

export default postMutator;