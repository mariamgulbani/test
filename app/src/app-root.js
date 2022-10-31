import {BaseElement,html,css} from "./core/base-element.js";
import './modules/users/app-users-module.js';
import './modules/chat/app-chat-module.js';

const tabs = {
    users: 'users',
    chat: 'chat'
}

class AppRoot extends BaseElement{
    static get is() {
        return 'app-root';
    }
    static get styles(){
        return css`
          :host {
            display: flex;
            flex-direction: column;
          }
        `
    }

    render(){
        return html`
            <div>
                <button
                        @click="${() => this.tab = tabs.users}">Users
                </button>
                <button
                        @click="${() => this.tab = tabs.chat}">Chat
                </button>
            </div>
            <div>
                ${this.tab === 'users' ? html `<app-users-module></app-users-module>` : ''}
                ${this.tab === 'chat' ? html `<app-chat-module></app-chat-module>` : ''}
            </div>
       
        `
    }

    static get properties (){
        return {
            tab : {type: String}
        }
    }

    constructor() {
        super();
        this.tab = tabs.users;
    }



}
customElements.define(AppRoot.is, AppRoot);