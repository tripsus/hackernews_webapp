import React from "react";
import { observer } from 'mobx-react';

import {fetchCommentOrchestrator} from '../orchestrator/comment_orchestrator.ts';
import {addCommentMutator} from '../mutator/CommentMutator.ts';

import { postList } from "../store/store.ts";
import CommentListItem from "./CommentView.js"


let CommentPageView = observer((props) => {
    let postId = props.location.postId;
    let postItem = postList.find((postItem) => {return (postItem.postId === postId)});
    let commentsMap = postItem.commentsMap;
    let commentsIds = Array.from(commentsMap.keys());
    return (
        <table>
            <tbody>
            {
                commentsIds.map((commentId) => {
                    let commentItem = commentsMap.get(commentId);
                    if(commentItem !== undefined){
                        return (<CommentListItem commentItem={commentItem} key={commentId} />);
                    }
                })
            }
            </tbody>
        </table>
    );
})

export default CommentPageView;