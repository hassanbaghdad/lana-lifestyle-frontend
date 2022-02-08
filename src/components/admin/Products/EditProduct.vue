<template>
    <v-app>
        <v-dialog v-model="$store.state.products.forms.edit_product" max-width="600">
            <v-form lazy-validation v-model="valid" ref="form">
                <v-card>
                    <v-card-title class="secondary">
                        <v-icon color="white">mdi-pen</v-icon>
                        <span class="text-h5 mr-2" style="color: white">تعديل منتج</span>
                      <v-spacer></v-spacer>
                      <v-btn @click="$store.state.products.forms.edit_product=false" icon><v-icon color="white">mdi-close</v-icon></v-btn>

                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-select v-model="product.brand_id_fk" :rules="req" class="f18" outlined :items="brands" item-value="brand_id" item-text="brand_name_ar"  label="نوع الماركة"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :rules="req" class="f18" outlined v-model="product.product_title_ar" label="اسم المنتج بالعربي"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :rules="req" class="f18" outlined v-model="product.product_title_en"  label="اسم المنتج باللغة الانكليزية"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea :rules="req" class="f18" outlined v-model="product.product_desc_ar"  label="وصف المنتج باللغة العربية"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea :rules="req" class="f18" outlined v-model="product.product_desc_en"  label="وصف المنتج باللغة الانكليزية"></v-textarea>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <div style="width: 100%;direction: ltr">
                                    1000px X 550px
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <v-sheet  outlined>
                                    <v-img max-height="150" contain :src="url==''?axios.defaults.baseURL+'/images/'+product.product_image:url"></v-img>
                                </v-sheet>
                                <input accept="image/*" class="d-none" type="file" id="file" ref="file" v-on:change="onChangeFile()"/>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn block outlined   right @click="$refs.file.click()">
                                    <v-icon>mdi-image</v-icon>
                                    <span class="mr-2 text-h6">تغيير الصورة</span>
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-switch
                                        v-model="product.product_slide"
                                        label="عرض المنتج في السلايدر"
                                        class="f18"
                                ></v-switch>
                            </v-col>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn :loading="loading" class="success" dark block @click="edit_product">
                                    <v-icon>mdi-content-save</v-icon>
                                    <span class="mr-2 text-h6">تعديل المنتج</span>
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </v-app>
</template>

<script>
    export default {
        name: "AddProduct",
        data(){
            return{
                product:{
                    product_title_ar:'',
                    product_title_en:'',
                    product_desc_ar:'',
                    product_desc_en:'',
                    product_image:'',
                    brand_id_fk:'',
                    product_slide:''
                },
                brands:this.$store.state.brands.brands,
                valid:true,
                loading:false,
                req:[v=>!!v || 'الحقل مطلوب'],
                url:''
            }
        },
        methods:{
            edit_product()
            {
                if(this.$refs.form.validate())
                {
                    this.loading = true;
                    var formData = new FormData();
                    formData.append('product_title_ar',this.product.product_title_ar);
                    formData.append('product_title_en',this.product.product_title_en);
                    formData.append('product_desc_ar',this.product.product_desc_ar);
                    formData.append('product_desc_en',this.product.product_desc_en);
                    formData.append('image',this.$refs.file.files[0]);
                    formData.append('brand_id_fk',this.product.brand_id_fk);
                    formData.append('product_id',this.product.product_id);
                    if(this.product.product_slide)
                    {
                        formData.append('product_slide',1);
                    }else{
                        formData.append('product_slide',0);
                    }


                    this.$axios.post('api/edit-product',formData)
                    .then(res=>{
                        console.log(res.data);
                        this.loading = false;
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.$store.state.products.forms.edit_product = false;
                        this.$store.commit('GET_PRODUCTS');
                        this.product = [];
                        this.url = '';
                    }).catch(err=>{
                        console.log(err)
                    }).finally(fin=>{
                        this.loading = false;
                    })
                }
            },
            onChangeFile()
            {
                const file = this.$refs.file.files[0];
                if(file.size > 1100000)
                {
                    this.$fire({
                        title: "حجم الصورة كبيرا",
                        text: "الحد الاقصى المسموح هو 1 ميكا بايت",
                        type: "error",
                        timer: 5000
                    });
                }else{
                    this.url = URL.createObjectURL(file);
                }

            },
        },
        computed:{
            get_product_to_edit:function () {
                return this.$store.state.products.target;
            }
        },
        watch:{
            get_product_to_edit:function (new_product) {

                    if(new_product.product_slide == 0 && new_product.product_slide == '0' )
                    {
                        new_product.product_slide = false;
                    }
                    if(new_product.product_slide == 1 && new_product.product_slide == '1' )
                    {
                        new_product.product_slide = true;
                    }


                this.product = new_product;
            }
        },

    }
</script>

<style scoped>
    .f18{
        font-size: 18px;
    }
    .f18b{
        font-size: 18px;
        font-weight: bold;
    }

</style>