<template>
   <v-app>
      <v-form lazy-validation v-model="valid" ref="form">
          <v-dialog v-model="$store.state.socials.forms.edit_social" width="500">
              <v-card>
                  <v-card-title class="secondary">
                      <v-icon color="white">mdi-pen</v-icon>
                      <span style="color: white">تعديل موقع تواصل</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="$store.state.socials.forms.edit_social=false" icon><v-icon color="white">mdi-close</v-icon></v-btn>

                  </v-card-title>
                  <v-divider/>
                <v-card-text  class="pa-4">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-text-field :rules="req" v-model="social.title" outlined label="العنوان"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field :rules="req" v-model="social.url" outlined label="الرابط"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <span class="text-h5 text-right">الايقونة</span>
                      <v-divider/>
                    </v-col>
                    <v-col cols="12"  md="3">
                      <div class="text-center">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                              <v-icon color="white">{{social.icon}}</v-icon>
                              <span class="text-center text-h5 mr-4">الايقونة</span>

                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                                v-for="(item, index) in icons"
                                :key="index"
                                @click="set_icon(item.value)"
                            >
                              <v-list-item-title>{{ item.label }}</v-list-item-title>
                              <v-list-item-icon><v-icon>{{item.value}}</v-icon></v-list-item-icon>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="text-center">
                        <span class="text-h5">اللون</span>
                      </div>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="text-center">
                        <v-menu offset-y class="mr-2 ml-2">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                :color="social.color"
                                @click="set_color(item.value)"
                            >
                              <span class="text-center text-h5 mr-4"></span>

                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                                v-for="(item, index) in colors"
                                :key="index"
                                @click="set_color(item.value)"
                                :color="item.value"
                            >
                              <v-list-item-title>{{ item.label }}</v-list-item-title>
                              <v-list-item-icon><v-icon :color="item.value">{{social.icon}}</v-icon></v-list-item-icon>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="text-center">
                        <v-icon large :color="social.color">{{social.icon}}</v-icon>
                      </div>
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <v-divider/>
                      <v-btn width="80" @click="edit_social" :loading="loading" right class="blue" style="color: white">
                        <v-icon>mdi-content-save</v-icon>
                        <span class="text-h5 mr-2" >حفظ</span>
                      </v-btn>


                    </v-col>

                  </v-row>
                </v-card-text>

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
                    color:''

                },
                valid:true,
                req:[v=>!!v || 'هذا الحقل مطلوب'],
                icons:[
                    {label:'facebook',value:'mdi-facebook'},
                    {label:'telegram',value:'mdi-send'},
                    {label:'whatsapp',value:'mdi-whatsapp'},
                    {label:'youtube',value:'mdi-youtube'},
                    {label:'linkedin',value:'mdi-linkedin'},
                    {label:'instagram',value:'mdi-instagram'},
                    {label:'snapchat',value:'mdi-snapchat'},
                    {label:'email',value:'mdi-email'},
                ],
                colors:[
                    {label:'blue',value:'blue'},
                    {label:'green',value:'green'},
                    {label:'indigo',value:'indigo'},
                    {label:'white',value:'white'},
                    {label:'black',value:'black'},
                    {label:'info',value:'info'},
                    {label:'pink',value:'pink'},
                    {label:'orange',value:'orange'},
                    {label:'red',value:'red'},
                ],

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
            },
            set_icon(icon)
            {
                this.social.icon = icon;
            },
            set_color(color)
            {
                this.social.color = color;
            },
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