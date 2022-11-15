import {LitElement, html,css} from "lit-element";
import {RestClient} from "../../core/rest.js";

class AppSenderList extends LitElement {
    static get is() {
        return 'app-sender-list';
    }
    static get styles(){
        return css`
          .users-list{
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;
          }
          .list-item{
            padding: 10px;
          }
          .list-item-active{
            background-color: aqua  ;
            padding: 10px;
          }
          
          
        `
    }
    static get properties() {
        return{
            usersList: {type:Array},
            searchTerm: {type:String},
            senderId: {type:String}
        }
    }

    render(){
        return html`
            <div class="title"> Users List</div>
            <input class="filter"
                   placeholder="Filter"
                   @input="${(event)=> this.searchTerm = event.target.value}">
            <div class="users-list">
            ${this.usersList.filter(((item) => this.filter(item))).map((user) => html`

                <button class="list-item${this.senderId === user._id ? '-active' : ''}"
                        @click="${()=> this._setSenderUser(user)}"
                >
                        <span>
                            ${user.firstName}
                        </span>
                       
                   
                </button>`)}
            </div>
        `;
    }

    filter(item){
        if(!this.searchTerm){
            return true;
        }
        const regex = new RegExp(this.searchTerm,'i');
        //console.log(regex, item.firstName)
        return regex.test(item.firstName);
    }

    _getUsersList(){
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error));
    }


    _setSenderUser (user){
        this.senderId = user._id;
        const event = new CustomEvent('sender', {
            detail: user,
            composed: true,
            bubbles: true,
        });
        this.dispatchEvent(event);
        console.log(user._id)

    }




    connectedCallback() {
        super.connectedCallback();
        this._getUsersList()


    }

    constructor() {
        super();
        this.usersList = [];
        this.senderId='';
    }
}
customElements.define(AppSenderList.is, AppSenderList);