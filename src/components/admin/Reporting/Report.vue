<template>
    <v-container>
        <v-row justify="center">
            <v-card width="100%">
                <v-card-title>
                    العدد الكلي للزوار
                    {{count_all}}
                </v-card-title>
                <v-divider/>
                <v-card-text>
                    <v-simple-table >
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-center" style="font-size: 20px !important;">الدولة</th>
                                <th class="text-center" style="font-size: 20px !important;">عدد الزوار</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="q in report" :key="q.id">
                                <td  class="text-center">
                                    <country-flag :country='q.country' size='normal'/>
                                </td>
                                <td class="text-center" style="font-size: 20px !important;">
                                    {{q.count}}
                                </td>


                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import CountryFlag from 'vue-country-flag'

    export default {
        name: "Report",
        components:{
            CountryFlag
        },
        data(){
            return{
                report:[],
                count_all:0
            }
        },
        methods:{
            get_report(){
                this.$axios.get('api/get-report').then(res=>{
                    this.report = res.data;
                    this.get_count_all();
                }).catch(err=>{
                    console.log(err)
                })
            },
            get_count_all()
            {
                var rep = this.report;
                rep.map(x=>{
                    this.count_all += parseInt(x.count);
                })
            }
        },
        created(){
            this.get_report();
        }
    }
</script>

<style scoped>

</style>