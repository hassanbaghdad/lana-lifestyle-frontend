<template>
    <v-app>
        <v-container fluid>
            <div class="card">
                <div class="card-header text-right">
                    <v-spacer></v-spacer>
                    <v-btn right dark fab class="secondary" small @click="$store.state.brands.forms.add_brand = !$store.state.brands.forms.add_brand ">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>


                </div>

            </div>


            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center f18b">
                            ت
                        </th>
                        <th class="text-center f18b">
                            الماركة
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
                            <v-text-field v-model="search.brand_name_ar" @keyup="search_brand" prepend-inner-icon="mdi-magnify"></v-text-field>
                        </th>
                        <th class="text-center f18b">
                        </th>

                    </tr>
                    </thead>

                    <tbody>
                    <tr
                            v-for="item in brands"
                            :key="item.brand_id"
                    >
                        <td class="text-center f18">{{ brands.indexOf(item)+1 }}</td>
                        <td class="text-center f18">{{ item.brand_name_ar }}</td>
                        <td class="text-center f18">
                            <v-btn icon @click="set_brand_to_edit(item)">
                                <v-icon color="#0e65c2">mdi-pen</v-icon>
                            </v-btn>
                            <v-btn icon @click="set_brand_to_delete(item)">
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
            <AddBrand/>
            <DeleteBrand/>
            <EditBrand/>
        </v-container>
    </v-app>
</template>

<script>
    import AddBrand from "@/components/admin/Brands/AddBrand";
    import DeleteBrand from "@/components/admin/Brands/DeleteBrand";
    import EditBrand from "@/components/admin/Brands/EditBrand";
   // import JwPagination from 'jw-vue-pagination'
    export default {
        name: "Brands",
        components:{
            AddBrand,DeleteBrand,EditBrand
            //JwPagination
        },
        data(){
            return{
                brands:[],
                pageOfItems: [],
                search:{
                    brand_name_ar:''
                },
            }
        },
        methods:{
            onChangePage(pageOfItems) {
                // update page of items
                this.pageOfItems = pageOfItems;
            },
            set_brand_to_delete(item)
            {
                this.$store.state.brands.target = item;
                this.$store.state.brands.forms.delete_brand = true;
            },
            set_brand_to_edit(item)
            {
                this.$store.state.brands.target = item;
                this.$store.state.brands.forms.edit_brand = true;
            },
            search_brand(){
                var filtered = this.$store.state.brands.brands;
                filtered = filtered.filter(item=>item.brand_name_ar.match(this.search.brand_name_ar));
                this.brands = filtered;
            },

        },
        created(){
            this.$store.commit('GET_BRANDS');
        },
        computed:{
            get_brands:function () {
                return this.$store.state.brands.brands;
            }
        },
        watch:{
            get_brands:function (new_brands) {
                this.brands = new_brands;
                this.pageOfItems = new_brands;
            }
        },

    }
</script>

<style scoped>
    .f18{
        font-size: 18px !important;
    }
    .f18b{
        font-size: 20px !important;
        font-weight: bold !important;
    }

</style>