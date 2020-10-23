<template>
  <div class="inputBox">
      <input type="text" class="msg">
      <button class="btnSend">ENTER</button>
  </div>
</template>

<script>
export default {
  name:'InputComponent',
}
</script>

<style scoped>
.inputBox {
    height:50px;
    display: flex;
}
.msg {
    flex:1;
    padding:8px 12px;
    border:1px solid #ddd;
    outline:none;
    font-size: 16px;
}
.btnSend {
    width:109px;
    background-color: #3780af;
    border: 0;
    color: #fff;
    margin: 0 5px;
    transition: .4s;
    outline: none;
    cursor: pointer;
}

.btnSend:hover {
    background-color: #266e9c;
}
</style>