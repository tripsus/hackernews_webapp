import React from "react";
import styles from "./RootView.css"
import {PostItemList} from "../models/PostItemList.ts"

let ListItem = (props) => {
    console.log(props.item);
    return(
        <div>
            <a href= {props.item.url}>{props.item.title}</a>
        </div>
        
    );
}

let RootView = () => {
    
    return(
    <div id="approot" className={styles.roottxt}>
        {PostItemList.map( (item) => 
            {
                return <ListItem item={item} key={item.postId}/>
            })
        }
    </div>);
}
export default RootView;