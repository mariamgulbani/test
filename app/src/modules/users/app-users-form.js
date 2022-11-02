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
          .valid,
          input:not([invalid]) {
            border: 2px solid green;
          }
          .invalid,
          input[invalid] {
            border: 2px solid red;
            background-color: red;
          }
        `
    }

    render(){
        return html`
            <div>
            <div class="user-form" >
                <span> Firstname </span>
                <input
                        id="firstName"
                        .value="${this.firstName}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Lastname </span>
                <input
                        id="lastName"
                        .value="${this.lastName}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Email </span>
                <input
                        id="email"
                        .value="${this.email}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Phone </span>
                <input
                        id="phoneNumber"
                        .value="${this.phoneNumber}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-save" >
                <button 
                        ?disabled="${this.disabled}"
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
            },

            _id: {type:String}



        }
    }

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.editUser= {};
        this._id ='';

    }





    _saveUserData(){
        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            _id: this._id,
        };
        this.sendCustomEvent('save-user-data',user);

    }

    static get validation() {
        return {
            firstName: /^[a-zA-Z]{2,}$/,
            lastName: /^[a-zA-Z]{2,}$/,
            email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        }
    }

    get disabled() {
        let formInValid = Object.keys(AppUsersForm.validation)
            .some(fieldName => {
                const valid = AppUsersForm.validation[fieldName].test(this[fieldName]);
                return !valid;

            })
        return formInValid;
    }



    _setInputValue(event) {
        const targetElement = event.currentTarget;
        const fieldName = targetElement.id;
        this[fieldName] = event.target.value;
        if (AppUsersForm.validation[fieldName]) {
            const valid = AppUsersForm.validation[fieldName].test(this[fieldName]);
            if (valid) {
                targetElement.removeAttribute('invalid');
            } else {
                targetElement.setAttribute('invalid', '');
            }
        }

    }
    setUserData(user){
        for (const key in user){
            this[key] = user[key]
        }
    }







    connectedCallback() {
        super.connectedCallback();
    }


}
customElements.define(AppUsersForm.is, AppUsersForm);
