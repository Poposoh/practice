import { Avatar, List } from "antd";
import React from "react";
import "../comment/Comment.css";
import { CloseOutlined } from "@ant-design/icons";

interface Comment {
  username?: string;
  content?: string;
  createTime?: string;
}

interface Comments {
  comments: Comment[];
  onCloseComment: (index: number) => void;
} 

class CommentList extends React.Component<Comments> {
  constructor(props: Comments) {
    super(props);
  }

  render() {
    // const comments = [
    //   {username: "Lily", content: "写的不错，值得学习"},
    //   {username: "Alice", content: "很好"},
    //   {username: "Bob", content: "请问xxx的xxx"},
    //   {username: "Tom", content: "今天天气不错"},
    //   {username: "Herry", content: "很好很好"},
    // ]
    const {comments, onCloseComment} = this.props;
    return (
      <List itemLayout="horizontal" className="commentListBox"
        dataSource={comments}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={item.username}
            description={item.content}
          />
          <div>
            {item.createTime}
            {<CloseOutlined onClick={() => onCloseComment(index)} />}
          </div>
          </List.Item>
        )}
      />
    )
  }
}

export default CommentList;