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
};

class CommentItem implements ICommentItem{
    owner: String;
    commentId: number;
    subCommentsMap: Map<number, ICommentItem>; //kids in json data
    parentId: number;
    text: String;
    time: String;
    type: mapping.CONTENT_TYPES;

    constructor(owner: String,
                commentId: number,
                parentId: number,
                text: String,
                time: String,
                type: mapping.CONTENT_TYPES){
                    this.owner = owner;
                    this.commentId = commentId;
                    this.subCommentsMap = observable(new Map<number, ICommentItem>());
                    this.parentId = parentId;
                    this.text = text;
                    this.time = time;
                    this.type = type;
                }
};

export function createCommentItem(data:any){
    const owner = data[SERVER_DATA_KEYS.OWNER];
    const commentId = data[SERVER_DATA_KEYS.ID];
    const parentId = data[SERVER_DATA_KEYS.PARENT];
    const text = data[SERVER_DATA_KEYS.TEXT];
    const time = getTimeDifferenceString(data[SERVER_DATA_KEYS.TIME]);
    const type = data[SERVER_DATA_KEYS.TYPE];
    
    let iCommentItem: ICommentItem = new CommentItem(owner, commentId, parentId, text, time, type);

    if (data[SERVER_DATA_KEYS.KIDS] !== undefined){
        let subCommentIds = data[SERVER_DATA_KEYS.KIDS];
        subCommentIds.map(element => {
            iCommentItem.subCommentsMap.set(element, undefined);
        })
    }

    return iCommentItem;
}

