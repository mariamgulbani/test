
import {LitElement, html,css} from "lit-element";
import {RestClient} from "../../core/rest.js";

class AppreceiverList extends LitElement {
    static get is() {
        return 'app-receiver-list';
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
            background-color: burlywood;
            padding: 10px;
          }
          
        `
    }
    static get properties() {
        return{
            usersList: {type:Array},
            searchTerm: {type:String},
            receiverId: {type:String}
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
               
                    <button class="list-item${this.receiverId === user._id ? '-active' : ''}"
                         @click="${()=> this._setReceiverUser(user)}"
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
        return regex.test(item.firstName);
    }

    _getUsersList(){
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error));
    }


    _setReceiverUser(user){

        this.receiverId = user._id;
        const event = new CustomEvent('receiver', {
            detail: user,
            composed: true,
            bubbles: true,
        });
        this.dispatchEvent(event);
        console.log(this.receiverId)

    }




    connectedCallback() {
        super.connectedCallback();
        this._getUsersList()


    }

    constructor() {
        super();
        this.usersList = [];
        this.receiverId='';
    }
}
customElements.define(AppreceiverList.is, AppreceiverList);