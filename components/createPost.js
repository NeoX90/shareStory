import { getItemsLocalStorage } from "../utils.js"

const style =`

    #create-post{
        width:60%;
        margin: auto;
        margin-top: 20px;
        text-align: right;
    }
    #create-post textarea{
        width:100%;
        border: 1px solid #dbdbdb;
        roder-radius: 10px;
        outline: none;
    }
    .btnPost{
        background-color: #1976D1;
        color:#fff;
        padding:10px 15px;
        border-radius: 5px;
        outline: none;
    }
`
class CreatePost extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({mode: 'open'})
    }
    connectedCallback() {
        this._shadowDom.innerHTML = `
        <style>${style}</style>
            <form id= 'create-post'>
                <textarea name='content' type='textarea' rows='6' class='content'></textarea>
                <button class='btnPost'>Post</button>
            </form>
        `
        // let btnPost = this._shadowDom.querySelector('.btnPost')
        // cach 1
        const postForm = this._shadowDom.getElementById('create-post')
        postForm.addEventListener('submit', (e) =>{
            e.preventDefault()
            const content = postForm.content.value;
            if(content.trim() === ''){
                alert('viet bai di dung de trong')
            }
            const user = getItemsLocalStorage('currentUser')
            const data = {
                createdBy: user.id,
                createdAt: new Date().toISOString(),
                content: content,
                comments: [],
                authorName: user.name,
                isShow: true
            }
             firebase.firestore().collection('posts').add(data)
             postForm.content.value = ''
             alert('port bai thanh cong')
        })
        // cach 2
        // btnPost.addEventListener('click' , async (e)=>{
        //     e.preventDefault()
            
        //     let dataPost = this._shadowDom.querySelector('.content').value
        //     const post = {
        //         createBy: JSON.parse(localStorage.getItem('currentUser')).id,
        //         createAt: new Date(),
        //         content: dataPost,
        //         authorName: JSON.parse(localStorage.getItem('currentUser')).name,
        //         isShow: true
        //     }
            // console.log(post.content)
            // firebase.firestore().collection('posts').add(data)
            // postForm.content.value = '' //cai nay de reload lai trang
            // alert('port bai thanh cong')
        // })
    }
}
window.customElements.define('create-post',CreatePost)