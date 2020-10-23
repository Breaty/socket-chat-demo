import { connect } from 'react-redux';
import React,{useState} from 'react';
import {Form,Button,Input,Checkbox, Modal}  from "antd";
import "./index.scss"

function LoginForm(props) {
  console.log("登錄显示：",props )

  const [showLogin,setShowLogin] = useState(props.showLogin);
    const layout = {
        labelCol: {
        span: 6,
        },
        wrapperCol: {
        span: 18,
        },
    };

  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 18,
    },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    props.changeLoginState(new Date().getTime().toString(),true, values.username, "token");
    setShowLogin(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setShowLogin(false);
  };

  return (
    // <div className="login-container">
      <Modal 
          
          visible={showLogin} 
          footer={null}
          onCancel={()=>{setShowLogin(false)}}
          >
    <div className="login-container">
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox> Remember me </Checkbox>{" "}
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录{" "}
        </Button>{" "}
      </Form.Item>{" "}
    </Form>
    </div>
    </Modal>
    /* </div> */
  );
}
const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapActionToProps = (dispatch) => {
    return {
        changeLoginState: (_id,loginstate, username) => {
          // dispatch({type:"userlogin",loginstate, username});
          dispatch({type:"CHAT_SEND_MESSAGE", data:{type:"userlogin",username}});
            // setUpSocket(dispatch,username);
        }
    }
}
export default  connect(mapStateToProps, mapActionToProps)(LoginForm)