<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', margin: '-61px 0px 0px'}" style="z-index:10">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav" v-if="loginbean==null">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <a @click="registerOrlogin('loginSwitch')">请登录</a>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            <a @click="registerOrlogin('regSwitch')">未入驻?注册</a> 
                        </MenuItem>
                    </div>
                    <!--已经登录了所显示的内容-->
                    <div class="layout-nav" v-if="loginbean!=null">
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            你好，{{loginbean.nickName}}
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="person"></Icon>
                            <a class="aStyle">个人资料</a>
                        </MenuItem>
                        <MenuItem name="3">
                            <Badge dot v-if="loginbean.msgNum > 0">
                                <Icon type="ios-bell-outline" size="22"></Icon>
                            </Badge>
                            <Badge v-if="loginbean.msgNum == 0">
                                <Icon type="ios-bell-outline"></Icon>
                            </Badge>
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            <a  @click="logout()"> 注销</a>
                        </MenuItem>
                    </div>                    
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', minHeight: '1080px',background:'#FFF'}">
               <div class="contentDiv">
                    <components :is="contentBoxModule"></components>
               </div>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
<!--         <Modal
            v-model=""
            title="注册"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <Button type="success" long @click='ok'>SUBMIT</Button>
            <br><br>
            <Button type="error" long>DELETE</Button>
        </Modal> -->
        <Modal v-model="regOrloginBox" width="500">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span v-if="loginSwitch==false">请注册</span>
                <span v-if="loginSwitch==true">请登录</span>
            </p>
            <div style="text-align:center">
                <Form :model="formItem" :label-width="80">
                    <Input v-model="formItem.userNameValue" placeholder="请输入用户名" style="width: 300px"></Input><br><br>
                    <Input v-model="formItem.passWordValue" placeholder="请输入密码" style="width: 300px"></Input><br><br>
                    <Input v-model="formItem.nickNameValue" v-if ="loginSwitch==false" placeholder="请输入昵称" style="width: 300px"></Input><br><br>
                </Form>
            </div>
            <div slot="footer">
                <Button type="success" v-if="loginSwitch==true" long @click='login'>LOGIN</Button>
                <Button type="success" v-if="regSwitch==true" long @click='register'>REGISTE</Button>
                <br><br>
                <Button type="error" long @click='regOrloginBox = false'> CANCEL</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {login, register, logout, autoGetLogin} from '../vuex/actions/UserAction';
import {getRegister, getLogin, changeLoginbean} from '../vuex/getters/UserGetter';
import contentBoxModule from './contentBox.vue'; //import导入
export default {
  name: 'mainContene',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      regSwitch: false,
      loginSwitch:false,
      regOrloginBox:false,
      formItem:{
        userNameValue: '',
        passWordValue: '',
        nickNameValue: ''
      },
      loginbean:null,
      contentBoxModule:contentBoxModule
    }
  },
  methods:{
      registerOrlogin:function(e){
        if(e == 'loginSwitch'){
            this.loginSwitch = true;
            this.regSwitch = false;
        }else{
            this.regSwitch = true;
            this.loginSwitch = false;
        }
        this.regOrloginBox = true;
        
      },
      login:function(e){
          let loginObj = {
          userNameValue: this.formItem.userNameValue,
          passWordValue: this.formItem.passWordValue
        };
        login(loginObj,this)
        // this.loginbean = getRegister(this);
        // console.log(':'+JSON.stringify(this.loginbean))
      },
      register:function(e){
        let registerObj = {
          userNameValue: this.formItem.userNameValue,
          passWordValue: this.formItem.passWordValue,
          nickNameValue: this.formItem.nickNameValue
        };
        console.log(JSON.stringify(registerObj));
        register(registerObj,this);
        console.log(':'+JSON.stringify(this.loginbean))
        // this.userStoreFrontend = state.loginbean;
      },
        logout:function(e){
            logout(this)
        },
        testLogin:function(e){
            this.loginbean = changeLoginbean(this);
        },
        autoGetLoginbean:function(e){
            autoGetLogin(this);
        }
        // ok () {
        //     this.$Message.info('Clicked ok');
        // },
        // cancel () {
        //   this.$Message.error('Clicked cancel');
        // }
    },
    components: { 
        'contentBoxModule':contentBoxModule
    },
    created:function(){
        // autoGetLoginbean:function(e){
            if(!this.loginbean){
                // alert('getLoginbean');
                this.loginbean = changeLoginbean(this);
                this.loginbean ? this.loginbean = (changeLoginbean(this)): this.loginbean = this.autoGetLoginbean(this);
            }
        // }
    },
    mounted: function () {
        
    },
    // mounted:{
    //     getUserData:function(){
    //         getRegister
    //     }
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .contentDiv{
        background-color:#e9eaec;
        width: 70%;
        margin: 3em auto;
        z-index: -1; 
    }
    .msgDiv{
        z-index: 100;
        position: absolute;
        background-color:#ed3f14;
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }
    .aStyle{
        outline: 0;
        cursor: pointer;
        transition: color .2s ease;
    }

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 50px;
        height: 50px;
        background: #5b6270;
        border-radius: 50%;
        float: left;
        position: relative;
        top: 8px;
        left: 20px;
    }
    .layout-nav{
        width: auto;
        margin: 0 auto;
        margin-left: 75%;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
