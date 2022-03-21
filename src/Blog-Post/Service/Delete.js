import axios from "axios";

export const Delete = (LinkRoot, Path) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${LinkRoot}/${Path}`).then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject(err);
            }
        );
    });

    return promise;
};
