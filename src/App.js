
import ReactDOM from "react-dom";
import React from "react";
import RootView from "./RootView.js";
import 'mobx-react-lite/batchingForReactDom';
import { PostItem } from '../store/PostItem.ts'
import {addPost} from "../action/action.ts";
import {postMutator} from "../mutator/PostMutator.ts";

ReactDOM.render(<RootView/>, document.getElementById("root"));

let count = 0;
let postItemArray = new Array();
postItemArray.push(new PostItem(1, "MonsteR", 23, 123124123, "Supabase (YC S20) – An open source Firebase alternative", "post", "https://news.ycombinator.com"));
postItemArray.push(new PostItem(2, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));
postItemArray.push(new PostItem(3, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));

setInterval(function(){ 
    console.log("MonsteR::SetInterval::", count);
    count = count % 2;
    addPost(postItemArray[count++]);
 }, 3000);