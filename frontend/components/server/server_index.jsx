import React, { useState } from "react";
import { Switch, Router, withRouter } from "react-router-dom";
import ServerIndexItem from "./server_index_item";
import AddServerForm from "./add_server_form";
import JoinServerForm from "./join_server_form";
import Modal from "react-modal";

class ServerIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showModal : true
        }

        this.getHeader = this.getHeader.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.stopEvent = this.stopEvent.bind(this);
    }

    componentDidMount(){
        this.props.fetchServers();
    }

    createServer(e){
        e.preventDefault();
        this.props.addServerModal();
    }

    openModal(){
      this.props.receiveModal();
    }

    closeModal(e){
        e.stopPropagation();
        this.props.removeModal();
    }

    stopEvent(e){
      e.stopPropagation();
    }

    getHeader(userInfo, logout){
        if (userInfo) {
          return (
            <div className="logout-section">
              <strong>{userInfo.username}</strong>
              <button onClick={logout}>Log Out</button>
            </div>
          );
        }
    }

    render(){
        const {currentUser, logout, createServer, joinServer} = this.props;
        const initialHeader = this.getHeader(currentUser, logout);
        let serversList;
        if (this.props.servers){
            serversList = this.props.servers.map((server) => {
              return <ServerIndexItem key={Math.random()} server={server} />;
            });
        }
        
        return (
          <main className="channels-main">
            <div className="server-nav">
              <ul className="server-icons">
                <li>
                  <i className="fas fa-users" id="user-icon"></i>
                </li>
                {serversList}
                <button className="add-server-button" onClick={this.openModal}>+</button>
              </ul>
            </div>

            <div className="channels-nav" onClick={this.closeModal}>
                <div></div>
                {initialHeader}
            </div>

            <Modal className="server-modal" isOpen={this.props.modal} ariaHideApp={false} 
            style={{overlay:{ backgroundColor: 'rgba(0,0,0,.5)'} }}>
              <div className="modal-close-container">
                <button onClick={this.closeModal}>X</button>
              </div>
              <div className="modal-content-header"> 
                <h1>More Conflict is Good!</h1>
              </div>
             
              <div className="server-modal-content">
                <AddServerForm currentUser={currentUser} createServer={createServer}/>
                <JoinServerForm joinServer={joinServer} />
              </div>
              
            </Modal>

          </main>
        );
    }
}

export default withRouter(ServerIndex);