import React from 'react';
import "./index.scss"
import Banner from "../../components/banner";
import Chat from "../../components/chat";
import Header from "../../components/header"


function HomeModel(props){
    return (
        <div className="home-container">
            <Header></Header>
            <Chat></Chat>
        </div>
    )
}

export default HomeModel;
