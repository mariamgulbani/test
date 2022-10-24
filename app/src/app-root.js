import './components/app-input.js';

class AppRoot extends HTMLElement{
    static get is() {
        return 'app-root';
    }
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.innerHTML = `
            <style>
            
                :host {
        
                    border: 6px solid red;
        
                }
        
                input {
        
                    background: chartreuse;
        
                }
        
            </style>
            
            <app-input></app-input><br>
        `;
    }



}
customElements.define(AppRoot.is, AppRoot);