<template>
   <v-app>
      <v-form lazy-validation v-model="valid" ref="form">
          <v-dialog v-model="$store.state.socials.forms.edit_social" width="500">
              <v-card class="pa-4">
                  <v-card-title>
                      <v-icon>mdi-pen</v-icon>
                      <span>تعديل موقع تواصل</span>

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
                          <v-btn @click="edit_social" :loading="loading" right class="blue" style="color: white">
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
                    id:'',
                    title:'',
                    url:'',
                    icon:'',

                },
                valid:true,
                req:[v=>!!v || 'هذا الحقل مطلوب'],

            }
        },
        methods:{
            edit_social(){

                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    this.$axios.post("api/edit-social",this.social).then(res=>{
                        this.$store.commit('GET_SOCIALS');
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.socials.forms.edit_social = false;
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            }
        },
        computed:{
            get_social:function () {
                return this.$store.state.socials.target_social;
            }
        },
        watch:{
            get_social:function (new_social) {
                this.social = new_social;
            }
        },

    }
</script>

<style scoped>

</style>