module.exports = {
    buildDataMustache: (req, title, description, image) => {
        let url = req.protocol + "://" + req.get('host') + req.originalUrl;
        return {
            url: url,
            title: title,
            description: description,
            image: image
        };
    },
    getYoutubeVideoId: (url) => {
        try{
            const REG_EXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            let match = url.match(REG_EXP);
            return (match && match[7].length == 11) ? match[7] : false;
        } catch(e) {
            return false;
        }
    },
    buildMetaImageFromYoutubeID: (id) => {
        let image = "";
        if(id) {
            image = "https://img.youtube.com/vi/" + id + "/sddefault.jpg";
        }
        return image;
    }
};