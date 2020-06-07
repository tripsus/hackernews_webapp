import React, { useEffect } from "react";
import styles from "./MainPage.css"
import { observer } from "mobx-react";
import { fetchPosts } from '../action/action.ts'
import { postLists } from "../store/store.ts";
import { throttle } from "lodash";

import {fetchTopPosts} from "../action/action.ts";

//Keep below mutator here dont remove otherwise they are not registerd.
import {postMutator} from "../mutator/PostMutator.ts";
import {fetchPostOrchestrator} from "../orchestrator/fetchpost_orchestrator.ts"

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
        console.debug("loadComments clicked");
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
    console.log("ListItem:: ",props.item);
    return(
            <tr className={styles.listItem}>
                <UpVoteView upVoteCount={props.item.score}/>
                <PostDetailView {...props}/>
                <CommentView commentsCount={props.item.commentsCount}/>
            </tr>
    );
});


let PostListPageView = observer(() => {
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
    //console.log("MonsteR::PostListPageView", postListStore());
    return(
    <div id="approot" className={styles.roottxt}>
        <table className={styles.table}>
            <tbody>
            {postLists().map( (item) => {
                    // console.log("MonsteR::", item);
                    return <ListItem item={item} key={item.postId}/>
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