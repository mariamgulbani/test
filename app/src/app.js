//console.log("123");
import {LitElement} from "lit-element";
import {RestClient} from "./core/rest.js";
import "./app-root.js";



const element = document.createElement('app-root');

document.body.appendChild(element);

class BaseElement extends LitElement{
/*TODO: some text here */
}


RestClient.call('/api/users/login',{
    userName: 'test',
    password: '1234',
}, RestClient.methods.post);

// import './app-root.js';
// import {LitElement} from "lit-element";
//
// const element = document.createElement('app-root');
//
// document.body.appendChild(element);
//
// class BaseElement extends LitElement {
// }

