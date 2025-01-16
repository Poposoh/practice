import React from "react"
import { Button, Form, Input } from "antd";
import "../comment/Comment.css"

type FieldType = {
  username?: string;
  content?: string;
  createTime?: string;
}

interface CommentInputProps {
  onSubmit?: (event: React.FormEvent) => void;
}
class CommentInput extends React.Component<CommentInputProps> {
  textareaRef = React.createRef<HTMLTextAreaElement>();

  componentDidMount() {
    this.textareaRef.current && this.textareaRef.current.focus();
  }

  _getProcessedContent(content: string) {
    //防止用户输入html标签
    return content.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  render() {
    return (
      <Form name="form" labelCol={{span: 8}}  autoComplete="off" className="commentInputBox"
        wrapperCol={{ span: 16 }} style={{maxWidth: 600}}
        onFinish={this.props && this.props.onSubmit}
      >
        <Form.Item<FieldType> label="用户名" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item<FieldType> label="评论内容" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
          {/* <Input.TextArea ref={this.textareaRef} autoSize={{minRows:4, maxRows: 10}} placeholder="请输入评论内容" dangerouslySetInnerHTML={{__html: this._getProcessedContent(value)}}/> */}
          <Input.TextArea ref={this.textareaRef} autoSize={{minRows:4, maxRows: 10}} placeholder="请输入评论内容" />
        </Form.Item>
        <Form.Item<FieldType>>
          <Button type="primary" htmlType="submit">发布</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default CommentInput;