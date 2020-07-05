import {mutator} from 'satcheljs';
import { addComment } from '../action/actions.ts';
import { postList, postCommentRealtionMap} from '../store/store.ts';
import { NO_PARENT } from './constants.ts'

const commentMutator =  mutator(addComment, (actionMessage) => {
    console.debug("MonsteR::Mutator::", actionMessage);
    let postListData = postList();
    let parentPostList = findParentPostForInsertion(actionMessage.commentItem.parentId)
    // find the parent post
    let postItem = postListData.find((postItem) => { return postItem.postId === parentPostList[parentPostList.length-1]});
    let commentsList = postItem.commentsList;
    // traverse the child tree to get actual comment item to insert comment
    for (var commentArrayIndex = parentPostList.length-2; commentArrayIndex >= 0; commentArrayIndex--){
        let commentItem = commentsList.find((commentItem) => { return commentItem.commentId === parentPostList[commentArrayIndex]})
        if (commentItem === undefined) {
            console.error("Parent id not found for id ", parentPostList[commentArrayIndex]);
            break;
        } else {
            commentsList = commentItem.childCommentList;
        }
    }
    commentsList.push(actionMessage.commentItem);
});

export default commentMutator;

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