import React from "react";
import styles from "./RootView.css"
import PostItem from "../models/PostItem"

let ListItem = (props) => {
    console.log(props);
    return(
        <div>Hello World</div>
    );
}

let RootView = () => {
    return(
    <div id="approot" className={styles.roottxt}>
        <ListItem data={PostItem}/>
    </div>);
}
export default RootView;