import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import {commentList} from '../store/store.ts';
import styles from "./CommentPage.css"

import {fetchCommentOrchestrator} from '../orchestrator/comment_orchestrator.ts';
import {commentMutator} from '../mutator/CommentMutator.ts';

let CommentHeader = (props) => {
    function prepareHeaderContent(commentAuthor, commentDuration){
        return commentAuthor + " " + commentDuration;
    }
    var headerString = prepareHeaderContent(props.owner, props.time)
    return(
        <div className={styles.commentHeader}>
            {headerString}
        </div>
    )
}

let CommentContent = (props) => {
    return(
        <div className={styles.CommentContent} dangerouslySetInnerHTML={{ __html: props.text }} />
    );
}

let CommentListItem = observer((props) =>{

    let handleCommentClick = () => {
        const commentId = props.commentItem.commentId;

    }
    return(
        <tr className={styles.commentListItem}>
            <td>
                <CommentHeader owner={props.commentItem.owner} time={props.commentItem.time} />
                <CommentContent text={props.commentItem.text} />
            </td>
        </tr>
    );

});

let CommentPageView = observer(() => {
    return (
        <table>
            <tbody>
            {
                commentList().map((commentItem, index) => {
                    return <CommentListItem commentItem={commentItem} key={index}/>
                })
            }
            </tbody>
        </table>
    );
})

export default CommentPageView;