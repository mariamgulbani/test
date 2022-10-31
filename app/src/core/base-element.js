import {LitElement, html, css} from "lit-element";

class BaseElement extends LitElement{
    sendCustomEvent(name, detail = {}){

            this.dispatchEvent(new CustomEvent(name,{
                    detail,
                    bubbles: true,
                    composed: true,
                },

            ))
        }

}
export {BaseElement,html,css};