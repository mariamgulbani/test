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
                        .value="${this._firstName}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Lastname </span>
                <input
                        id="lastName"
                        .value="${this._lastName}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Email </span>
                <input
                        id="email"
                        .value="${this._email}"
                        @input="${this._setInputValue}">
            </div>
            <div class="user-form" >
                <span> Phone </span>
                <input
                        id="phoneNumber"
                        .value="${this._phoneNumber}"
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
        // RestClient.call('/api/client/registerUser',user)
        //     .then((result)=> console.log(result))
        //     .catch((error)=> console.log(error));
        // RestClient.call('/api/client/getClientInfo')
        //     .then((result) => this.usersList = result)
        //     .catch((error) => console.log(error))



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


    // _saveUserData(user) {
    //     this.sendCustomEvent('save-user-data',user);
    //     RestClient.call('/api/client/registerUser', user)
    //         .then(() => {
    //             this.usersList.push(user);
    //             this.usersList = [...this.usersList];
    //             console.log(this.usersList);
    //             this.editUser = {
    //                 firstName: '',
    //                 lastName: '',
    //                 email: '',
    //
    //             };
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }


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
    connectedCallback() {
        super.connectedCallback();
    }


}
customElements.define(AppUsersForm.is, AppUsersForm);
