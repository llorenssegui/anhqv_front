export default {
    getYoutubeVideoId: (url) => {
        const REG_EXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(REG_EXP);
        return (match&&match[7].length==11)? match[7] : false;
    },
    hoursToSeconds: (hours) => {
        let seconds = undefined;
        if(hours != undefined && hours != null) {
            seconds = Number(hours) * 3600;
        }
        return seconds;
    },
    minutesToSeconds: (minutes) => {
        let seconds = undefined;
        if(minutes != undefined && minutes != null) {
            seconds = Number(minutes) * 60;
        }
        return seconds;
    },
};