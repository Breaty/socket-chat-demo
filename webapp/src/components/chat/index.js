import React, { useState, useRef ,useEffect } from 'react';
import { connect } from 'react-redux';
import {Avatar,List,Input,Form}  from "antd";
import { UserOutlined,AudioOutlined } from '@ant-design/icons';

import "./index.scss"

const {Search} = Input; 

function Chat(props){

    const [form] = Form.useForm();
    const sendrefs = useRef(null);

    console.log("message:", props.state)
    const suffix = (
        <AudioOutlined
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
        />
      );

    let renderMsg = (item)=>{
        return (
            <div className="msg-content clearfix left" key ={item._id}>
                <div>
                    <Avatar icon={<UserOutlined />} />
                    <div className="msg-text">{item.content}</div>
                </div>
            </div>
        )
    }

    let onSearch = function (text){
        console.log(props)
        if(!props.state.userInfo.loginState){
            alert("请先登录！")
            return;
        }
        console.log("发送我根本：",props, this, sendrefs)
        sendrefs.current.state.value = "";
        // this.refs.searchBar.state.value = '';
        props.sendMessage(props.state.userInfo._id, props.state.userInfo.username, text);
        form.resetFields();
        return "";
    }


    const uid = props.state.userInfo._id;
     let messages = props.state.messages;

    return (
        <div className="chat-container">
            {/* <h1>聊天室</h1> */}
           
            <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    className={uid === item.userid ? "right":"left"}
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={<a href="https://ant.design">{item.username}</a>}
                    description={item.content}
                    />
                </List.Item>
            )}
        />
        <Form
                form={form}
        >
        <Search
        ref={sendrefs}
                placeholder="input your text"
                enterButton="发送"
                size="large"
                suffix={suffix}
                onSearch={onSearch.bind(this)}
                />
        </Form>
        

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapActionToProps = (dispatch) => {
    return {
        sendMessage: (userid,username, content) => {
            dispatch({ type: "CHAT_SEND_MESSAGE",data:{userid, username, content,type:"newMessage"} })
        }
    }
}

export default  connect(mapStateToProps, mapActionToProps)(Chat)