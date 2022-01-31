import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    rtl:true,
    theme: {
        themes: {
            light: {
                primary: '#e61990', // #E53935
                secondary:'#088d5f'
            },
        },

    },
});
