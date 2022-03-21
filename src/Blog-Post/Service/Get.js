import axios from "axios";

export const Get = (linkRoot, path) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${linkRoot}/${path}`).then(
            (data) => {
                resolve(data.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
    return promise;
};
