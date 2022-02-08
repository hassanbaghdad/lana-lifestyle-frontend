<template>
        <v-app>
            <div class="card">
                <div class="card-header text-right">
                    <v-spacer></v-spacer>
                    <v-btn right dark fab class="secondary" small @click="$store.state.products.forms.add_product = true">
                        <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>


                </div>

            </div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f18b">
                            #
                        </th>
                        <th class="text-center f18b">
                            المنتج
                        </th>
                        <th class="text-center f18b">
                            الماركة
                        </th>
                        <th class="text-center f18b">
                            سلايدر
                        </th>

                        <th class="text-center f18b">
                            خيارات
                        </th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <th class="text-center f18b">

                        </th>
                        <th class="text-center f18b">
                            <v-text-field v-model="search.product_title_ar" @keyup="search_product" prepend-inner-icon="mdi-magnify"></v-text-field>
                        </th>
                        <th class="text-center f18b">
                            <v-text-field v-model="search.brand_name_ar" @keyup="search_product" prepend-inner-icon="mdi-magnify"></v-text-field>
                        </th>

                        <th class="text-center f18b">
                        </th>
                        <th class="text-center f18b">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in products" :key="item.product_id">
                        <td class="text-center f18">
                            {{products.indexOf(item)+1}}
                        </td>
                        <td class="text-center f18">
                            {{item.product_title_ar}}
                        </td>
                        <td class="text-center f18">
                            {{item.brand_name_ar}}
                        </td>
                        <td class="text-center f18">
                            <v-icon v-if="item.product_slide == 1">mdi-check</v-icon>
                            <v-icon v-if="item.product_slide == 0">mdi-close</v-icon>
                        </td>

                        <td class="text-center">
                            <v-btn icon @click="set_product_to_edit(item)">
                                <v-icon color="#0e65c2">mdi-pen</v-icon>
                            </v-btn>
                            <v-btn icon @click="set_product_to_delete(item)">
                                <v-icon color="#f72f61">mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="card text-center m-3">

                <div class="card-footer pb-0 pt-3">
<!--                    <jw-pagination :items="pageOfItems" @changePage="onChangePage"></jw-pagination>-->
                </div>
            </div>
            <AddProduct/>
            <EditProduct/>
            <DeleteProduct/>
        </v-app>
</template>

<script>
    import AddProduct from "@/components/admin/Products/AddProduct";
    import EditProduct from "@/components/admin/Products/EditProduct";
    import DeleteProduct from "@/components/admin/Products/DeleteProduct";
   // import JwPagination from 'jw-vue-pagination'
    export default {
        name: "Products",
        filters:{
            slide_value:function (value) {
                if(value == 1)
                {
                    return true;
                }else{
                    return false;
                }
            }
        },
        components:{
           // JwPagination
            AddProduct,
            EditProduct,
            DeleteProduct
        },
        data(){
            return{
                products:this.$store.state.products.products,
                pageOfItems:[],
                search:{
                    product_title_ar:'',
                    brand_name_ar:'',
                }
            }
        },
        methods:{
            search_product()
            {
                var filtered = this.$store.state.products.products;
                filtered = filtered.filter(item=>item.product_title_ar.match(this.search.product_title_ar));
                filtered = filtered.filter(item=>item.brand_name_ar.match(this.search.brand_name_ar));
                this.products = filtered;
            },
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            set_product_to_delete(item)
            {
                this.$store.state.products.target = item;
                this.$store.state.products.forms.delete_product= true;
            },
            set_product_to_edit(item)
            {
                this.$store.state.products.target = item;
                this.$store.state.products.forms.edit_product= true;
            },

        },
        created(){
            this.$store.commit('GET_PRODUCTS');
        },
        computed:{
            get_products:function () {
                return this.$store.state.products.products;
            }
        },
        watch:{
            get_products:function (new_products) {
                this.products = new_products;
                this.pageOfItems = new_products;
            }
        },

    }
</script>

<style scoped>
    .f18{
        font-size: 18px !important;
    }
    .f18b{
        font-size: 18px !important;
        font-weight: bold !important;
    }
</style>