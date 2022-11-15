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
                    id="form"
            .editUser="${this.editUser}"></app-users-form>
            <app-users-list
                    
            .usersList="${this.usersList}"></app-users-list>
        `
    }

    static get properties() {
        return {
            editUser:{type: Object},
            usersList: {type: Array},
        }
    }
    constructor() {
        super();
        this.usersList = [];
        this.editUser ={};
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('save-user-data',async (event) => {

            await this._saveUserData(event.detail);




        });

        this.addEventListener('edit-user-data',async (event) => {

            await this._editUserData(event.detail);
        });
        this.addEventListener('delete-user-data',async (event) => {
            console.log(event.detail);
            await this._deleteUserData(event.detail);
        })
        this._getUsersList();


    }

    _editUserData(user) {

        this.shadowRoot.getElementById('form').setUserData(user);



    }
    _deleteUserData(user){
        const _id = user._id
        RestClient.call('/api/client/deleteClientData', {_id})
            .then(() =>   this._getUsersList())
            .catch((error) => console.log(error));


    }


    _saveUserData(user){
        RestClient.call('/api/client/registerUser',user)
            .then(()=>
                this._getUsersList()
            )
            .catch((error)=> console.log(error));


    }




    _getUsersList(){
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.usersList = result)
            .catch((error) => console.log(error));
    }



}
customElements.define(AppUsersModule.is, AppUsersModule);