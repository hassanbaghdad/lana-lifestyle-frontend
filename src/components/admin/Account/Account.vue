<template>
    <v-app>
        <v-dialog width="500" v-model="$store.state.account">
            <v-form lazy-validation ref="form" v-model="valid">
                <v-card>
                    <v-card-title class="secondary">
                        <v-icon color="white">mdi-lock</v-icon>
                        <span class="text-h5" style="color:white;">اعدادات الحساب</span>
                        <v-spacer></v-spacer>
                        <v-btn @click="$store.state.account=false" icon color="white"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>


                            <v-col cols="12">
                                <v-text-field :rules="req" v-model="account.new_password1" :type="show?'text':'password'" @click:append="show = !show" label="كلمة المرور الجديدة" :append-icon="show?'mdi-eye':'mdi-eye-off'"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field  :rules="req" v-model="account.new_password2" :type="show?'text':'password'"   @click:append="show = !show" label="تأكيد كلمة المرور الجديدة" :append-icon="show?'mdi-eye':'mdi-eye-off'"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-divider/>
                        <v-card-actions>
                            <v-btn @click="save" class="success" block :loading="loading">
                                <v-icon color="white">mdi-content-save</v-icon>
                                <span class="text-h5" style="color: white">حفظ</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </v-app>
</template>

<script>
    export default {
        name: "Account",
        data(){
            return{
                valid:true,
                loading:false,
                show:false,
                req:[v=>!!v ||'الحقل مطلوب'],
                account:{
                    fullname:this.$store.state.user.fullname,
                    password:'',
                    new_password1:'',
                    new_password2:'',
                }
            }
        },
        methods:{
            async save(){
                if(this.$refs.form.validate())
                {
                    if(this.account.new_password1 == this.account.new_password2)
                    {
                        this.loading = true;
                        await this.$axios.post('api/update-account',this.account).then(res=>{
                            this.$fire({
                                title: "نجح",
                                text: res.data.msg,
                                type: "success",
                                timer: 2000
                            });
                            this.$store.state.account = false;
                        }).catch(err=>{
                            console.log(err)
                        }).finally(fin=>{
                            this.loading = false;
                        })
                    }else{
                        this.$fire({
                            title: "عفوا",
                            text: "كلمات المرور غير متطابقتان",
                            type: "warning",
                            timer: 4000
                        });
                    }

                }
            }
        },



    }
</script>

<style scoped>

</style>