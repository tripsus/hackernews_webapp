
import React from "react";
import 'mobx-react-lite/batchingForReactDom';
import Routes from "./Routes"

function App() {
    return(
        <div>
            <Routes/>
        </div>
    );
}
export default App;










/*
let count = 0;
let postItemArray = new Array();
postItemArray.push(new PostItem(1, "MonsteR", 23, 123124123, "Supabase (YC S20) – An open source Firebase alternative", "post", "https://news.ycombinator.com"));
postItemArray.push(new PostItem(2, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));
postItemArray.push(new PostItem(3, "MonsteR", 23, 123124123, "Ask HN: Any job boards and age-friendly companies for older developers?", "post", "https://news.ycombinator.com"));

// let testPost = setInterval(function(){ 
//     console.log("MonsteR::SetInterval::", count);
//     count = count % 2;
//     addPost(postItemArray[count++]);
//     console.log("MonsteR:: postListStore", )
//  }, 3000);*/