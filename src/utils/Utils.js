export default {
    getYoutubeVideoId: (url) => {
        try{
            const REG_EXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            let match = url.match(REG_EXP);
            return (match && match[7].length == 11) ? match[7] : false;
        } catch(e) {
            return false;
        }
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
    updateMetadata: (document, title, image) => {
        if(document) {
            let url = window.location.href;
            if(url && url != "") document.getElementsByName('twitter:url')[0].setAttribute('content',url);
            if(title && title != "") document.getElementsByName('twitter:title')[0].setAttribute('content',title);
            if(image && image != "") document.getElementsByName('twitter:image')[0].setAttribute('content',image);
            document.getElementsByName('twitter:description')[0].setAttribute('content',"");

            if(url && url != "") document.querySelector('[property="og:url"]').setAttribute('content', url);
            if(title && title != "") document.querySelector('[property="og:title"]').setAttribute('content', title);
            if(image && image != "") document.querySelector('[property="og:image"]').setAttribute('content', image);
            document.querySelector('[property="og:description"]').setAttribute('content', "");
        }
    },
    buildMetaImageFromYoutubeID: (id) => {
        let image = "";
        if(id) {
            image = "https://img.youtube.com/vi/" + id + "/sddefault.jpg";
        }
        return image;
    },
};