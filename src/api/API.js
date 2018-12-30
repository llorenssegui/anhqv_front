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
};