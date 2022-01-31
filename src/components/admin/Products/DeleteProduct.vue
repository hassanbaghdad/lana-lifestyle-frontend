<template>
    <v-app>
        <v-dialog v-model="$store.state.products.forms.delete_product" max-width="300">
            <v-card>
                <v-card-title class="error">
                    <v-icon color="white">mdi-delete</v-icon>
                    <span class="mr-2 text-h6" style="color: white">حذف منتج</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span class="text-h5">
                        هل انت متأكد من حذف
                        {{product.product_title_ar}}
                        ؟
                    </span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="error" @click="delete_product" :loading="loading">
                        <v-icon color="white">mdi-delete</v-icon>
                        <span class="text-h6 mr-2" style="color: white">حذف</span>
                    </v-btn>
                    <v-btn class="grey" @click="$store.state.products.forms.delete_product=false">
                        <v-icon color="white">mdi-delete</v-icon>
                        <span class="text-h6 mr-2" style="color: white">اللغاء</span>
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    export default {
        name: "DeleteProduct",
        data(){
            return{
                product:this.$store.state.products.target,
                loading:false,

            }
        },
        methods:{
           async delete_product()
            {
                this.loading = true;
               await this.$axios.post('api/delete-product',this.product)
                .then(res=>{
                    this.$store.state.products.forms.delete_product=false;
                    this.$store.commit('GET_PRODUCTS');
                }).catch(err=>{

                }).finally(fin=>{
                    this.loading = false;
                })
            },

        },
        computed:{
            get_product_to_delete:function () {
                return this.$store.state.products.target;
            }
        },
        watch:{
            get_product_to_delete:function (new_product) {
                this.product = new_product;
            }
        },

    }
</script>

<style scoped>

</style>