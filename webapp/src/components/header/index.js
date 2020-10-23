import { connect } from 'react-redux';
import React, { useState } from 'react';
import {Menu}  from "antd";
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./index.scss"
import LoginForm from "../login/index"

const {SubMenu} = Menu;

function HeaderViewer(props){

    const menus = [
        // {title:"home",path:"/",icon:<AppstoreOutlined/>}
        // ,{title:"个人中心",path:"/personal",icon:<UserOutlined/>}
    ]

    const [currentkey,setCurrentkey] = useState("meanu-0");
    const [showLogin,setShowLogin] = useState(false);
    console.log("headerjs收到的参数：", props)

    function switchPage(page){
        setCurrentkey(page.key);
        console.log(page.key)
        if(page.key === "login-key"){
            setShowLogin(true);
        }
        else if(page.key === "loginout-key"){
            props.changeLoginState(false, "", "");
        }
    }

    return (
        <div className="header-container clearfix">
            <Menu selectedKeys={[currentkey]} mode="horizontal" onClick={switchPage}>
            {
                menus.map((page, index)=>{
                    return (
                    <Menu.Item key={`menu-${index}`} icon={page.icon}>
                        <Link to={page.path}> {page.title}</Link>
                    </Menu.Item>
                    )
                })
            }
            {/* 未登录 */}
            {!props.state.userInfo.loginState && <SubMenu key="SubMenu" className="menu-subs" icon={<UserOutlined />}>
                <Menu.Item key="login-key" className="menu-sub-option">登录</Menu.Item>
                <Menu.Item key="register-key" className="menu-sub-option">注册</Menu.Item>
            </SubMenu>}
            {/* 已经登录 */}
            {props.state.userInfo.loginState && <SubMenu  icon={<UserOutlined />} title={props.state.userInfo.username}>
                <Menu.Item key="personal-key" className="menu-sub-option"><Link to="/personal"><span>个人中心</span></Link></Menu.Item>
                <Menu.Item key="loginout-key" className="menu-sub-option">退出</Menu.Item>
            </SubMenu>}
            </Menu>
           { showLogin ? 
              <LoginForm showLogin={showLogin}></LoginForm>
            : ""}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        state:{
            userInfo:state.userInfo
        }
    }
}

const mapActionToProps = (dispatch) => {
    return {
        changeLoginState: (newState, userName, token) => {
            dispatch({ type: "CHANGE_LOGIN_STATE", loginstate: newState, userName: userName, token: token })
        }
    }
}

export default  connect(mapStateToProps, mapActionToProps)(HeaderViewer)