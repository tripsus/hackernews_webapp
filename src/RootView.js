import React from "react";
import styles from "./RootView.css"
import {PostItemList} from "../store/PostItemList.ts"
import { observer } from "mobx-react";
import { getRootStore } from "satcheljs";

let ListItem = observer((props) => {
    console.log(props.item);
    return(
        <div>
            <a href= {props.item.url}>{props.item.title}</a>
        </div>
        
    );
});

let RootView = observer(() => {
    let postList = getRootStore().get('postListStore').postList;
    console.log("MonsteR::", postList);
    return(
    <div id="approot" className={styles.roottxt}>
        {postList.map( (item) => 
            {
                console.log("MonsteR::", item);
                return <ListItem item={item} key={item.postId}/>
            })
        }
    </div>);
});
export default RootView;