import React, { useEffect } from "react";
import styles from "./RootView.css"
import { observer } from "mobx-react";
import {fetchPosts} from '../action/action.ts'
import postListStore from "../store/PostItemList.ts";

let TitleRow = observer((props) => {
    return(
        <div className={styles.titleRow}>
            <a className={styles.titleRowText} href={props.url}>
                {props.title}
            </a>
        </div>
    );
});

let MetaDataRow = observer((props) => {
    return(
        <div className={styles.metaDataRowContainer}>
            <table>
                <td>
                    <th className={styles.metaDataRowTable}> {props.score} </th>
                    <th> {props.time} </th>
                </td>
                
            </table>
        </div>
    );
});

let ListItem = observer((props) => {
    //console.log("ListItem:: ",props.item);
    return(
        <div className={styles.listItem}>
            <TitleRow title={props.item.title} url={props.item.url}/>
            <MetaDataRow score={props.item.score} time={props.item.time}/>
        </div>
    );
});


let RootView = observer(() => {
    // Todo: Add throttling
    function handleScroll(){
        console.log("MonsteR:: Scroll Event");
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("MonsteR:: Reached end of page");
            fetchPosts("top 500");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive:true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    //console.log("MonsteR::RootView", postListStore());
    return(
    <div id="approot" className={styles.roottxt}>
        {postListStore().map( (item) => {
                // console.log("MonsteR::", item);
                return <ListItem item={item} key={item.postId}/>
            })
        }
    </div>);
});
export default RootView;