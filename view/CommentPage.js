import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import styles from "./CommentPage.css"
import { postList } from "../store/store.ts";

import {fetchCommentOrchestrator} from '../orchestrator/comment_orchestrator.ts';
import {addCommentMutator} from '../mutator/CommentMutator.ts';

let CommentHeader = observer((props) => {
    function prepareHeaderContent(commentAuthor, commentDuration){
        return commentAuthor + " " + commentDuration;
    }
    function commentClicked(){
        console.log("MonsteR::Fetch child comments");
    }
    var commentString = props.subCommentsCount + " Comments";
    var headerString = prepareHeaderContent(props.owner, props.time)
    return(
        <div>
            <div className={styles.commentHeader}>
                {headerString}
            </div>
            <button onClick={commentClicked}>{commentString}</button>
        </div>
        
    )
})

let CommentContent = observer((props) => {
    return(
        <div className={styles.CommentContent} dangerouslySetInnerHTML={{ __html: props.text }} />
    );
})

let CommentListItem = observer((props) =>{
    let handleCommentClick = () => {
        const commentId = props.commentItem.commentId;
    }
    return(
        <tr className={styles.commentListItem}>
            <td>
                <CommentHeader owner={props.commentItem.owner} time={props.commentItem.time} subCommentsCount={props.commentItem.subCommentsMap.size}/>
                <CommentContent text={props.commentItem.text} />
            </td>
        </tr>
    );

});

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

    // return (<div>
    //     "Hello World"
    // </div>);
})

export default CommentPageView;