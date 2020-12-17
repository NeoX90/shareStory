import '../../utils.js'

const style =`
    <style>
        .register-container{
            display: flex;
            width: 100v;
            height :100vh;
            background: url('https://i.ytimg.com/vi/ZPEDIqYJyM4/maxresdefault.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            justify-content: flex-end;
        }
        #register-form{
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
class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML =`
        ${style}
            <div class='register-container'>
                <form id="register-form">
                <h1>CI Project</h1>
                <input-wrapper id="first-name" type="text" placeholder="First Name"></input-wrapper>
                <input-wrapper id="last-name" type="text" placeholder="Last Name"></input-wrapper>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <input-wrapper id="confirm-password" type="password" placeholder="Confirm password"></input-wrapper>
                <button>Register</button>
                <a id='redirect'>Already have an account ? Log in </a>
                </form>
            </div>
        `
        const registerForm = this._shadowRoot.getElementById('register-form')
        
        registerForm.addEventListener('submit',async (e) => {
            e.preventDefault()

            let firstName = this._shadowRoot.getElementById('first-name').value
            let lastName = this._shadowRoot.getElementById('last-name').value
            let email = this._shadowRoot.getElementById('email').value
            let password = this._shadowRoot.getElementById('password').value
            let confirmPassword = this._shadowRoot.getElementById('confirm-password').value
            let passwordValue = CryptoJS.MD5(password)
            let isValid = true
            if(firstName.trim() === "") {
                isValid = false
                this.setError('first-name', 'please input first name')
            }
            if(lastName.trim() === "") {
                isValid = false
                this.setError('last-name', 'please input last name')
            }
            if(email.trim() === "") {
                isValid = false
                this.setError('email', 'please input email')
            }
            if(password.trim() === "") {
                isValid = false
                this.setError('password', 'please input first name')
            }
            if(password !== confirmPassword) {
                isValid = false
                this.setError('confirm-password', "Password dont match")
            }
            if( !isValid) {
                return
            }

            function addDocument(){
                const data ={
                    name : `${firstName+" "+ lastName}`,
                    email : `${email}`,
                    password : `${passwordValue}`
                }
                firebase.firestore().collection('users').add(data)
            }
            
            // let  this._shadowRoot.getElementById('confirm-password').value

            // neu email da ton tai thi tra ra true
            const check = await this.checkEmailExist(email)
            if(check) {
                alert('email da dc dang ki')
            }
            else {
                addDocument()
                alert('dang ki thanh cong')
                redirect('login')
            } 
        })
        this._shadowRoot.getElementById('redirect').addEventListener('click', () => {
            redirect('login')
        })
    }

    setError(id, message) {
        this._shadowRoot.getElementById(id).setAttribute('error',message)
    }
    async checkEmailExist(email) {
        const res =await firebase.firestore().collection('users').where('email', "==",email).get()
        //.empty la phan ben duoi docs trong console web 
        return !res.empty
    } 
}
window.customElements.define('register-screen',RegisterScreen)