<template>
        <v-app>
            <v-card>
                <v-toolbar
                        color="secondary"
                        dark
                        flat
                >
                    <v-btn @click="$store.state.account = true" icon><v-icon>mdi-account</v-icon></v-btn>

                    <v-toolbar-title >الادارة</v-toolbar-title>

                    <v-spacer></v-spacer>
<Account/>


                    <v-btn  icon @click="logout">
                        <v-icon>mdi-exit-run</v-icon>

                    </v-btn>

                    <template v-slot:extension>
                        <v-tabs
                                v-model="tab"
                                align-with-title
                        >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab href="#tab-1">
                                <span class="text-h5 font-weight-bold">
                                    الماركات
                                </span>

                            </v-tab>
                            <v-tab href="#tab-2">
                                <span class="text-h5 font-weight-bold">
                                    المنتجات
                                </span>

                            </v-tab>
                            <v-tab href="#tab-3">
                                <span class="text-h5 font-weight-bold">
                                    الرسائل
                                </span>

                            </v-tab>
                            <v-tab href="#tab-4">
                                <span class="text-h5 font-weight-bold">
                                     مواقع التواصل
                                </span>

                            </v-tab>
                            <v-tab href="#tab-5">
                                <span class="text-h5 font-weight-bold">
                                     التقارير
                                </span>

                            </v-tab>
                            <v-tab href="#tab-6">
                                <span class="text-h5 font-weight-bold">
                                     اعدادات الموقع
                                </span>

                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>

                <v-tabs-items v-model="tab">
                    <v-tab-item value="tab-1">
                        <Brands/>
                    </v-tab-item>
                    <v-tab-item value="tab-2">
                        <Products/>
                    </v-tab-item>
                    <v-tab-item value="tab-3">
                       <Messages/>
                    </v-tab-item>
                    <v-tab-item value="tab-4">
                        <SocialMedia/>
                    </v-tab-item>
                    <v-tab-item value="tab-5">
                        <Report/>
                    </v-tab-item>
                    <v-tab-item value="tab-6">
                        <Settings/>
                    </v-tab-item>


                </v-tabs-items>
            </v-card>
        </v-app>
</template>

<script>
    import Brands from "@/components/admin/Brands/Brands";
    import Products from "@/components/admin/Products/Products";
    import Messages from "@/components/admin/Messages/Messages";
    import Settings from "@/components/admin/Settings/Settings";
    import SocialMedia from "@/components/admin/SocualMedia/SocialMedia";
    import Account from "@/components/admin/Account/Account";
    import Report from "@/components/admin/Reporting/Report";
    export default {
        name: "Dashboard",
        components:{
           Brands,
            Products,
            Settings,
            Messages,
            SocialMedia,
            Account,
            Report
        },
        data () {
            return {
                tab: null,
                items: [
                    'Brands', 'Products', 'messages', 'settings', 'news',
                ],
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
        methods:{
            logout()
            {
                this.$axios.get('api/logout').then(res=>{
                    console.log(res.data);
                    this.$router.push("/");
                    this.$store.state.dashboard = false;
                })
            }
        },
        created(){
            if(this.$route.path.split("/dashboard")[1] != null)
            {
                this.$vuetify.rtl = true;
            }
        }
    }
</script>

<style scoped>

</style>