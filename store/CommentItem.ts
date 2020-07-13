import { observable } from "mobx";

import * as mapping from './serverDataInfo.ts'
import {SERVER_DATA_KEYS} from './serverDataInfo.ts';
import {getTimeDifferenceString} from './util.ts';

export interface ICommentItem{
    owner: String;
    commentId: number;
    subCommentsMap: Map<number, ICommentItem>;
    parentId: number;
    text: String;
    time: String;
    type: mapping.CONTENT_TYPES;
    childCommentList: Array<ICommentItem>;
};

class CommentItem implements ICommentItem{
    owner: String;
    commentId: number;
    subCommentsMap: Map<number, ICommentItem>; //kids in json data
    parentId: number;
    text: String;
    time: String;
    type: mapping.CONTENT_TYPES;
    childCommentList: Array<ICommentItem>;

    constructor(owner: String,
                commentId: number,
                subCommentsMap: Map<number, ICommentItem>;
                parentId: number,
                text: String,
                time: String,
                type: mapping.CONTENT_TYPES){
                    this.owner = owner;
                    this.commentId = commentId;
                    this.subCommentsMap = subCommentsMap;
                    this.parentId = parentId;
                    this.text = text;
                    this.time = time;
                    this.type = type;
                    this.childCommentList =  observable(new Array<ICommentItem>());
                }
};

export function createCommentItem(data:any){
    const owner = data[SERVER_DATA_KEYS.OWNER];
    const commentId = data[SERVER_DATA_KEYS.ID];
    const parentId = data[SERVER_DATA_KEYS.PARENT];
    const text = data[SERVER_DATA_KEYS.TEXT];
    const time = getTimeDifferenceString(data[SERVER_DATA_KEYS.TIME]);
    const type = data[SERVER_DATA_KEYS.TYPE];
    let subCommentsMap = new Map<number, ICommentItem>();
    
    if (data[SERVER_DATA_KEYS.KIDS] !== undefined){
        subCommentsMap = data[SERVER_DATA_KEYS.KIDS];
    }
    
    let oCommentItem: ICommentItem = new CommentItem(owner, commentId, subCommentsMap, parentId, text, time, type);
    return oCommentItem;
}

