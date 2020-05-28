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