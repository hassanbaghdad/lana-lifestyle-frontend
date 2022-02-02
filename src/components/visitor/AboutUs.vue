<template>
    <v-container>
        <!-- ABOUT SECTION -->
        <section class="container-fluid clearfix aboutSection patternbg" >
            <div class="aboutInner">
                <div class="sepcialContainer">
                    <div class="row">
                        <div class="col-sm-6 col-xs-12 rightPadding">
                            <div class="imagebox " :style="$vuetify.rtl?'transform: scaleX(-1)':'transform: scaleX(1)'">
                                <img class="img-responsive " :data-src="require('@/../public/theme/img/me/about.png')" :src="require('@/../public/theme/img/me/about.png')" alt="Image About">
                            </div>
                        </div>
                        <div class="col-sm-6 col-xs-12">

                            <div class="aboutInfo">
                                <h2 v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;letter-spacing: normal !important;">
                                    معلومات عنا
                                </h2>
                                <h2 v-if="!$store.state.ui.lang_ar">
                                    ABOUT US
                                </h2>


                                <p v-if="!$store.state.ui.lang_ar">
                                    {{settings[0].about_en}}
                                </p>
                                <p v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;text-align: justify;">
                                    {{settings[0].about_ar}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-------- CONTACT US --------->

            <!-- CONTACT US SECTION -->
            <section class="clearfix contactSection padding" :style="$vuetify.rtl?'direction: ltr':'direction: rtl'">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-7 col-xl-8">
                            <div class="contactTitle">
                                <h3 v-if="!$store.state.ui.lang_ar">CONTACT US</h3>
                                <h3 v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;float: right">اتصل بنا</h3>
                            </div>

                            <div class="contactForm">
                                <div id="alert"></div><!--Response Holder-->

                                <form @submit.prevent="send_message"  id="angelContactForm">
                                    <div class="form-group">
                                        <input v-model="message.name" type="text" name="contact-form-name" class="form-control f-cairo18" :placeholder="$store.state.ui.lang_ar?'الاسم الكامل':'Full name'" required>
                                    </div>
                                    <div class="form-group">
                                        <input  v-model="message.email" type="email" name="contact-form-email" class="form-control f-cairo18" :placeholder="$store.state.ui.lang_ar?'البريد الالكتروني':'E-mail'" >
                                    </div>
                                    <div class="form-group">
                                        <input  v-model="message.phone" type="text" name="contact-form-mobile" class="form-control f-cairo18" :placeholder="$store.state.ui.lang_ar?'رقم الهاتف':'Phone'" required>
                                    </div>
                                    <div class="form-group">
                                        <textarea  v-model="message.message" class="form-control f-cairo18" name="contact-form-message" :placeholder="$store.state.ui.lang_ar?'الرسالة':'Message'" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <button  v-if="!$store.state.ui.lang_ar" type="submit" id="contact-submit-btn" class="btn btn-primary first-btn">
                                            Send Message
                                        </button>
                                        <button v-if="$store.state.ui.lang_ar" type="submit" id="contact-submit-btn" class="btn btn-primary first-btn text-h5">

                                            <span class=" f-cairo18"> ارسال</span>
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-5 col-xl-4">
                            <div class="holdingInfo patternbg">
                                <p class="text-center f-cairo18" v-if="!$store.state.ui.lang_ar">OUR ADDRESS</p>
                                <p class="text-center f-cairo18" v-if="$store.state.ui.lang_ar">العناوين</p>
                                <ul>
                                    <li><i class="fa fa-map-marker" aria-hidden="true"></i> {{settings[0].address}}</li>
                                    <li><i class="fa fa-phone" aria-hidden="true"></i> {{settings[0].website_phone}}<br>{{settings[0].website_phone}}</li>
                                    <li><i class="fa fa-envelope" aria-hidden="true"></i> <a :href="'mailto:'+settings[0].website_email">{{settings[0].website_email}}</a> <br><a :href="'mailto:'+settings[0].website_email">{{settings[0].website_email}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


    </v-container>
</template>

<script>
    export default {
        name: "AboutUs",
        data(){
            return{
                settings:this.$store.state.render.settings,
                message:{
                    name:'',
                    phone:'',
                    email:'',
                    message:''
                }
            }
        },
        methods:{
            async send_message(){
                if(this.message.name != '' && this.message.phone != '' && this.message.message )
                {
                    if(this.message.email == "" || this.message.email == null)
                    {
                        this.message.email = "لايوجد";
                    }
                    await this.$axios.post('api/send-message',this.message).then(res=>{
                        this.$fire({
                            title: "نجح",
                            text: res.data.msg,
                            type: "success",
                            timer: 2000
                        });
                        this.message.name = '';
                        this.message.email = '';
                        this.message.phone = '';
                        this.message.message = '';

                    })
                }

            }
        },
        computed:{
            get_settings:function () {
                return this.$store.state.render.settings;
            }
        },
        watch:{
            get_settings:function (new_settings) {
                this.settings = new_settings;
            }
        }
    }
</script>

<style scoped>

</style>