<template>
    <v-container>
        <v-dialog v-model="$store.state.view" height="700">
            <v-card  class="mr-0" style="overflow: hidden">
                <v-card-title class="primary">
                    <v-btn icon @click="$store.state.view = false">
                        <v-icon color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider/>
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-text class="pa-4">
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <v-img  contain :src="$axios.defaults.baseURL+'/images/'+ product.product_image"></v-img>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card max-width="900">
                            <v-card-title class="pa-4">
                                <h5>{{product.product_title_ar}}</h5>
                            </v-card-title>
                            <v-divider/>
                            <v-card-text class="pa-4">
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <h5>{{product.product_desc_ar}}</h5>
                                    </v-col>
                                    <v-col cols="12">
                                        <div   text class="orange pa-2 text-center" @click="$store.state.target_brand=product.brand_id_fk;$router.push('/products')">
                                            <h5 v-if="!$store.state.ui.lang_ar" style="color: white">GO TO THIS BRAND PRODUCTS</h5>
                                            <h5 v-if="$store.state.ui.lang_ar" style="color: white;font-family: Cairo;font-size: 20px">الذهاب الى منتجات هذه الشركة</h5>

                                        </div>

                                    </v-col>

                                </v-row>
                            </v-card-text>

                        </v-card>
                    </v-col>

                </v-row>
            </v-card>

        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "ViewBrands",
        data(){
            return{
                product:this.$store.state.target_product
            }
        },
        computed:{
            get_view:function () {
                return this.$store.state.target_product;
            }
        },
        watch:{
            get_view:function (new_product) {
                this.product = new_product;
            }
        }
    }
</script>

<style scoped>
    *{
        font-family: Cairo !Important;
    }
</style>