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


class AppInput extends HTMLElement{
    static get is() {
        return 'app-input';
    }

    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.innerHTML = '<input>';
    }
    connectedCallback(){
        console.log('Connected');

    }

    disconnectedCallback(){
        console.log('Disconnected');


    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log('attribute changed.');
    }

    static  get observedAttributes(){
        return ['name','value'];
    }

}
customElements.define(AppInput.is,AppInput);