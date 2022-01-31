<template>
    <v-app>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-center f18b">
                        #
                    </th>
                    <th class="text-center f18b">
                        الاسم
                    </th>
                    <th class="text-center f18b">
                        البريد
                    </th>
                    <th class="text-center f18b">
                        الهاتف
                    </th>
                    <th class="text-center f18b">
                        الرسالة
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
                        <v-text-field v-model="search.name" @keyup="search_message" prepend-inner-icon="mdi-magnify"></v-text-field>
                    </th>
                    <th class="text-center f18b">
                        <v-text-field v-model="search.email" @keyup="search_message" prepend-inner-icon="mdi-magnify"></v-text-field>
                    </th>
                    <th class="text-center f18b">
                        <v-text-field v-model="search.phone" @keyup="search_message" prepend-inner-icon="mdi-magnify"></v-text-field>
                    </th>

                    <th class="text-center f18b">
                        <v-text-field v-model="search.message" @keyup="search_message" prepend-inner-icon="mdi-magnify"></v-text-field>
                    </th>


                </tr>
                </thead>
                <tbody>
                <tr v-for="item in messages" :key="item.message_id">
                    <td class="text-center f18">1</td>
                    <td class="text-center f18">
                        {{item.name}}
                    </td>
                    <td class="text-center f18">
                        {{item.email}}
                    </td>
                    <td class="text-center f18">
                        {{item.phone}}
                    </td>
                    <td class="text-center f18">
                        {{item.message}}
                    </td>

                    <td class="text-center">
                        <v-btn icon @click="set_message_to_delete(item)">
                            <v-icon color="#f72f61">mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <DeleteMessage/>
    </v-app>
</template>

<script>
    import DeleteMessage from "@/components/admin/Messages/DeleteMessage";
    export default {
        name: "Messages",
        components:{
            DeleteMessage
        },
        data(){
            return{
                messages:[],
                search:{
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                }
            }
        },
        methods:{
            set_message_to_delete(item)
            {
                this.$store.state.messages.target = item;
                this.$store.state.messages.forms.delete_message = true;
            },
            search_message(){
                var filterd = this.$store.state.messages.messages;
                filterd = filterd.filter(item=>item.name.match(this.search.name));
                filterd = filterd.filter(item=>item.email.match(this.search.email));
                filterd = filterd.filter(item=>item.phone.match(this.search.phone));
                filterd = filterd.filter(item=>item.message.match(this.search.message));
                this.messages = filterd;
            }
        },
        created(){
            this.$store.commit('GET_MESSAGES');
        },
        computed:{
            get_messages:function () {
                return this.$store.state.messages.messages;
            }
        },
        watch:{
            get_messages:function (new_messages) {
                this.messages = new_messages;
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