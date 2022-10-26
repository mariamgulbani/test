import {LitElement, html, css} from "lit-element";

// const template = `
// <template id ="input">
//
// <style>
//     :host{
//         border: 7px solid red;
//     }
//
//     input {
//         background: chartreuse;
//     }
// </style>
//
// <input>
// </template>
// `;


class AppInput extends LitElement{
    static get is() {
        return 'app-input';
    }
    static get properties() {
        return {
            name:{
                type:String,
                reflect: true,
                hasChanged(newValue,oldValue){
                    if (newValue === oldValue){
                        return false
                    }
                    else return true;
                }
            }
        }

    }

    constructor() {
        super();


    }
    connectedCallback(){
        super.connectedCallback();
        console.log('Connected');

    }

    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected');


    }
    render(){
        return html`<input type="text">`
    }
}
customElements.define(AppInput.is,AppInput);



class UserInfo extends LitElement{
    static get is() {
        return 'user-input';
    }
    static get properties() {
        return {
            name:{
                type:String,
                reflect: true,
                hasChanged(newValue,oldValue){
                    if (newValue === oldValue){
                        return false
                    }
                    else return true;
                }
            }
        }

    }

    constructor() {
        super();


    }
    connectedCallback(){
        super.connectedCallback();
        console.log('Connected');

    }

    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected');


    }
    render(){
        return html`<input type="text">`
    }
}
customElements.define(UserInfo.is,UserInfo);
