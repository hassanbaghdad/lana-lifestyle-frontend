<template>
    <v-app>
        <v-dialog v-model="$store.state.brands.forms.delete_brand" max-width="300">
            <v-card>
                <v-card-title class="error">
                    <v-icon color="white">mdi-delete</v-icon>
                    <span class="mr-2 text-h6" style="color: white">حذف ماركة</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span class="text-h5">
                        هل انت متأكد من حذف
                        {{brand.brand_name_ar}}
                        ؟
                    </span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="error" @click="delete_brand" :loading="loading">
                        <v-icon color="white">mdi-delete</v-icon>
                        <span class="text-h6 mr-2" style="color: white">حذف</span>
                    </v-btn>
                    <v-btn class="grey" @click="$store.state.brands.forms.delete_brand=false">
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
        name: "DeleteBrand",
        data(){
            return{
                brand:this.$store.state.brands.target,
                loading:false,

            }
        },
        methods:{
           async delete_brand()
            {
                this.loading = true;
                await this.$axios.post('api/delete-brand',this.brand)
                    .then(res=>{
                        this.$store.state.brands.forms.delete_brand=false;
                        this.$store.commit('GET_BRANDS');
                    }).catch(err=>{

                }).finally(fin=>{
                    this.loading = false;
                })
            },

        },
        computed:{
            get_brand_to_delete:function () {
                return this.$store.state.brands.target;
            }
        },
        watch:{
            get_brand_to_delete:function (new_brand) {
                this.brand = new_brand;
            }
        },

    }
</script>

<style scoped>

</style>