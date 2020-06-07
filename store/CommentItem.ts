import * as mapping from './serverDataInfo.ts'
import {SERVER_DATA_KEYS} from './serverDataInfo.ts';
import {getTimeDifferenceString} from './util.ts';

export interface ICommentItem{
    owner: String;
    commentId: number;
    subComments: Array<number>;
    parentId: number;
    text: String;
    time: String;
    type: mapping.CONTENT_TYPES;
};

class CommentItem implements ICommentItem{
    owner: String;
    commentId: number;
    subComments: Array<number>; //kids in json data
    parentId: number;
    text: String;
    time: String;
    type: mapping.CONTENT_TYPES;

    constructor(owner: String,
                commentId: number,
                subComments: Array<number>,
                parentId: number,
                text: String,
                time: String,
                type: mapping.CONTENT_TYPES){
                    this.owner = owner;
                    this.commentId = commentId;
                    this.subComments = subComments;
                    this.parentId = parentId;
                    this.text = text;
                    this.time = time;
                    this.type = type;
                }
};

export function createCommentItem(data:any){
    const owner = data[SERVER_DATA_KEYS.OWNER];
    const commentId = data[SERVER_DATA_KEYS.ID];
    const subComments = data[SERVER_DATA_KEYS.KIDS];
    const parentId = data[SERVER_DATA_KEYS.PARENT];
    const text = data[SERVER_DATA_KEYS.TEXT];
    const time = getTimeDifferenceString(data[SERVER_DATA_KEYS.TIME]);
    const type = data[SERVER_DATA_KEYS.TYPE]; 
    let oCommentItem: ICommentItem = new CommentItem(owner, commentId, subComments, parentId, text, time, type);
    return oCommentItem;
}