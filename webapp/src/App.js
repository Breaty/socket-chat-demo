import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import routers from "./router";
import "antd/dist/antd.css";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from 'react-router-dom';

// import Header from "./components/header"

function App(props) {
  console.log("app",props)

  return (
    <div className="App">
      <BrowserRouter>
          {
            renderRoutes(routers)
          }
      </BrowserRouter>
     
    </div>
  );
}

// 登录状态管理
const mapStateToProps = (state) => {
  return {state}
}

export default App;