import {orchestrator} from 'satcheljs';
import {fetchTopPosts, fetchPosts, addPost} from '../action/actions.ts';
import {createPostItem} from '../store/PostItem.ts';
import {PostFetchDetails, postIdList, POST_FETCH_THRESHOLD, BASEURL as baseUrl} from './config.ts'
import { IPostItem } from '../store/PostItem';

const axios = require('axios');

const fetchTopPostOrchestrator =  orchestrator(fetchTopPosts, (actionMessage) => {
    fetchTopPostsApi()
});

const fetchPostsOrchestrator = orchestrator(fetchPosts, () => {
    fetchPostDetailsForIds();
})

async function fetchTopPostsApi() {
    console.log("MonsteR::fetchTopPostsApi");
    await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(
        function handleSuccess(resp){
            resp.data.map((id:number) => postIdList.push(id));
            PostFetchDetails.TOTAL_POSTS = postIdList.length;
            fetchPostDetailsForIds();
        })
    .catch(
        function handleFailure(err){
            console.error("Monster::fetchTopPostsApi failed with error", err);
        })
}

function fetchPostDetailsForIds(){
    console.debug("MonsteR::fetchPostDetailsForIds");

    const totalPostIds = postIdList.length;
    if (totalPostIds === 0){
        console.error("MonsteR:: Not able to fetch any post do we have a valid internet connection?")
    }

    // console.debug("MonsteR::", postIdList);

    let postsFetchEndIndex:number = PostFetchDetails.POSTS_FETCHED + POST_FETCH_THRESHOLD;
    // If we have already fetched top 500 we don't have anything more to fetch
    postsFetchEndIndex = (postsFetchEndIndex >= totalPostIds) ? totalPostIds : postsFetchEndIndex;
    for(let i=PostFetchDetails.POSTS_FETCHED; i<postsFetchEndIndex; i++){
        fetchPostDetail(postIdList[i]);
        PostFetchDetails.POSTS_FETCHED += 1;
    }
    
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
    let iPostItem:IPostItem = createPostItem(data);
    //console.log("dispatchAddTodoAction", iPostItem);
    addPost(iPostItem);
}