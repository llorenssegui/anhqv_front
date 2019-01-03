const HOST = "https://warm-plateau-81725.herokuapp.com/api";

export default {
    getCharacters: () => {
        return fetch(HOST + '/characters/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
    getCharacter: (id) => {
        return fetch(HOST + '/characters/' + id + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
    getClip: (id) => {
        return fetch(HOST + '/clips/' + id + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
};