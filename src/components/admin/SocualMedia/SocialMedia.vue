<template>
    <v-container>
        <v-card class="pa-4 text-right">
            <v-btn dark fab small color="success" @click="$store.state.socials.forms.add_social = true"><v-icon>mdi-plus</v-icon></v-btn>
        </v-card>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center f20b">ت</th>
                        <th class="text-center f20b">الاسم</th>
                        <th class="text-center f20b">الرابط</th>
                        <th class="text-center f20b">الايقونة</th>
                        <th class="text-center f20b">خيارات</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="social in socials" :key="social.id">
                    <td class="text-center">{{socials.indexOf(social)+1}}</td>
                    <td class="text-center">{{social.title}}</td>
                    <td class="text-center">{{social.url}}</td>
                    <td class="text-center">
                        <v-icon :color="social.color">{{social.icon}}</v-icon>
                    </td>
                    <td class="text-center">
                        <v-btn @click="set_social_to_edit(social)" icon><v-icon>mdi-pen</v-icon></v-btn>
                        <v-btn @click="set_social_to_delete(social)" icon><v-icon>mdi-delete</v-icon></v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <AddSocial/>
        <EditSocial/>
    </v-container>
</template>

<script>
    import AddSocial from "@/components/admin/SocualMedia/AddSocial";
    import EditSocial from "@/components/admin/SocualMedia/EditSocial";
    export default {
        name: "SocialMedia",
        components:{
            AddSocial,
            EditSocial
        },
        data(){
            return{
                socials:this.$store.state.socials.socials
            }
        },
        methods:{
            set_social_to_edit(item)
            {
                this.$store.state.socials.target_social = item;
                this.$store.state.socials.forms.edit_social = true;
            },
            set_social_to_delete(item)
            {
                this.$confirm("هل انت متاكد من الحذف ").then(() => {
                    this.$axios.post('api/delete-social',item).then(res=>{
                        console.log(res.data)
                        this.$store.commit("GET_SOCIALS")
                    })
                });
            },


        },
        created(){
            this.$store.commit("GET_SOCIALS");
        },
        computed:{
            get_socials:function () {
                return this.$store.state.socials.socials;
            }
        },
        watch:{
            get_socials:function (new_socials) {
                this.socials = new_socials;
            }
        }
    }
</script>

<style scoped>
    .f20b{
        font-weight: bold !important;
        font-size: 20px !important;
    }
</style>