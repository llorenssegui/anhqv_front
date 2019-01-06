const HOST = "https://warm-plateau-81725.herokuapp.com/api";

let functions = {
    buildHeaders: () => {
        return {
            'Content-Type': 'application/json'
        };
    }
};

export default {
    getCharacters: () => {
        return fetch(HOST + '/characters/', {
            method: 'GET',
            headers: functions.buildHeaders()
        }).then(res => res.json());
    },
    getCharacter: (id) => {
        return fetch(HOST + '/characters/' + id + '/', {
            method: 'GET',
            headers: functions.buildHeaders()
        }).then(res => res.json());
    },
    getClip: (id) => {
        return fetch(HOST + '/clips/' + id + '/', {
            method: 'GET',
            headers: functions.buildHeaders()
        }).then(res => res.json());
    },
    getEpisodes: () => {
        return fetch(HOST + '/episodes/', {
            method: 'GET',
            headers: functions.buildHeaders()
        }).then(res => res.json());
    },
};