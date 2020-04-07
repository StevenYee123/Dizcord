import React from "react";
import {Link} from "react-router-dom";

class Splash extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const {user} = this.props; 
        let initialHeader;
        if (user){
            initialHeader = () => (
                <>
                    <h3>Hello, {user.username}</h3>
                    <button onClick={this.props.logout}>Log Out</button>
                </>
            )
        } else {
            initialHeader = () => (
              <>
                <Link to="/login">Login</Link>
              </>
            );
        }
        return (
          <div className="splash">
            <header className="splash-nav">
              <div className="left">
                <img
                  src={window.brentURL}
                  alt="discord_logo"
                  className="splash-logo"
                />
                <strong>Conflict</strong>
              </div>
              <div className="right">{initialHeader()}</div>
            </header>
            <div className="splash-mid">
              <div>
                <h1>A new way to chat with your communities and friends</h1>
                <p>
                  Conflict is the easiest way to communicate over voice, video,
                  and text, whether you’re part of a school club, a nightly
                  gaming group, a worldwide art community, or just a handful of
                  friends that want to hang out.
                </p>
              </div>
              <div className="bottom">
                <Link to="/signup" className="signup-button">Sign Up</Link>
                <Link to="/" className="homepage-button">Open Conflict in Your Browser</Link>
              </div>
            </div>
          </div>
        );
    }
}

export default Splash;