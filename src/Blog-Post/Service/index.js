import axios from "axios";
import { Delete } from "./Delete";
import { Get } from "./Get";
import { Post } from "./Posts";
import { Put } from "./Put";

// posts?_sort=id&_order=desc
const RootPath = "http://localhost:1414";

const getNewsBlog = () => Get(RootPath, "posts?_sort=id&_order=desc");
const postNewsBlog = (data) => Post(RootPath, "posts", data);
const putNewsBlog = (data, id) => Put(RootPath, `posts/${id}`, data);
const deleteNewsBlog = (id) => Delete(RootPath, `posts/${id}`);

export const API = {
    getNewsBlog,
    putNewsBlog,
    postNewsBlog,
    deleteNewsBlog,
};
