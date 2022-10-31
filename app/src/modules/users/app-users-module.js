import {BaseElement,html} from "../../core/base-element.js";
import './app-users-form.js';
import './app-users-list.js';

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
        }
    }
    constructor() {
        super();
        this.usersList =[];
        this.editUser ={};
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('save-user-data',async (event) => {
            // console.log(event.detail);
            await this._saveUserData(event.detail);
            await this._loadUserList(event.detail);

        });
        this.addEventListener('edit-user-data',async (event) => {
            console.log(event.detail);
            //console.log(this.editUser);
            //console.log(this.usersList)
            await this._editUserData(event.detail);
        })
    }

    _editUserData(user) {
         //  this.firstName=data.firstName;
         // this.lastName=data.lastName;
         // this.email=data.email;
         //  this.phoneNumber=data.phoneNumber;
        // this.editUser.push(user);
        // this.editUser =[...this.editUser];
        this.editUser=user;

    }


    _saveUserData(user){
        //console.log(user);
        this.usersList.push(user);
        this.usersList =[...this.usersList];

    }
    _loadUserList(){

    }


}
customElements.define(AppUsersModule.is, AppUsersModule);