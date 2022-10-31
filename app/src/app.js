//console.log("123");

import {LitElement} from "lit-element";
import {RestClient} from "./core/rest.js";
import "./app-root.js";

// navigator.serviceWorker.register('./service-worker.js', {
//     scope: location.href.replace(location.pathname, '/'),
// });


const element = document.createElement('app-root');

document.body.appendChild(element);




// RestClient.call('/api/users/login',{
//     userName: 'test',
//     password: '1234',
// }, RestClient.methods.post);

// import './app-root.js';
// import {LitElement} from "lit-element";
//
// const element = document.createElement('app-root');
//
// document.body.appendChild(element);
//
// class BaseElement extends LitElement {
// }

