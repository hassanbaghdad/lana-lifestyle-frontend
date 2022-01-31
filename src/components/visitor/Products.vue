<template>
    <v-container :style="$vuetify.rtl?'direction: ltr':'direction: rtl'">
        <v-card elevation="1">
            <v-card-title class="d-flex align-items-center">
                <h4 v-if="!$store.state.ui.lang_ar">Products</h4>
                <h4 class="d-flex f-cairo18" v-if="$store.state.ui.lang_ar" style="font-family: Cairo !Important ; font-size: 25px">المنتجات</h4>
            </v-card-title>
            <v-divider/>
            <v-card-text class="primary">
                    <v-chip-group
                            mandatory
                            active-class="white--text"
                    >
                        <v-chip
                                @click="search_product('all')"
                                color="white"
                                style="color: deeppink !important;"
                        >
                            All
                        </v-chip>
                        <v-chip
                                @click="search_product(brand.brand_id)"
                                v-for="brand in brands"
                                :key="brand.brand_id"
                                color="white"
                                style="color: deeppink !important;"
                        >
                            {{ brand.brand_name_ar }}
                        </v-chip>
                    </v-chip-group>
            </v-card-text>
            <v-divider/>

            <v-card class=" ma-4" elevation="8"  v-for="prod in products"
                  :key="'prod_'+prod.product_id">
                <v-row justify="center">
                    <v-col cols="12" md="3">
                        <router-link :to="'/product/'+prod.product_id">
                            <v-img class="ma-4"  :src="$axios.defaults.baseURL+'/images/'+ prod.product_image"></v-img>

                        </router-link>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div style="height: 100%" class="d-flex align-items-center">
                            <h4 class="d-flex pa-4">{{prod.product_title_ar}}</h4>
                        </div>

                    </v-col>
                    <v-col cols="12" md="3">
                        <div style="height: 100%" class="d-flex align-items-center">
                            <v-btn text width="200">
                                <h6 class="d-flex font-italic pa-4" @click="search_product(prod.brand_id_fk)">{{prod.brand_name_ar}}</h6>
                            </v-btn>

                        </div>

                    </v-col>
                    <v-col cols="12" md="3">
                        <div  style="height: 100%" class="d-flex align-items-center pa-4">
                            <v-btn style="font-size: 20px" v-if="!$store.state.ui.lang_ar" :to="'/product/'+prod.product_id" class="primary">View</v-btn>
                            <v-btn large style="font-size: 18px;font-family: Cairo !important;" v-if="$store.state.ui.lang_ar" :to="'/product/'+prod.product_id" class="primary">عرض المنتج</v-btn>
                        </div>

                    </v-col>
                </v-row>
                <v-divider/>
            </v-card>

        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Products",

        data(){
            return{
                brands:this.$store.state.render.brands,
                products:[],
                brand_id_filter:0

            }
        },
        methods:{
            search_product(brand_id){
                var filtered = this.$store.state.products;
                if(brand_id == 'all')
                {
                   filtered = this.$store.state.products;
                    this.products = filtered;

                }else{

                    filtered =  filtered.filter(item=>item.brand_id_fk==brand_id);
                    this.products = filtered;
                }

            },
        },
        computed:{
            get_brands:function () {
                return this.$store.state.render.brands;
            },
            get_target:function () {
                return this.$store.state.target_brand;
            },


        },
        watch:{
            get_brands:function (new_brands) {
                this.brands = new_brands;
            },
            get_target:function (new_brand) {
                this.search_product(new_brand)
            },



        },
        created(){
            this.$store.state.view = false;
            this.$axios.get('api/visitor/get-products').then(res=>{
                this.products = res.data;
                this.$store.state.products = res.data;
                if(this.$store.state.target_brand != null)
                {
                    console.log(res.data)
                    this.search_product(this.$store.state.target_brand);
                    if(this.products.length == 0)
                    {
                        this.search_product('all');
                    }
                }
            })
        }
    }
</script>

<style scoped>

</style>