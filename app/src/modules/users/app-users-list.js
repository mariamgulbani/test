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
    static get properties() {
        return{
            usersList: {type:Array},
            searchTerm: {type:String}
        }
    }

    render(){
        return html`
            <div class="title"> Users List</div>
            <input class="filter"
                   placeholder="Filter"
                   @input="${(event)=> this.searchTerm = event.target.value}">
            ${this.usersList.filter(((item) => this.filter(item))).map((user) => html`
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
                    <button @click="${()=> this._deleteUserData(user)}">Delete</button>
                </div>`)}
        `;
    }
    // render (){
    //     return html`
    //     <div class="title"> Users List</div>
    //     <input class="filter"
    //     placeholder="Filter"
    //     @input="${(event)=> this.searchTerm = event.target.value}">
    //     ${this.users.filter(((item) => this.filter(item))).map((user) => html`
    //     <div class="user-list">
    //         <div class="list-item" >
    //             ${user.firstName}
    //         </div>
    //         <div class="list-item" >
    //             ${user.lastName}
    //         </div>
    //         <div class="list-item" >
    //             ${user.email}
    //         </div>
    //         <div class="list-item" >
    //             ${user.phoneNumber}
    //         </div>
    //         <button @click="${()=> this._editUser(user)}">Edit</button>
    //              <button >Delete</button>
    //          </div>`)}
    //     `;
    // }
    filter(item){
        if(!this.searchTerm){
            return true;
        }
        const regex = new RegExp(this.searchTerm,'i');
        console.log(regex, item.firstName)
        return regex.test(item.firstName) || regex.test(item.lastName) || regex.test(item.email) || regex.test(item.phoneNumber);
    }




    _editUser(user){
        this.sendCustomEvent('edit-user-data',user)
    }

    _deleteUserData(user){
        this.sendCustomEvent('delete-user-data',user)

    }

    getUsersList() {
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error))
    }

    constructor() {
        super();
        // this.usersList = [];
        this.usersList=[];
    }

    connectedCallback() {
        super.connectedCallback();
        this.getUsersList()
    }


}
customElements.define(AppUsersList.is, AppUsersList);

