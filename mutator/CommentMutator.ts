import {mutator} from 'satcheljs';
import { addComment } from '../action/actions.ts';
import { postList, postCommentRealtionMap} from '../store/store.ts';
import { NO_PARENT } from './constants.ts'

const addCommentMutator =  mutator(addComment, (actionMessage) => {
    console.debug("addCommentMutator entry:: actionMessage is ", actionMessage);
    let parentPostList = findParentPostForInsertion(actionMessage.commentItem.parentId)
    // find the parent post
    let parentPostId = parentPostList.pop();
    let postItem = postList.find((postItem) => { return postItem.postId === parentPostId});
    let commentsMap = postItem.commentsMap;
    // traverse the child tree to get actual comment item to insert comment
    while (parentPostList.length > 0){
        parentPostId = parentPostList.pop();
        let commentItem = commentsMap.get(parentPostId);
        if (commentItem === undefined) {
            console.error("Parent id not found for id ", parentPostId);
            break;
        } else {
            commentsMap = commentItem.subCommentsMap;
        }
    }
    commentsMap.set(actionMessage.commentItem.commentId, actionMessage.commentItem);
});

export default addCommentMutator;

function findParentPostForInsertion(commentParentId: number): Array<number>{
    let parentHierarchyList = new Array<number>();

    while (commentParentId != NO_PARENT){
        parentHierarchyList.push(commentParentId);
        commentParentId = postCommentRealtionMap[commentParentId];
    }

    if (parentHierarchyList.length === 0){
        console.error("Couldnot find parent for commet. CommentParentId is ", commentParentId)
    }

    return parentHierarchyList;
}