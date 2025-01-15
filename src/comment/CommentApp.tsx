import React from "react";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import "./Comment.css";

// 评论组件
interface Comment {
  username?: string;
  content?: string;
  createTime?: string;
}

interface Comments {
  comments: Comment[];
  onCloseComment?: (index: number) => void;
}

class CommentApp extends React.Component<{}, Comments> {
  constructor(props: {}) {
    super(props);
    this.state = {
      comments: [],
    }
  }
  componentWillMount() {
    this._loadComments();
  }
  //私有方法，使用_标识
  _saveComments(comment: Comment[]) {
    localStorage.setItem("comments", JSON.stringify(comment));
  }

  _loadComments() {
    const comments = localStorage.getItem("comments");
    if(comments) {
      this.setState({comments: JSON.parse(comments)});
    }
  }

  handlerSubmitCommit = (e: any) => {
    e.createTime = new Date().toLocaleString();
    this.state.comments.push(e);
    this.setState({comments: this.state.comments});
    this._saveComments(this.state.comments);
    console.log("提交成功11", e);
  }

  handlerDelete(index: number) {
    this.state.comments.splice(index, 1);
    this.setState({comments: this.state.comments});
    this._saveComments(this.state.comments);
  }

  render() {
    return (
      <div className="commentAppBox">
        <CommentInput onSubmit={this.handlerSubmitCommit}/>
        <CommentList comments={this.state.comments} onCloseComment={(index) => this.handlerDelete(index)}/>
      </div>
    )
  }
}

export default CommentApp;