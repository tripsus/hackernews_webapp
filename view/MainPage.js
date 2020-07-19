import React, { useEffect, useState } from "react";
import styles from "./MainPage.css"
import { observer } from "mobx-react";
import { fetchPosts } from '../action/actions.ts'
import { postList } from "../store/store.ts";
import { throttle } from "lodash";
import history from '../history'

import {fetchTopPosts, fetchComments} from "../action/actions.ts";

//Keep below mutator here dont remove otherwise they are not registerd.
import {postMutator} from "../mutator/PostMutator.ts";
import {fetchPostOrchestrator} from "../orchestrator/fetchpost_orchestrator.ts";

fetchTopPosts("top 500");

let TitleRow = observer((props) => {
    return(
        <div className={styles.titleRowContainer}>
            <a className={styles.titleRowText} href={props.url}>
                {props.title}
            </a>
        </div>
    );
});

let MetaDataRow = observer((props) => {
    return(
        <div className={styles.metaDataRowContainer}>
            <div className={styles.time}> {props.time} </div>
            <div className={styles.owner}>{props.owner}</div>
        </div>
    );
});

let UpVoteView = observer((props) => {
    function upVote(){
        console.debug("Upvote clicked");
    }
    return(
        <td className={styles.UpVote}>
            <button onClick={upVote}>Upvote</button>
            <div className={styles.UpVoteText}>{props.upVoteCount}</div>
        </td>
    );
});

let CommentView = observer((props) => {
    function loadComments(){
        props.onClick();
    }

    return(
        <td className={styles.Comment}>
            <button onClick={loadComments}>Comments</button>
            <div className={styles.CommentText}>{props.commentsCount}</div>
        </td>
    );
});

let PostDetailView = observer((props) => {
    return(
        <td className={styles.PostDetail}>
            <TitleRow title={props.item.title} url={props.item.url}/>
            <MetaDataRow time={props.item.time} owner={props.item.owner}/>
        </td>
    )
});

let ListItem = observer((props) => {

    function handleCommentLoad(){
        console.info("MonsteR:: Comment clicked for post ", props.index);
        fetchComments(props.item.commentsMap);
        history.push({
            pathname: '/comments',
            postId: props.item.postId
        })
    }
    return(
        <tr className={styles.listItem}>
            <UpVoteView upVoteCount={props.item.score}/>
            <PostDetailView {...props}/>
            <CommentView commentsCount={props.item.commentsMap.size} onClick={handleCommentLoad}/>
        </tr>
    );
});


let PostListPageView = observer(() => {
    let postListData = postList
    // Todo: Add throttling
    function handleScroll(){
        console.log("MonsteR:: Scroll Event");
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("MonsteR:: Reached end of page");
            fetchPosts("top 500");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', throttle(handleScroll,500), {passive:true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return(
    <div id="approot" className={styles.roottxt}>
        <table className={styles.table}>
            <tbody>
            {postListData.map( (item, index) => {
                    // console.log("MonsteR::", item);
                    return <ListItem item={item} key={index} index={index}/>
                })
            }
            </tbody>
        </table>
    </div>);
});
export default PostListPageView;

/*
Importing multiple classes of CSS
 <input className={`class1 ${class2}`}>
 */