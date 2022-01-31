<template>
    <v-app>
        <v-dialog v-model="$store.state.messages.forms.delete_message" max-width="300">
            <v-card>
                <v-card-title class="error">
                    <v-icon color="white">mdi-delete</v-icon>
                    <span class="mr-2 text-h6" style="color: white">حذف رسالة</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span class="text-h5">
                         هل انت متأكد من حذف رسالة
                        <b>{{message.name}}</b>
                        ؟
                    </span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="error" @click="delete_message" :loading="loading">
                        <v-icon color="white">mdi-delete</v-icon>
                        <span class="text-h6 mr-2" style="color: white">حذف</span>
                    </v-btn>
                    <v-btn class="grey" @click="$store.state.messages.forms.delete_brand=false">
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
        name: "DeleteMessage",
        data(){
            return{
                message:this.$store.state.messages.target,
                loading:false,

            }
        },
        methods:{
            async delete_message()
            {
                this.loading = true;
                await this.$axios.post('api/delete-message',this.message)
                    .then(res=>{
                        this.$store.state.messages.forms.delete_message=false;
                        this.$store.commit('GET_MESSAGES');
                    }).catch(err=>{

                    }).finally(fin=>{
                        this.loading = false;
                    })
            },

        },
        computed:{
            get_message_to_delete:function () {
                return this.$store.state.messages.target;
            }
        },
        watch:{
            get_message_to_delete:function (new_message) {
                this.message = new_message;
            }
        },

    }
</script>

<style scoped>

</style>