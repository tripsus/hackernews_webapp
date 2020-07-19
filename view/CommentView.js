import React from "react";
import styles from "./CommentView.css"

let CommentHeader = (props) => {
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
}

let CommentContent = (props) => {
    return(
        <div className={styles.CommentContent} dangerouslySetInnerHTML={{ __html: props.text }} />
    );
}

let CommentListItem = (props) =>{
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

};
export default CommentListItem;