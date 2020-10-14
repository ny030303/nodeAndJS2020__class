window.onload = function (){
  window.v = new Vue({
    el:"#chatApp",
    mounted(){ // 돔으로써 화면에 그려진 상태일때
      this.socket = new io();
      this.socket.on('user_list',  data => this.userList = data);
      this.socket.on('login_ok',  data => this.isLogin = true);
      this.socket.on('req_msg', data => this.chatList.push(data));
    },
    data: {
      nickName:'',
      isLogin:false,
      socket:null,
      userList:[],
      textMsg:'',
      chatList:[]
    },
    methods:{
      login(){
        if(this.nickName === "") return;
        this.socket.emit("login", this.nickName);
      },
      sendMsg() {
        // 여기서 서버로 데이터 전송하면 된다.
        if(this.textMsg === "") return; 
        this.socket.emit("chat_msg", this.textMsg);
      }
    }
  })
}