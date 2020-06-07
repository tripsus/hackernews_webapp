// Clent side postdetail keys
export const POSTID = "postId";
export const OWNER = "owner";
export const DESCENDANTS = "descendants";
export const KIDS = "kids";
export const SCORE = "score";
export const TIME = "time";
export const TITLE = "title";
export const TYPE = "type";
export const URL = "url";
export const COMMENT_PARENT_ID = "commentParent";
export const COMMENT_TEXT = "commentText";

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
const SV_PARENT = "parent";
const SV_TEXT = "text";

export var postDetailJsonClassMap = new Map();
postDetailJsonClassMap.set(POSTID, SV_POSTID);
postDetailJsonClassMap.set(OWNER, SV_OWNER);
postDetailJsonClassMap.set(DESCENDANTS, SV_DESCENDANTS);
postDetailJsonClassMap.set(KIDS, SV_KIDS);
postDetailJsonClassMap.set(SCORE, SV_SCORE);
postDetailJsonClassMap.set(TIME, SV_TIME);
postDetailJsonClassMap.set(TITLE, SV_TITLE);
postDetailJsonClassMap.set(TYPE, SV_TYPE);
postDetailJsonClassMap.set(URL, SV_URL);
postDetailJsonClassMap.set(COMMENT_PARENT_ID, SV_PARENT);
postDetailJsonClassMap.set(COMMENT_TEXT, SV_TEXT);


export enum CONTENT_TYPES{
    JOB = "job",
    STORY = "story",
    COMMENT = "comment",
    POLL = "poll",
    POLLOPT = "pollopt",
    NONE = "none"
}

export enum SERVER_DATA_KEYS{
    ID = "id",
    OWNER = "by",
    DESCENDANTS = "descendants",
    KIDS = "kids",
    SCORE = "score",
    TIME = "time",
    TITLE = "title",
    TYPE = "type",
    URL = "url",
    PARENT = "parent",
    TEXT = "text",
}