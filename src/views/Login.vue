<template>
<div class="login">
  <h1>Login</h1>
  <Input v-model="username" placeholder="请输入用户名"  style="width: 300px;height:30px"/>
  <br>
  <br>
  <Button type="primary" @click="login">登录</Button>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      username:""
    }
  },
  methods: {
    login(){
     this.$store.dispatch("toLogin",this.username).then(data=>{
      //跳转到首页
      this.$router.push("/");
     },err=>{
       // 弹出消息框
       this.$Message.error(err)
     })
    }
  },
}
</script>

<style>

</style>