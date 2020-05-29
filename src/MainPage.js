import React from "react";
import styles from "./RootView.css"
import { observer } from "mobx-react";
import postListStore from "../store/PostItemList.ts";

let ListItem = observer((props) => {
    //console.log("ListItem:: ",props.item);
    return(
        <div>
            <a href= {props.item.url}>{props.item.title}</a>
        </div>
        
    );
});


let RootView = observer(() => {
    //console.log("MonsteR::RootView", postListStore());
    return(
    <div id="approot" className={styles.roottxt}>
        {postListStore().map( (item) => 
            {
                console.log("MonsteR::", item);
                return <ListItem item={item} key={item.postId}/>
            })
        }
    </div>);
});
export default RootView;