const HOST = "http://localhost:8080/api";

export default {
    getCharacters: () => {
        return fetch(HOST + '/characters/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
      },
};