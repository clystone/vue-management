<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
        <!--<button @click="test">test</button>-->
    </div>
</template>

<script>
    import {url} from '../../config/url';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(11)
                        // localStorage.setItem('ms_username',self.ruleForm.username);
                        // self.$router.push('/readme');
                        self.$axios.post(url+'/api/manager/login',{phone: this.ruleForm.username,pw: this.ruleForm.password})
                            .then(res=>{
                                console.log(res.data);
                                if(res.data.info == 1){
                                    // self.$message({
                                    //     message: '登录中',
                                    //     duration: 1500,
                                    //     type: 'success'
                                    // })
                                    localStorage.setItem('token',res.data.parms.token);
                                    localStorage.setItem('ms_username',self.ruleForm.username);
                                    self.$router.push('/readme');
                                }else{
                                    self.$message({
                                            message: res.data.msg,
                                            duration: 1500,
                                            type: 'error'
                                        })
                                }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // test(){
            //     console.log(process.env.API_ROOT)
            // }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
