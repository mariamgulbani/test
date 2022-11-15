import {LitElement, html,css} from "lit-element";
import {RestClient} from "../../core/rest.js";
import {ws} from "../../socket.js";
import './app-receiver-list.js'
import './app-sender-list.js'



class AppChatModule extends LitElement {
    static get is() {
        return 'app-chat-module';
    }

    static get styles() {
        return css`
          :host{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          
        }
          .users-list {
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;

          }

          .list-item {
            padding: 10px;
          }
          .message{
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;


          }
          .chat-box{
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;

          }
          .message-sender{
            display:flex;
            background-color: cyan;
            justify-content: flex-end;
            
          }
          .message-receiver{
            background-color: burlywood;
          }

        `
    }

    static get properties() {
        return {
            usersList: {type: Array},
            searchTerm: {type: String},
            receiverId: {type: String},
            senderId: {type: String},
            senderName: {type: String},
            receiverName: {type: String},
            message: {type: String},
            messageArray: {type: Array},
        }
    }

    render() {
        return html`


            <app-sender-list @sender='${this._getSenderUser}'></app-sender-list>
            <div>
                <div> Messages</div>
                <div class="message">
                        ${this.messageList}
                </div>
                <div>
                    <input type="text"
                           
                           .value="${this.message}"
                           @input='${(event) => (this.message = event.target.value)}'
                    />
                    <button @click="${this._sendMessage}"
                            
                           >Send
                    </button>

                </div>

            </div>
                <app-receiver-list @receiver='${this._getReceiverUser}'></app-receiver-list>

        `;
    }


    _getMessage() {
        this.messageArray = [];
        RestClient.call('/api/client/getMessageData')
            .then((result) => {
                this.messageArray = result;
                this. _showMessage();

            })
            .catch((error) => console.log(error));
    }

    _showMessage() {
        const Array = this.messageArray.filter((data) =>
            (data.senderId === this.senderId && data.receiverId === this.receiverId) ||
            (data.senderId === this.receiverId && data.receiverId === this.senderId)
        );
        this.messageList = Array.map((data) => {
            return html`
                <div class="message${data.senderId === this.senderId ? "-sender" : "-receiver"}">
                    
                      
                        <span>${data.message}</span>
                    
                </div>
            `

        });
    }


    _sendMessage() {
        console.log(this.message)
        const messageData = {
            senderId: this.senderId,
            senderName: this.senderName,
            receiverId: this.receiverId,
            receiverName: this.receiverName,
            message: this.message,
        };
        console.log(this.message)
        console.log(this.senderId)
        this._saveMessageData(messageData);
        ws.send(JSON.stringify(messageData.message));
        ws.onmessage = function(event) {

            console.log('Client received a message',event);
        };

        this.message = '';
    }

    _saveMessageData(messageData) {
        RestClient.call('/api/client/saveMessageData',messageData)
            .then(()=>
                this._getMessage()
            )
            .catch((error) => console.log(error));
    }




    _getSenderUser(user) {
        this.senderId = user.detail._id;
        this.senderName = user.detail.firstName;
        if (this.receiverId) {
            this._getMessage();
        }
        console.log(this.senderId)
    }

    _getReceiverUser(user) {
        this.receiverId = user.detail._id;
        this.receiverName = user.detail.firstName;
        if (this.senderId) {
            this._getMessage();
        }
        console.log(this.receiverId);
    }


    connectedCallback() {
        super.connectedCallback();

    }

    constructor() {
        super();
        this.usersList = [];
        this.receiverId = '';
        this.senderId = '';
        this.message = '';
        this.senderName = '';
        this.receiverName = '';
        this.messageArray = [];
        this.messageList = '';

    }
}
customElements.define(AppChatModule.is, AppChatModule);