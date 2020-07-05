const UNIT_SECONDS = 1;
const UNIT_MINUTE = 60 * UNIT_SECONDS;
const UNIT_HOUR = 60 * UNIT_MINUTE;
const UNIT_DAY = 24 * UNIT_HOUR;

const PREVIOUS_SUFFIX = "ago";
const DAY_STRING = "day";
const HOUR_STRING = "hour"
const MINUTE_STRING = "minute";
const SECOND_STRING = "second";
const COMMENT_STRING = "comment";
const PLURAL_SUFFIX = "s";
const SPACE_STRING = " ";

const NO_PARENT = -1;

function getTimeDifference(postTime:number): number{
    const currentTime = Math.floor((new Date()).getTime() / 1000);
    let timeDifference = currentTime - postTime;
    return timeDifference;
}

export function getTimeDifferenceString(postTime:number): string {
    var differenceString:string;
    let timeDifference = getTimeDifference(postTime);
    
    if (timeDifference/UNIT_DAY > 1){
        let days = Math.floor(timeDifference/UNIT_DAY)
        differenceString = days.toString() + DAY_STRING;
        if (days > 1){
            differenceString = differenceString + PLURAL_SUFFIX;
        }
    } else if(timeDifference/UNIT_HOUR > 1){
        let hours = Math.floor(timeDifference/UNIT_HOUR);
        differenceString = hours.toString() + HOUR_STRING;
        if (hours > 1){
            differenceString = differenceString + PLURAL_SUFFIX
        }
    }else if(timeDifference/UNIT_MINUTE > 1) {
        let minutes = Math.floor(timeDifference/UNIT_MINUTE);
        differenceString = minutes.toString() + MINUTE_STRING;
        if (minutes > 1){
            differenceString += PLURAL_SUFFIX;
        }
    }else {
        if (timeDifference >= UNIT_MINUTE){
            console.log("MonsteR:: Should not reach here with seconds greater than 59. Something is wrong with difference logic");
            differenceString = timeDifference.toString() + SECOND_STRING;
            if (timeDifference > 1){
                differenceString += PLURAL_SUFFIX;
            }
        }
    }
    differenceString = differenceString + SPACE_STRING+ PREVIOUS_SUFFIX
    
    console.debug("Time difference is", differenceString);
    return differenceString;
}

export function getCommentsString(count: number): string{
    let commentCountString: string = count.toString() + SPACE_STRING + COMMENT_STRING;
    if (count > 1){
        commentCountString = commentCountString  + PLURAL_SUFFIX;
    }
    return commentCountString;
}