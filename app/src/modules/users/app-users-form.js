import {BaseElement, css, html} from "../../core/base-element.js";
import {RestClient} from "../../core/rest.js";



class AppUsersForm extends BaseElement{
    static get is() {
        return 'app-users-form';
    }

    static get styles(){
        return css`
          .user-form{
            padding-left: 20px;
            padding-top: 20px;
            display: inline-grid;
            justify-items: center;
          }
          .user-save{
            padding-top: 20px;
          }
        `
    }

    render(){
        return html`
            <div>
            <div class="user-form" >
                <span> Firstname </span>
                <input
                        .value="${this._firstName}"
                        @input="${(event) => this.firstName = event.target.value}">
            </div>
            <div class="user-form" >
                <span> Lastname </span>
                <input
                        .value="${this._lastName}"
                        @input="${(event) => this.lastName = event.target.value}">
            </div>
            <div class="user-form" >
                <span> Email </span>
                <input
                        .value="${this._email}"
                        @input="${(event) => this.email = event.target.value}">
            </div>
            <div class="user-form" >
                <span> Phone </span>
                <input
                        .value="${this._phoneNumber}"
                        @input="${(event) => this.phoneNumber = event.target.value}">
            </div>
            <div class="user-save" >
                <button
                @click="${this._saveUserData}">Save</button>
            </div>
            </div>

        `
    }





    static get properties () {
        return {
            firstName : {
                type: String,
                reflect: true,
                attribute: 'first-name',
            },
            lastName : {
                type: String,
                reflect: true,
                attribute: 'last-name',
            },
            email : {
                type: String,
                reflect: true,
                attribute: 'email',
            },
            phoneNumber: {
                type: String,
                reflect: true,
                attribute: 'phone-number',
            },
            editUser:{
                type: Object,
            }

        }
    }

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.editUser= {};
    }


    // connectedCallback() {
    //     super.connectedCallback();
    //     this.firstName=this.editUser.
    // }


    _saveUserData(){
        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
        };
        this.sendCustomEvent('save-user-data',user);
        RestClient.call('/api/client/registerUser',user)
            .then((result)=> console.log(result))
            .catch((error)=> console.log(error))

    }

    get _firstName(){
        return this.editUser.firstName || this.firstName
    }

    get _lastName(){
        return this.editUser.lastName || this.lastName
    }

    get _email(){
        return this.editUser.email || this.email
    }

    get _phoneNumber(){
        return this.editUser.phoneNumber || this.phoneNumber
    }




}
customElements.define(AppUsersForm.is, AppUsersForm);
