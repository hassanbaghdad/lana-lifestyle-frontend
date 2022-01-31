<template>

<v-app>
    <v-form lazy-validation v-model="valid" ref="form">
        <v-container>
            <div style="width: 100%;padding: 10px;margin-bottom: 300px">
                <div style="width: 350px;margin: auto;">
                    <v-row align="center" justify="center">
                        <v-col cols="12">
                            <v-sheet max-width="350" elevation="0">
                                <!--                                    <div class="btn-primary pa-0 text-left" style="padding: 10px">-->
                                <!--                                        <v-icon>mdi-lock</v-icon>-->
                                <!--                                        <span style="color: white">Login</span>-->
                                <!--                                    </div>-->
                                <v-row align="center" justify="center" class="p-4">
                                    <v-col cols="12">
                                        <v-img :src="require('@/assets/logo.png')"></v-img>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field :rules="req" v-model="user.username" label="Username" append-icon="mdi-account"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="user.password" :rules="req" :type="show ? 'text' : 'password'" label="Password" @click:append="show=!show" :append-icon="show?'mdi-eye-off':'mdi-eye'"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-chip v-if="error" class="pa-4"  style="background-color: #ef4747;color: white" v-model="error" >{{msg}}</v-chip>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn color="primary" :loading="loading" @click="login"  large>Login</v-btn>
                                    </v-col>

                                </v-row>

                            </v-sheet>
                        </v-col>

                    </v-row>
                </div>

            </div>
            <v-divider></v-divider>
        </v-container>
    </v-form>
</v-app>

</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                user:{
                    username:'',
                    password:''
                },
                req:[v=>!!v || 'Required'],
                msg:'Username or password incorrect !',
                error:false,
                show:false,
                valid:true,
                loading:false
            }
        },
        methods:{
            login(){
                if(this.$refs.form.validate())
                {
                    this.error = false;
                    this.loading = true;
                    this.$axios.post('/api/login',this.user)
                    .then(res=>{
                        this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ res.data.token;
                        localStorage.setItem('token',res.data.token);
                        //this.$router.push("/dashboard");
                        this.$store.state.dashboard = true;
                        this.$store.state.user = res.data;
                        window.location.href="/dashboard";
                    }).catch(err=>{
                        this.error = true;
                        console.log(err);

                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>