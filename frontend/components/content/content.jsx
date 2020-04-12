import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import Modal from "react-modal";
import ChannelIndex from "../channel/channel_index";
import AddChannelForm from "../channel/add_channel_form";
import InviteServerForm from "../server/invite_server_form"
import ChannelShow from "../channel/channel_show";

class Content extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hideOptions: ""
        }

        this.closeModal = this.closeModal.bind(this);
        this.stopEvent = this.stopEvent.bind(this);
        this.getAbilities = this.getAbilities.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }


    closeModal(form){
      return e => {
        e.stopPropagation();
        this.props.removeModal(form);
      }
    }

    stopEvent(e){
      e.stopPropagation();
    }

    componentDidMount() {
        const serverId = this.props.match.params.serverId;
        this.props.fetchServer(serverId);
        if(serverId){
            this.props.fetchChannels(serverId);
        }
    }
    
    stopEvent(e){
        e.stopPropagation();
    }

    getHeader(userInfo, logout){
        if (userInfo) {
          return (
            <div className="logout-section">
              <span className="user-initial">{userInfo.username.slice(0, 1).toUpperCase()}</span>
              <strong>{userInfo.username}</strong>
              <button onClick={logout}>Log Out</button>
            </div>
          );
        }
    }

    getAbilities(){
        const {currentUser, currentServer} = this.props;
        if(currentUser.id === currentServer.leader_id){
            return(
                <button className="channel-options-button" onClick={() => 
                    this.props.receiveModal('contentModal')}>
                    Create a Channel!
                    <i className="fas fa-comments" id="message-icon-button"></i>
                </button>
            )
        }
    }

    inviteDetails(){
        const {currentServer} = this.props;
        return (
                <button className="channel-options-button" onClick={() => 
                    this.props.receiveModal('inviteModal')}> 
                    Invite Some Homies!
                    <i className="fas fa-user-friends" id="friends-icon-button"></i>
                </button>
        )
    }

    showOptions(){
        if (this.state.hideOptions === "show"){
            this.setState({hideOptions: ""});
        } else {
            this.setState({hideOptions: "show"});
        }
    }

    render(){
        const {currentUser, logout, currentServer, channels, fetchChannels, createChannel} = this.props;
        const initialHeader = this.getHeader(currentUser, logout);
        return(
            <div className="second-nav">
                <div className="channel-header">
                    <strong>{currentServer.name}</strong>
                    <button className="options-dropdown-button" onClick={this.showOptions}>
                        <i className="fas fa-chevron-circle-down" id="dropdown-icon"></i>
                    </button>
                    <div className={`channel-header-options ${this.state.hideOptions}`} id={this.state.hideOptions}>
                        <ul onClick={this.showOptions}>
                            <li>{this.getAbilities()}</li>
                            <li>{this.inviteDetails()}</li>
                            <li>la</li>
                        </ul>
                    </div>
                </div>
                <div className="channels-container">
                    <ChannelIndex channels={channels} currentServer={currentServer} 
                    currentUser={currentUser} fetchChannels={fetchChannels} path={this.props.location.pathname}/>
                </div>
                <div className="logout-section">
                    {initialHeader}
                </div>


                <Modal className="channel-modal" isOpen={this.props.contentModal} ariaHideApp={false} 
                    style={{ overlay: { backgroundColor: 'rgba(0,0,0,.5)', zIndex: '999' } }} >
                    <div className="channel-modal-close-container">
                        <button onClick={this.closeModal('contentModal')}>X</button>
                    </div>
                    <div>
                        <AddChannelForm currentServer={currentServer} createChannel={createChannel}/>
                    </div>
                </Modal>

                <Modal className="channel-modal" isOpen={this.props.inviteModal} ariaHideApp={false}
                    style={{ overlay: { backgroundColor: 'rgba(0,0,0,.5)', zIndex: '999' } }}>
                        <button onClick={() => this.props.removeModal('inviteModal')} className="invite-close-button">
                            X
                        </button>
                        <InviteServerForm currentServer={currentServer} />
                </Modal>
            </div>
        )
    }
}

export default withRouter(Content);