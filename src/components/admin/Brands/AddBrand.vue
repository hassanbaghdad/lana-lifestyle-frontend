<template>
<v-app>
    <v-dialog v-model="$store.state.brands.forms.add_brand" max-width="400">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card>
                <v-card-title class="secondary">
                    <span style="color: white">
                        <v-icon color="white">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-h6" style="color: white">
                            اضافة ماركة
                        </span>
                    </span>
                </v-card-title>
                <v-card-text  class="mt-4">
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-text-field :rules="req" label="اسم الماركة باللغة العربية" v-model="brand.brand_name_ar" append-icon="mdi-information"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :rules="req" label="اسم الماركة باللغة الانكليزية" v-model="brand.brand_name_en" append-icon="mdi-information"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :rules="req" label="موقع الماركة" v-model="brand.brand_website" append-icon="mdi-web"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-sheet  outlined>
                                <v-img max-height="150" contain :src="url==''?'https://pngimage.net/wp-content/uploads/2018/06/img-icon-png-3.png':url"></v-img>
                            </v-sheet>
                            <v-text-field readonly :rules="req" v-model="url"></v-text-field>
                        </v-col>

                        <input class="d-none" type="file" id="file" ref="file" v-on:change="onChangeFile()"/>
                        <v-col cols="12" class="text-center">
                            <v-btn block outlined   right @click="$refs.file.click()">
                                <v-icon>mdi-image</v-icon>
                                <span class="mr-2 text-h6">تغيير الصورة</span>
                            </v-btn>
                        </v-col>


                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn :loading="loading" class="success" dark block @click="add_brand">
                        <v-icon>mdi-content-save</v-icon>
                        <span class="mr-2 text-h6">حفظ ماركة</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</v-app>
</template>

<script>
    export default {
        name: "AddBrand",
        data(){
            return{
                valid:true,
                loading:false,
                brand:{
                    brand_name_ar:'',
                    brand_name_en:'',
                    brand_website:''
                },

                req:[v=>!!v || 'الحقل مطلوب'],
                url:''
            }
        },

        methods:{
            onChangeFile()
            {
                const file = this.$refs.file.files[0];
                this.url = URL.createObjectURL(file);

            },

            add_brand()
            {
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    const file = this.$refs.file.files[0];
                    var formdata = new FormData();

                    formdata.append('image',file);
                    formdata.append('brand_name_ar',this.brand.brand_name_ar);
                    formdata.append('brand_name_en',this.brand.brand_name_en);
                    formdata.append('brand_website',this.brand.brand_website);

                    this.$axios.post('api/add-brand',formdata)
                        .then(res=>{
                            this.$fire({
                                title: "نجح",
                                text: res.data.msg,
                                type: "success",
                                timer: 2000
                            });
                            this.loading = false;
                            this.brand = [];
                            this.url = '';
                            this.$store.state.brands.forms.add_brand = false;
                            this.$store.commit("GET_BRANDS");
                        }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>