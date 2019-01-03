export default {
    getYoutubeVideoId: (url) => {
        const REG_EXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(REG_EXP);
        return (match&&match[7].length==11)? match[7] : false;
    }
};