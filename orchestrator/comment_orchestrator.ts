import {orchestrator, ActionMessage} from 'satcheljs';
const axios = require('axios');
import {createCommentItem} from '../store/CommentItem.ts';
import {fetchComments, addComment} from '../action/actions.ts';
import {BASEURL as baseUrl} from './config.ts'

const fetchCommentOrchestrator = orchestrator(fetchComments, (actionMessage:ActionMessage) => {
    actionMessage.commentIds.map((commentId) => {
        return fetchCommentApi(commentId);
    });
});

async function fetchCommentApi(commentId:Number){
    console.debug("MonsteR::Comment fetch api", commentId);
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