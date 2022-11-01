import {BaseElement,html} from "../../core/base-element.js";
import './app-users-form.js';
import './app-users-list.js';
import {RestClient} from "../../core/rest.js";

class AppUsersModule extends BaseElement{
    static get is() {
        return 'app-users-module';
    }

    render(){
        return html`
            <app-users-form
            .editUser="${this.editUser}"></app-users-form>
            <app-users-list
            .usersList="${this.usersList}"></app-users-list>
        `
    }

    static get properties() {
        return {
            editUser:{type: Object},
            usersList: {type: Array},
            // deleteUser: {type: Array}
        }
    }
    constructor() {
        super();
        this.usersList = [];
        this.editUser ={};
        // this.deleteUser =[];
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('save-user-data',async (event) => {
            // console.log(event.detail);
            await this._saveUserData(event.detail);
            //await this._loadUserList(event.detail);

        });
        this.addEventListener('edit-user-data',async (event) => {
            // console.log(event.detail);
            //console.log(this.editUser);
            //console.log(this.usersList)
            await this._editUserData(event.detail);
        });
        this.addEventListener('delete-user-data',async (event) => {
            console.log(event.detail);
            //console.log(this.editUser);
            //console.log(this.usersList)
            await this._deleteUserData(event.detail);
        })

    }

    _editUserData(user) {

        this.editUser=user;
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error));


    }
    _deleteUserData(test){
        RestClient.call('/api/client/deleteClientData',test)
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        console.log(test._id)

    }


    _saveUserData(user){
        RestClient.call('/api/client/registerUser',user)
            .then(()=> {
                this.usersList.push(user);
            })
            .catch((error)=> {console.log(error)});
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error));



    }



}
customElements.define(AppUsersModule.is, AppUsersModule);