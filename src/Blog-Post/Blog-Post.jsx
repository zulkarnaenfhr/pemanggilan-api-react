import React, { Component, Fragment } from "react";
import Post from "./Component/Post/Post";
import "./Blog-Post.css";
import axios from "axios";
import { API } from "./Service";

class BlogPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            statusLoad: false,
            formBlogPost: {
                userId: 1,
                id: "",
                title: "",
                body: "",
            },
            isUpdate: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.getDataAPI = this.getDataAPI.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.putDataAPI = this.putDataAPI.bind(this);
        this.postDataAPI = this.postDataAPI.bind(this);
    }
    handleRemove = async (id) => {
        API.deleteNewsBlog(id).then((res) => {
            this.getDataAPI();
        });
    };
    getDataAPI = () => {
        API.getNewsBlog().then((data) => {
            this.setState({
                data: data,
                statusLoad: true,
            });
        });
    };
    componentDidMount() {
        this.getDataAPI();
    }
    handleFormChange = async (event) => {
        let formBlogPostNew = { ...this.state.formBlogPost };
        let timeStamp = new Date().getTime();
        formBlogPostNew[event.target.name] = event.target.value;
        if (!this.state.isUpdate) {
            this.state.formBlogPost["id"] = timeStamp;
        }
        this.setState({
            formBlogPost: formBlogPostNew,
        });
    };
    postDataAPI = () => {
        API.postNewsBlog(this.state.formBlogPost).then((res) => {
            this.getDataAPI();
        });
    };
    putDataAPI = async () => {
        // API.putNewsBlog(this.state.formBlogPost, this.state.formBlogPost.id).then((res) => {
        //     this.getDataAPI();
        //     this.setState({
        //         isUpdate: false,
        //     });
        // });
        // API.putNewsBlog(this.state.formBlogPost,this.state.formBlogPost)
        await axios.put(`http://localhost:1414/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost);
        this.setState({
            isUpdate: false,
        });
        this.getDataAPI();
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.isUpdate) {
            await this.putDataAPI();
            this.setState({
                formBlogPost: {
                    userId: 1,
                    id: "",
                    title: "",
                    body: "",
                },
            });
        } else {
            await this.postDataAPI();
            this.setState({
                formBlogPost: {
                    userId: 1,
                    id: "",
                    title: "",
                    body: "",
                },
            });
        }
    };
    handleUpdate = async (data) => {
        this.setState({
            formBlogPost: data,
            isUpdate: true,
        });
    };
    render() {
        return (
            <div className="container">
                {this.state.statusLoad === false ? (
                    <div>loading</div>
                ) : (
                    <Fragment>
                        <div>
                            <label htmlFor="title">
                                Title : <input onChange={this.handleFormChange} value={this.state.formBlogPost.title} type="text" name="title" id="" />
                            </label>
                            <label htmlFor="body">
                                Body : <input onChange={(e) => this.handleFormChange(e)} value={this.state.formBlogPost.body} type="text" name="body" id="" />
                            </label>
                            <button onClick={this.handleSubmit} type="submit">
                                {this.state.isUpdate === false ? "kumpulkan" : "update"}
                            </button>
                        </div>
                        <p className="section-title">Blog Post</p>
                        {this.state.data.map((data) => {
                            return <Post key={data.id} data={data} remove={(id) => this.handleRemove(id)} update={(data) => this.handleUpdate(data)} />;
                        })}
                    </Fragment>
                )}
            </div>
        );
    }
}

export default BlogPost;
