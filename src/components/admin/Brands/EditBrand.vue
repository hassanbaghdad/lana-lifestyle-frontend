<template>
<v-app>
    <v-dialog v-model="$store.state.brands.forms.edit_brand" max-width="400">
        <v-form lazy-validation v-model="valid" ref="form">
            <v-card>
                <v-card-title class="secondary">
                    <span style="color: white">
                        <v-icon color="white">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-h6" style="color: white">
                            تعديل صنف
                        </span>
                    </span>
                </v-card-title>
                <v-card-text class="mt-4">
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-text-field :rules="req" label="اسم الصنف باللغة العربية" v-model="brand.brand_name_ar" append-icon="mdi-information"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :rules="req" label="اسم الصنف باللغة الانكليزية" v-model="brand.brand_name_en" append-icon="mdi-information"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :rules="req" label="موقع الصنف" v-model="brand.brand_website" append-icon="mdi-web"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-sheet  outlined>
                                <v-img max-height="150" contain :src="url==''?axios.defaults.baseURL+'/images/'+brand.brand_logo:url"></v-img>
                            </v-sheet>
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
                    <v-btn class="success" dark block @click="edit_brand">
                        <v-icon>mdi-content-save</v-icon>
                        <span class="mr-2 text-h6">تعديل الصنف</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</v-app>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "AddBrand",
        data() {
            return {
                valid: true,
                brand: {
                    brand_name_ar: '',
                    brand_name_en: '',
                    brand_website: '',
                    brand_logo: ''
                },
                req: [v => !!v || 'الحقل مطلوب'],
                url: ''
            }
        },

        methods: {
            onChangeFile() {
                const file = this.$refs.file.files[0];
                this.url = URL.createObjectURL(file);

            },
            edit_brand() {
                if (this.$refs.form.validate()) {
                    const file = this.$refs.file.files[0];
                    var formdata = new FormData();

                    formdata.append('image', file);
                    formdata.append('brand_name_ar', this.brand.brand_name_ar);
                    formdata.append('brand_name_en', this.brand.brand_name_en);
                    formdata.append('brand_website', this.brand.brand_website);
                    formdata.append('brand_logo', this.brand.brand_logo);
                    formdata.append('brand_id', this.brand.brand_id);

                    this.$axios.post('api/edit-brand', formdata)
                        .then(res => {
                            console.log(res)
                        }).catch(err => {
                        console.log(err)
                    });
                }
            }

        },
        computed:{
            get_brand_to_edit:function () {
                return this.$store.state.brands.target;
            }
        },
        watch:{
            get_brand_to_edit:function (new_brand) {
                this.brand = new_brand;
                console.log(this.brand)
            }
        },
        created(){
          //  console.log(axios.defaults.baseURL+'/images/'+this.brand.brand_logo)
        }

    }
</script>

<style scoped>

</style>