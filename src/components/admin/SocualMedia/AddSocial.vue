<template>
   <v-app>
      <v-form lazy-validation v-model="valid" ref="form">
          <v-dialog v-model="$store.state.socials.forms.add_social" width="500">
              <v-card class="pa-4">
                  <v-card-title>
                      <v-icon>mdi-plus</v-icon>
                      <span>اضافة موقع تواصل</span>

                  </v-card-title>
                  <v-divider/>
                  <v-row justify="center">
                      <v-col cols="12">
                          <v-text-field :rules="req" v-model="social.title" outlined label="العنوان"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                          <v-text-field :rules="req" v-model="social.url" outlined label="الرابط"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                          <v-text-field :rules="req" outlined label="الايقونة" v-model="social.icon" hint="example: mdi-facebook , mdi-whatsapp"></v-text-field>
                      </v-col>
                      <v-col cols="12" class="text-right">
                          <v-btn @click="save_social" :loading="loading" right class="blue" style="color: white">
                              <v-icon>mdi-content-save</v-icon>
                              <span class="text-h5 mr-2" >حفظ</span>
                          </v-btn>


                      </v-col>

                  </v-row>
              </v-card>
          </v-dialog>
      </v-form>
   </v-app>
</template>

<script>
    export default {
        name: "AddSocial",
        data(){
            return{
                loading:false,
                social:{
                    title:'',
                    url:'',
                    icon:'',

                },
                valid:true,
                req:[v=>!!v || 'هذا الحقل مطلوب'],
                icons:[
                    {value:'mdi-facebook'},
                    {value:'mdi-send'},
                    {value:'mdi-whatsapp'},
                    {value:'mdi-email'},
                ]
            }
        },
        methods:{
            save_social(){

                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    this.$axios.post("api/add-social",this.social).then(res=>{
                        this.$store.commit('GET_SOCIALS');
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.socials.forms.add_social = false;
                    }).catch(err=>{
                        console.log(err)
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