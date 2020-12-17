// import '../../utils.js'
import { getDataFromDocs,saveToLocalStorage } from '../utils.js'
const style =`
    <style>
        .login-container{
            display: flex;
            width: 100v;
            height :100vh;
            background: url('https://i.ytimg.com/vi/ZPEDIqYJyM4/maxresdefault.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            justify-content: flex-end;
        }
        #login-form{
            width: 30%;
            background: #fff;
            height: 100vh;
            padding: 0px 20px;
            
        }
        h1{
            text-align: center;
            color: #333;
        }
        button {
            background: #1565C0;
            color: #fff;
            padding: 10px 15px;
            border-radius: 5px;
        }
    </style>
`
import {redirect} from '../index.js'
class loginScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML =`
        ${style}
            <div class='login-container'>
                <form id="login-form">
                <h1>CI Project</h1>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <button>Login</button>
                <a id='login'> Don't have an account ? register </a>
                </form>
            </div>
        `
        const loginForm = this._shadowRoot.getElementById('login-form')
        
        loginForm.addEventListener('submit',async (e) => {
            e.preventDefault()
            let email = this._shadowRoot.getElementById('email').value
            let password = this._shadowRoot.getElementById('password').value
            let passwordValue = CryptoJS.MD5(password).toString()
            let isValid = true
            if(email.trim() === "") {
                isValid = false
                this.setError('email', 'please input email')
            }
            if(password.trim() === "") {
                isValid = false
                this.setError('password', 'please input first name')
            }
            if( !isValid) {
                return
            }
            // let  this._shadowRoot.getElementById('confirm-password').value
            const check = await this.checkEmailPassword(email,password)

        })
        this._shadowRoot.getElementById('login').addEventListener('click', () => {
            redirect('register')
            
        })
    }

    setError(id, message) {
        this._shadowRoot.getElementById(id).setAttribute('error',message)
    }
    async checkEmailPassword(email,password) {
        let res =await firebase.firestore().collection('users').where('email', "==",email).where('password', "==",CryptoJS.MD5(password).toString()).get()
        if(res.empty) {
            alert('dang nhap khong thanh cong , vui long kiem tra lai tai khoan hoac dang ki moi')
        }
        else {
            alert('dang nhap thanh cong')
            saveToLocalStorage('currentUser', getDataFromDocs(res)[0])
            redirect('story')
            // console.log(getDataFromDocs(res)[0])
            
        }
        // redirect
    } 
}
window.customElements.define('login-screen',loginScreen)