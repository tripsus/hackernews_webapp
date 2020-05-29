interface PostItemProps{
    postId: number;
    owner: string;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

export class PostItem {
    postId: number;
    owner: String;
    descendants: Number;
    kids: Array<Number>;
    score: Number;
    time: Number;
    title: String;
    type: String;
    url: String;
    constructor(postId: number,
                owner: string,
                score: number,
                time: number,
                title: string,
                type: string,
                url: string){
        this.postId = postId;
        this.owner = owner;
        this.score = score;
        this.time = time;
        this.title = title;
        this.type = type;
        this.url = url;
    }
}

// Clent side postdetail keys
const POSTID = "postId";
const OWNER = "owner";
const DESCENDANTS = "descendants";
const KIDS = "kids";
const SCORE = "score";
const TIME = "time";
const TITLE = "title";
const TYPE = "type";
const URL = "url"

let CLIENT_KEY_LIST:Array<string> = new Array();
CLIENT_KEY_LIST = [POSTID, OWNER, DESCENDANTS, KIDS, SCORE, TIME, TITLE, TYPE, URL];
// Server side postdetail keys
const SV_POSTID = "id";
const SV_OWNER = "by";
const SV_DESCENDANTS = "descendants";
const SV_KIDS = "kids";
const SV_SCORE = "score";
const SV_TIME = "time";
const SV_TITLE = "title";
const SV_TYPE = "type";
const SV_URL = "url"

var postDetailJsonClassMap = new Map();
postDetailJsonClassMap.set(POSTID, SV_POSTID);
postDetailJsonClassMap.set(OWNER, SV_OWNER);
postDetailJsonClassMap.set(DESCENDANTS, SV_DESCENDANTS);
postDetailJsonClassMap.set(KIDS, SV_KIDS);
postDetailJsonClassMap.set(SCORE, SV_SCORE);
postDetailJsonClassMap.set(TIME, SV_TIME);
postDetailJsonClassMap.set(TITLE, SV_TITLE);
postDetailJsonClassMap.set(TYPE, SV_TYPE);
postDetailJsonClassMap.set(URL, SV_URL);

export function createPostItem(data: any){

    const postId = data.hasOwnProperty(postDetailJsonClassMap.get(POSTID)) ? data[postDetailJsonClassMap.get(POSTID)] : 0;
    const owner = data.hasOwnProperty(postDetailJsonClassMap.get(OWNER)) ? data[postDetailJsonClassMap.get(OWNER)] : "No Owner";
    const score = data.hasOwnProperty(postDetailJsonClassMap.get(SCORE)) ? data[postDetailJsonClassMap.get(SCORE)] : 0;
    const time = data.hasOwnProperty(postDetailJsonClassMap.get(TIME)) ? data[postDetailJsonClassMap.get(TIME)] : 0;
    const type = data.hasOwnProperty(postDetailJsonClassMap.get(TYPE)) ? data[postDetailJsonClassMap.get(TYPE)] : "None";
    const title = data.hasOwnProperty(postDetailJsonClassMap.get(TITLE)) ? data[postDetailJsonClassMap.get(TITLE)] : 0;
    const url = data.hasOwnProperty(postDetailJsonClassMap.get(URL)) ? data[postDetailJsonClassMap.get(URL)] : 0;
    
    let iPostItem = new PostItem(postId, owner, score, time, title, type, url);
    return iPostItem;
}