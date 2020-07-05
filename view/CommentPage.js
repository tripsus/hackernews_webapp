import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import styles from "./CommentPage.css"
import { postList } from "../store/store.ts";

import {fetchCommentOrchestrator} from '../orchestrator/comment_orchestrator.ts';
import {commentMutator} from '../mutator/CommentMutator.ts';

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
                <CommentHeader owner={props.commentItem.owner} time={props.commentItem.time} subCommentsCount={props.commentItem.subComments.length}/>
                <CommentContent text={props.commentItem.text} />
            </td>
        </tr>
    );

});

let CommentPageView = observer((props) => {
    let postId = props.location.postId;
    let postLists = postList();
    let postItem = postLists.find((postItem) => {return (postItem.postId === postId)});
    let commentList = postItem.commentsList;
    const[commentListProp, setCommentList] = useState(commentList)
    return (
        <table>
            <tbody>
            {
                commentListProp.map((commentItem, index) => {
                    return <CommentListItem commentItem={commentItem} key={index} />
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