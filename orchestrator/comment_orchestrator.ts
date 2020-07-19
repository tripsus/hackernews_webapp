import {orchestrator, ActionMessage} from 'satcheljs';
const axios = require('axios');
import {createCommentItem} from '../store/CommentItem.ts';
import {fetchComments, addComment} from '../action/actions.ts';
import {BASEURL as baseUrl} from './config.ts'

const fetchCommentOrchestrator = orchestrator(fetchComments, (actionMessage:ActionMessage) => {
    console.debug("fetchCommentOrchestrator::Entry sizeof commentsMap is", actionMessage.commentsMap.size);
    actionMessage.commentsMap.forEach((value, key) => {
        if (value === undefined){ // We don'twant to fetch data from server when user comes to comment section for second time
            return fetchCommentApi(key);
        }
    });
});

async function fetchCommentApi(commentId:Number){
    let url:String = baseUrl + "item/" + commentId.toString() + ".json";
    await axios.get(url)
    .then(
        function handleSuccess(resp){
            //console.log("fetchPostDetail", resp.data);
            dispatchAddCommentAction(resp.data)
        }
    )
    .catch(
        function handleFailure(err){
            console.error("fetchCommentApi failed with error", err);
        }
    )
}

function dispatchAddCommentAction(data:any){
    let oCommentItem = createCommentItem(data);
    addComment(oCommentItem);
}