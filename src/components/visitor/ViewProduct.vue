<template>
    <v-container>
    <v-card class="text-center mt-16" width="100%"  v-if="loaded">
        <v-card-title class="primary">
            <h5 class="pa-4" style="color: white">
                {{product[0].product_title_ar}}
            </h5>
        </v-card-title>
        <v-divider></v-divider>
       <v-row justify="center">
           <v-col cols="12">
               <v-row justify="center">
                   <v-col cols="12" md="6" >
                       <v-img class="mr-auto d-flex" :src="$axios.defaults.baseURL+'/images/'+ product[0].product_image"></v-img>
                   </v-col>
<!--                   <v-col cols="12">-->
<!--                       <h3>{{product[0].product_title_ar}}</h3>-->
<!--                       <v-divider></v-divider>-->
<!--                   </v-col>-->
                   <v-col cols="12" md="6">
                       <h5>
                           <p class="p-4">
                               {{product[0].product_desc_ar}}
                           </p>
                       </h5>
                   </v-col>

               </v-row>
           </v-col>
       </v-row>
    </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "ViewProduct",
        data(){
            return{
                product:[],
                loaded:false
            }
        },
        methods:{
            get_product(){
                this.loaded = false;
                var product_id = this.$route.path.split('/product/')[1];

                this.$axios.post('api/visitor/view-product',{product_id:product_id}).then(res=>{
                    this.product = res.data;
                    this.loaded = true;
                }).catch(err=>{
                    console.log(err)
                }).finally(fin=>{
                    this.$store.state.loading = false;
                })
            }
        },
        created(){
            this.$store.state.loading = true;
            this.get_product();
        }

    }
</script>

<style scoped>

</style>