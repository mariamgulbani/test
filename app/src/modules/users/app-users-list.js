import {BaseElement, css, html} from "../../core/base-element.js";
import {RestClient} from "../../core/rest.js";


class AppUsersList extends BaseElement{
    static get is() {
        return 'app-users-list';
    }
    static get styles(){
        return css`
          .user-list{
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .list-item{
            padding: 20px;
          }
        `
    }

    render(){
        return html`
            ${this.usersList.map((user) => html`
             <div class="user-list">   
            <div class="list-item" >
                ${user.firstName}
            </div>
            <div class="list-item" >
                ${user.lastName}
            </div>
            <div class="list-item" >
                ${user.email} 
            </div>
            <div class="list-item" >
                ${user.phoneNumber} 
            </div>
            <button @click="${()=> this._editUser(user)}">Edit</button>
             </div>
                
            `)}

        `
    }
    static get properties() {
        return{
            usersList: {type:Array}
        }
    }



    _editUser(user){
        this.sendCustomEvent('edit-user-data',user)
    }

    getUsersList() {
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error))
    }

    constructor() {
        super();
        this.usersList =[];
    }



}
customElements.define(AppUsersList.is, AppUsersList);

