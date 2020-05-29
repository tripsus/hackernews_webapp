import {orchestrator} from 'satcheljs';
import {fetchTopPosts, addPost} from '../action/action.ts';
import {createPostItem} from '../store/PostItem.ts';

const axios = require('axios');

const baseUrl = "https://hacker-news.firebaseio.com/v0/";

export const fetchPostOrchestrator =  orchestrator(fetchTopPosts, (actionMessage) => {
    fetchTopPostsApi()
});



async function fetchTopPostsApi() {
    await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(
        function handleSuccess(resp){
            fetchPostDetailsForIds(resp.data);
        })
    .catch(
        function handleFailure(err){
            console.log("Monster::fetchTopPostsApi failed with error", err);
        })
}

function fetchPostDetailsForIds(postIds:Array<number>){
    let count:number = 0;
    
    console.log("Handling suc", postIds);
    postIds.map((postId) => {
        if (count < 5){
            fetchPostDetail(postId);
            count++;
        }
    })
}

async function fetchPostDetail(postId: number) {
    let url:String = baseUrl + "item/" + postId.toString() + ".json";
    await axios.get(url)
    .then(
        function handleSuccess(resp){
            //console.log("fetchPostDetail", resp.data);
            dispatchAddTodoAction(resp.data)
        }
    )
    .catch(
        function handleFailure(err){
            console.log("fetchPostDetail failed with error", err);
        }
    )
}

function dispatchAddTodoAction(data:any){
    let iPostItem = createPostItem(data);
    //console.log("dispatchAddTodoAction", iPostItem);
    addPost(iPostItem);
}