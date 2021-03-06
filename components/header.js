
const style =`
*{
    margin: 0;
    padding: 0;
}
.container{
    background-color: #1976D2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 10%;
}
.logo, .user-infor{
    display: flex;
    align-items: center;
    color: #fff;
}
.logo img{
    height: 50px;
    /* color: #fff; */
    
}
.btn{
    background-color: transparent;
    border: none;
    color: #fff;
    outline: none;
    cursor: pointer;
}
.avatar{
    cursor: pointer;
    padding-right: 10px;
}

`
import {redirect} from '../index.js'
class StoryHeader extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        
        this._shadowDom.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            ${style}
        </style>
        <div class="container">
            <div class="logo">
                <img src="./img/endpoint.png" alt="">
                <div class="branch">SHARE STORY</div>
            </div>
            <div class="user-infor">
                <div class="avatar"><i class="fa fa-user-circle-o" style="color: #fff;font-size:24px"></i></div>
                <button class="btnLogOut" id='btnLogOut'><i class="fa fa-sign-out" style="font-size:24px;"></i></button>
            </div>
        </div>
        `
        this._shadowDom.querySelector('.btnLogOut')
        .addEventListener('click', () =>{
            localStorage.removeItem('currentUser')
            redirect('login')
        })

    }

}
window.customElements.define('story-header',StoryHeader)