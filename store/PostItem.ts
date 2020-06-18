import {getTimeDifferenceString, getCommentsString} from './util.ts';
import * as mapping from './serverDataInfo.ts';

export interface IPostItem{
    postId: number;
    owner: String;
    score: Number;
    time: String;
    title: String;
    type: mapping.CONTENT_TYPES;
    url: String;
    kids: Array<Number>;
    commentsCount: number;
}

class PostItem implements IPostItem{
    postId: number;
    owner: String;
    descendants: Number;
    kids: Array<Number>;
    score: Number;
    time: String;
    title: String;
    type: mapping.CONTENT_TYPES;
    url: String;
    commentsCount: number;
    constructor(postId: number,
                owner: String,
                score: number,
                time: String,
                title: String,
                type: mapping.CONTENT_TYPES,
                url: String,
                kids: Array<Number>){
        this.postId = postId;
        this.owner = owner;
        this.score = score;
        this.time = time;
        this.title = title;
        this.type = type;
        this.url = url;
        this.kids = kids;
    }
}

function checkDataValidity(data: any){
    const type = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.TYPE)) ? data[mapping.postDetailJsonClassMap.get(mapping.TYPE)] : "None";
    if (type == mapping.CONTENT_TYPES.NONE){
        console.error("Found a new content type which is not in Enum and it is ", type);
    }
}

export function createPostItem(data: any){

    checkDataValidity(data);
    const postId = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.POSTID)) ? data[mapping.postDetailJsonClassMap.get(mapping.POSTID)] : 0;
    const owner = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.OWNER)) ? data[mapping.postDetailJsonClassMap.get(mapping.OWNER)] : "No Owner";
    const score = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.SCORE)) ? data[mapping.postDetailJsonClassMap.get(mapping.SCORE)] : 0;
    const time = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.TIME)) ? data[mapping.postDetailJsonClassMap.get(mapping.TIME)] : 0;
    const type = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.TYPE)) ? data[mapping.postDetailJsonClassMap.get(mapping.TYPE)] : "None";
    const title = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.TITLE)) ? data[mapping.postDetailJsonClassMap.get(mapping.TITLE)] : 0;
    const url = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.URL)) ? data[mapping.postDetailJsonClassMap.get(mapping.URL)] : 0;
    const kids = data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.KIDS)) ? data[mapping.postDetailJsonClassMap.get(mapping.KIDS)] : [];

    // Get time difference from unix time
    let timeString = getTimeDifferenceString(time);
    let iPostItem = new PostItem(postId, owner, score, timeString, title, type, url, kids);
    
    // Fetch more properties
    if(data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.KIDS))){
        let kids:Array<number> = data[mapping.postDetailJsonClassMap.get(mapping.KIDS)];
        let len = getCommentsString(kids.length);
        console.debug("Comments length is", len);
        iPostItem.commentsCount = parseInt(len);
    }

    if(data.hasOwnProperty(mapping.postDetailJsonClassMap.get(mapping.OWNER))){
        iPostItem.owner = data[mapping.postDetailJsonClassMap.get(mapping.OWNER)];
    }
    
    return iPostItem;
}