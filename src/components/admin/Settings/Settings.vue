<template>
    <v-app>
        <v-container>
           <div class="d-flex justify-center mt-16" >
               <v-card   max-width="1200" class="d-flex justify-center" elevation="8">

                   <v-divider></v-divider>
                   <v-card-text>
                       <v-row justify="center">
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.website_title_ar" label="اسم الموقع بالعربي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.website_title_en" label="اسم الموقع باللغة الانكليزية" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.website_phone" label="رقم الهاتف" append-icon="mdi-phone"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.website_email" label="البريد الالكتروني " append-icon="mdi-email"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.address" label="العنوان" append-icon="mdi-home"></v-text-field>
                           </v-col>


                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.web1" label="موقع في الشريط السفلي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.web2" label="موقع في الشريط السفلي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.web3" label="موقع في الشريط السفلي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.web4" label="موقع في الشريط السفلي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="6">
                               <v-text-field v-model="settings.web5" label="موقع في الشريط السفلي" append-icon="mdi-web"></v-text-field>
                           </v-col>
                           <v-col cols="12" >
                               <v-textarea v-model="settings.about_ar" label="من نحن عربي" append-icon="mdi-information"></v-textarea>
                           </v-col>
                           <v-col cols="12">
                               <v-textarea v-model="settings.about_en" label="من نحن باللغة الانكليزية" append-icon="mdi-information"></v-textarea>
                           </v-col>

                           <v-col cols="12" class="text-right">
                               <v-btn :loading="loading" @click="save_settings" class="success">
                                   <v-icon>mdi-content-save</v-icon>
                                   <span class="mr-2 text-h6">حفظ</span>
                               </v-btn>
                           </v-col>


                       </v-row>
                   </v-card-text>
               </v-card>
           </div>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "Settings",
        data(){
            return{
                valid:true,
                req:[v=>!!v || 'هذا الحقل مطلوب'],
                loading:false,
                settings:{
                    website_name_ar:'',
                    website_name_en:'',
                    website_phone:'',
                    website_email:'',
                    address:'',
                    about_ar:'',
                    about_en:'',
                    web1:'',
                    web2:'',
                    web3:'',
                    web4:'',
                    web5:'',

                }
            }
        },
        methods:{
            save_settings()
            {
                this.loading = true;
                this.$axios.post('api/save-settings',this.settings)
                .then(res=>{
                    this.loading = true;
                    this.$fire({
                        title: "نجح",
                        text: res.data.msg,
                        type: "success",
                        timer: 2000
                    });
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.loading = false;
                })
            }
        },
        created()
        {
            this.$store.commit('GET_SETTINGS');
        },
        computed:{
            get_settings()
            {
                return this.$store.state.settings.settings;
            }
        },
        watch:{
            get_settings(new_settings)
            {
                this.settings = new_settings;
            }
        },

    }
</script>

<style scoped>

</style>