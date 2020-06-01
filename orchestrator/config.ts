// Todo: Move this as a part of store
export class PostFetchDetails{
    public static TOTAL_POSTS:number = 0;
    public static POSTS_FETCHED:number = 0;
}

export const POST_FETCH_THRESHOLD = 50;
// Holds the list of PosIds for which we need to fetch PostDetails consumed by PostItem.
export const postIdList:Array<number> = new Array<number>();