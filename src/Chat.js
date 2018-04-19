import React , {Component } from 'react'
import io from 'socket.io-client';

class Chat extends Component {
//constructor
constructor(props){
    super(props);

    this.state = {
        username:'',
        message:'',//single message/per user
        messages:[]//global messages / all users
    };

    //Initialize io client
    this.socket = io("http://198.1.1.248:3001");
    this.sendMessage = this.sendMessage.bind(this);
   

    this.socket.on("RECEIVE_MESSAGE", message => {
        this.addMessage(message);
    });




    
}

sendMessage(even){
    even.preventDefault();
    this.socket.emit("SEND_MESSAGE",{
        username:this.state.username,
        message:this.state.message
    });

    this.setState({
        message:''
    });
}


addMessage = message => {
    this.setState({
        messages:[...this.state.messages,message]});
    console.log(this.state.messages);
}





    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                         <div className="card">
                             <div className="card-body">
                                 <div  className="card-title">General Chat</div>
                                 <hr />
                                 <div className="messages" >
                                        {this.state.messages.map((message,index) => {
                                            return(
                                                <div key={index}><strong>{message.username}</strong>: {message.message}</div>
                                            )
                                        })}

                                 </div>
                             </div>
                             <div className="card-footer">
                                 <input type="text" onChange={even=> this.setState({username:even.target.value})} value={this.state.username} placeholder="username" className="form-control"/>
                                 <br/>
                                 <input type="text"  onChange={eve => this.setState({message:eve.target.value})} value={this.state.message} placeholder="Type a message" className="form-control"/> 
                                 <br />
                                 <button onClick={this.sendMessage} className="btn btn-primary form-control">Send Message</button>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Chat;