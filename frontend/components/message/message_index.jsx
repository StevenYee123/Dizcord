import React from "react";
import MessageIndexItem from "./message_index_item";
import MembersIndex from "../users/members_index";
import MessageForm from "./message_form";
import App from "../App";

class MessageIndex extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            body: '',
            author_id: null,
            channel_id: null
            // messages: []
        }
        this.bottom = React.createRef();
        this.keyPressed = this.keyPressed.bind(this);
    }

    keyPressed(e){
        const currentState = this.state;
        // const channelId = this.props.currentChannel.id;
        if (e.key === "Enter"){
            this.setState({body: ""}, () => this.props.createMessage(currentState));
            // this.props.createMessage(this.state).then(() => {
            //     this.setState({ body: "" })
            // })
            // this.setState({ body: "" }, () => {
            //     this.props
            // });
        }
    }

    handleChange(field){
        return e => {
            this.setState({[field]: e.target.value})
        }
    }

    // componentDidMount() {
    //     let cable = ActionCable.createConsumer();
    //     this.chats = cable.subscriptions.create(
    //     { channel: "ChatChannel" },
    //     {
    //         received: data => {
    //         this.setState({
    //             messages: this.state.messages.concat(data.message)
    //         });
    //         },
    //         speak: function(data) {
    //         return this.perform("speak", data);
    //         }
    //     }
    //     );
    // }

    componentDidUpdate(){
        let channelId = parseInt(this.props.match.params.channelId);
        if (this.state.channel_id !== channelId){
            this.setState({channel_id : channelId}, () => {
                this.props.fetchMessages(channelId).then(() => this.createSocket());
            });
        }

        if ((!this.state.author_id && !this.state.channel_id) 
        && this.props.currentChannel !== {} && this.state.channel_id !== channelId){
            this.setState({
                author_id: this.props.currentUser.id,
                channel_id: channelId
            })
        }
    }

    createSocket() {
        let cable = ActionCable.createConsumer();
        this.chats = cable.subscriptions.create({
        channel: 'ChatChannel'
        }, {
        connected: () => {
        },
        received: (messages) => {
            this.props.receiveMessages(messages);
        },
        create: function(chatContent) {
            this.perform('create', {
            content: chatContent
            });
        },
        load: function(){
            return this.perform("load")
        }
        });
    }

    render(){
        const { messages, currentChannel, fetchUsers, currentServer, users } = this.props;
        const channelMessages = Object.values(messages);
        let messageIndexItems;
        if (channelMessages.length > 0){
            messageIndexItems = channelMessages.reverse().map((message) => {
                return (
                    <MessageIndexItem key={Math.random()} message={message}/>
                )
            })
        }
        return(
            <div className="last-container">
                <div className="channel-title-bar">
                    <h1><strong>#</strong>{currentChannel.name}</h1>
                </div>
                <div className="last-container-main">
                    <div className="last-container-left">
                        <div className="messages-container">
                            {messageIndexItems}
                        </div>
                        <div className="enter-message-container">
                            <input type="text" className="enter-message-field" onKeyPress={this.keyPressed} value={this.state.body}
                            onChange={this.handleChange('body')} placeholder="Enter a message for your homies to see!" />
                        </div>
                    </div>
                    <MembersIndex fetchUsers={fetchUsers} currentServer={currentServer} users={users}/>
                </div>
            </div>
        )
    }
}

export default MessageIndex;