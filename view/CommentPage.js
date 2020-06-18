import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import {commentList} from '../store/store.ts';

import {fetchCommentOrchestrator} from '../orchestrator/comment_orchestrator.ts';
import {commentMutator} from '../mutator/CommentMutator.ts';

let CommentListItem = observer((props) =>{
    
    return(<tr>
        <td>
            {props.item.text}
        </td>
    </tr>);

});

let CommentPageView = observer(() => {
    console.log("Entered comments page");
    return (
        <table>
            <tbody>
                {commentList().map((item, index) => {
                    return <CommentListItem item={item}/>
                })
            }
            </tbody>
        </table>
    );
})

let CommentPageViewTest = () => {
    return(
        <div>
            Hello World;
        </div>
    )
}
export default CommentPageView;