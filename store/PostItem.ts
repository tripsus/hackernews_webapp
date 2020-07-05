import { observable } from "mobx";

import {getTimeDifferenceString, getCommentsString} from './util.ts';
import { SERVER_DATA_KEYS, CONTENT_TYPES } from './serverDataInfo.ts';
import { ICommentItem } from './CommentItem';

export interface IPostItem{
    postId: number;
    owner: String;
    score: Number;
    time: String;
    title: String;
    type: CONTENT_TYPES;
    url: String;
    kids: Array<number>;
    commentsCount: number;
    commentsList: Array<ICommentItem>
}

class PostItem implements IPostItem{
    postId: number;
    owner: String;
    descendants: Number;
    kids: Array<number>;
    score: Number;
    time: String;
    title: String;
    type: CONTENT_TYPES;
    url: String;
    commentsCount: number;
    commentsList: Array<ICommentItem>;

    constructor(postId: number,
                owner: String,
                score: number,
                time: String,
                title: String,
                type: CONTENT_TYPES,
                url: String){
        this.postId = postId;
        this.owner = owner;
        this.score = score;
        this.time = time;
        this.title = title;
        this.type = type;
        this.url = url;
        this.commentsList = observable(new Array<ICommentItem>());
    }
}

function checkDataValidity(data: any){
    const type = data.hasOwnProperty(SERVER_DATA_KEYS.TYPE) ? data[SERVER_DATA_KEYS.TYPE] : "None";
    if (type == CONTENT_TYPES.NONE){
        console.error("Found a new content type which is not in Enum and it is ", type);
    }
}

export function createPostItem(data: any){

    checkDataValidity(data);

    const postId = data[SERVER_DATA_KEYS.ID];
    const owner = data[SERVER_DATA_KEYS.OWNER];
    const score = data[SERVER_DATA_KEYS.SCORE];
    const time = data[SERVER_DATA_KEYS.TIME];
    const type = data[SERVER_DATA_KEYS.TYPE];
    const title = data[SERVER_DATA_KEYS.TITLE]
    const url = data[SERVER_DATA_KEYS.URL];

    // Get time difference from unix time
    let timeString = getTimeDifferenceString(time);
    let iPostItem = new PostItem(postId, owner, score, timeString, title, type, url);
    
    // Get more properties from data
    if(data.hasOwnProperty(SERVER_DATA_KEYS.KIDS)){
        let kids:Array<number> = data[SERVER_DATA_KEYS.KIDS];
        let len = getCommentsString(kids.length);
        console.debug("Comments length is", len);
        iPostItem.commentsCount = parseInt(len);
        iPostItem.kids = kids;
    }

    return iPostItem;
}