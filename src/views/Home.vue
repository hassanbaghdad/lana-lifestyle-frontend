<template>
  <div v-if="!$store.state.loading" class="home">
    <!-- MAIN SLIDER -->
      <v-app :style="$vuetify.breakpoint.xs?'height: 250px':''">
        <v-carousel cycle interval="4000"  :height="$vuetify.breakpoint.xs?'200':'100%'" hide-delimiters>
            <v-carousel-item v-for="slide in slides" :key="slide.product_id">
              <div class="myimg" style="height: 100%" >
                <router-link :to="'/product/'+slide.product_id">
                  <v-img  :max-height="$vuetify.breakpoint.xs?'200':'900'" :src="$axios.defaults.baseURL+'/images/'+ slide.product_image">
                  </v-img>
                </router-link>

              </div>

            </v-carousel-item>
        </v-carousel>
      </v-app>

<v-app>
  <!-- ABOUT SECTION -->
  <section class="container-fluid clearfix aboutSection patternbg" >
    <div class="aboutInner">
      <div class="sepcialContainer">
        <div class="row">
          <div class="col-sm-6 col-xs-12 rightPadding">
            <div class="imagebox " :style="$vuetify.rtl?'transform: scaleX(-1)':'transform: scaleX(1)'">
              <img class="img-responsive" :data-src="require('@/../public/theme/img/me/about.png')" :src="require('@/../public/theme/img/me/about.png')" alt="Image About">
            </div>
          </div>
          <div class="col-sm-6 col-xs-12">

            <div class="aboutInfo">
              <h2 v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;letter-spacing: normal !important;direction: rtl;text-align: right;font-size: 25px;font-weight: bold">
                معلومات عنا
              </h2>
              <h2 v-if="!$store.state.ui.lang_ar">
                ABOUT US
              </h2>
              <v-divider/>

              <p v-if="!$store.state.ui.lang_ar" style="text-align: justify;direction: ltr;font-size: 20px;line-height: 30px;padding: 10px">
                {{$store.state.render.settings[0].about_en}}
              </p>
              <p v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;text-align: justify;direction: rtl;font-size: 20px;line-height: 30px">
                {{$store.state.render.settings[0].about_ar}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</v-app>



    <!-- BEST BRANDS -->
    <section class="clearfix offersSection patternbg">
      <v-card class="pa-0">
        <div class="clearfix homeGalleryTitle">
          <div class="container">
            <div class="text-center mt-4">
              <h2 style="color: #e61990" v-if="!$store.state.ui.lang_ar">BEST BRANDS</h2>
              <h2  v-if="$store.state.ui.lang_ar" style="color: #e61990;font-family: Cairo !important;letter-spacing: normal">ابرز الماركات</h2>
            </div>
          </div>
        </div>
        <v-divider/>

       <div style="direction: ltr !important;">
         <!-- PARTNER LOGO SECTION -->
         <carousel v-if="loaded" :autoplay="true" :loop="true" :center="false" :nav="false" :autoplayTimeout="3000"   :responsive="{0:{items:1,nav:false},600:{items:4,nav:false}}">
           <div style="cursor: pointer" class="pa-4" v-for="brand_slide in brands" :key="'slide_'+brand_slide.brand_id" >
             <v-img @click="$store.state.target_brand=brand_slide.brand_id;$router.push('/products')" max-width="300" contain :src="$axios.defaults.baseURL+'/images/'+ brand_slide.brand_logo"></v-img>
           </div>
           <div style="cursor: pointer" class="pa-4" v-for="brand_slide in brands" :key="'slide_2_'+brand_slide.brand_id" >
             <v-img @click="$store.state.target_brand=brand_slide.brand_id;$router.push('/products')" max-width="300" contain :src="$axios.defaults.baseURL+'/images/'+ brand_slide.brand_logo"></v-img>
           </div>

         </carousel>
       </div>

      </v-card>
    </section>


<!--    <v-img max-height="100" max-width="200" :src="$axios.defaults.baseURL+'/images/'+ brand_slide.brand_logo"  ></v-img>-->








    <!-- HOME GALLERY SECTION -->

     <v-card class="pa-4 " :style="$store.state.ui.lang_ar?'direction:rtl;':'direction:ltr;'">
       <v-tabs
               v-model="tab"
               show-arrows

       >
         <v-tab v-for="tab_brand in brands" :key="'tab_'+tab_brand.brand_id" @click="filter_images_products_by_brand_select(tab_brand.brand_id)"  color="primary">
           {{tab_brand.brand_name_ar}}
         </v-tab>




         <v-tab-item
                 v-for="product_img in products"
                 :key="'product_img_'+product_img.product_id"
         >
           <v-container fluid >

              <v-row >

                <v-col
                        v-for="(p,i) in grid_images"
                        :key="'i_'+p.product_id"
                        cols="12"
                        md="4"
                >
                  <div>
                    <div class="cover-img">
                      <v-img
                              :contain="$vuetify.breakpoint.xs?true:false"
                              @click="$store.state.target_product = p;$store.state.view = true"
                              class="grid-img"
                              max-height="350"
                              :src="$axios.defaults.baseURL+'/images/'+ p.product_image"
                              :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
                              aspect-ratio="1"
                      ></v-img>
                    </div>
                    <v-divider/>
                  </div>
                </v-col>

              </v-row>

           </v-container>
         </v-tab-item>
       </v-tabs>
     </v-card>


    <!-- View Products Bar -->
  <v-app style="max-height: 300px;">
    <section class="clearfix callAction">
      <div class="container">
        <div class="row">
          <div class="col-sm-7 col-sm-offset-1 col-xs-12">
            <div class="callInfo">
              <p v-if="!$store.state.ui.lang_ar" style="font-family: Cairo ;font-size: 20px" class="italic mt-2">Visit products part and browse new  products from the best brands .</p>
              <p v-if="$store.state.ui.lang_ar" style="font-family: Cairo ;font-size: 20px" class="mt-2">الانتقال الى القسم الخاص بالمنتجات لعرض اجدد المنتجات من الماركات العالمية</p>
            </div>
          </div>
          <div class="col-sm-4 col-xs-12">
            <a v-if="!$store.state.ui.lang_ar" class="btn btn-primary first-btn callBtn">
              <router-link to="/products">
                VIEW BRANDS
              </router-link>
            </a>
            <a v-if="$store.state.ui.lang_ar" class="btn btn-primary first-btn callBtn" style="font-family: Cairo !important;font-size: 20px">
              <router-link to="/products" >
                تصفح المنتجات
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </section>
  </v-app>

<v-divider/>
    <!-------- CONTACT US --------->
    <div  >
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
                    <input  v-model="message.email" type="text" name="contact-form-email" class="form-control f-cairo18" :placeholder="$store.state.ui.lang_ar?'البريد الالكتروني':'E-mail'" >
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
                  <li><i class="fa fa-phone" aria-hidden="true"></i> {{settings[0].website_phone}}<br>{{settings[0].website_phone2}}</li>
                  <li><i class="fa fa-envelope" aria-hidden="true"></i> <a :href="'mailto:'+settings[0].website_email">{{settings[0].website_email}}</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>









    </div>

<ViewBrands/>


  </div>
</template>

<script>
// @ is an alias to /src

import carousel from 'vue-owl-carousel'
import ViewBrands from "@/components/visitor/ViewBrands";
export default {
  name: 'Home',
  components: {
    carousel,
    ViewBrands
  },
  data(){
    return{
      tab:null,
      slides:this.$store.state.render.slides,
      brands:this.$store.state.render.brands,
      products:this.$store.state.render.products,
      grid_images:[],
      loaded:false,
      settings:[],
      message:{
        name:'',
        phone:'',
        email:'',
        message:''
      }
    }
  },
  methods:{

    async filter_images_products_by_brand_select(brand_id)
    {

      this.grid_images = this.$store.state.render.products.filter(item=>item.brand_id_fk == brand_id);
      console.log(brand_id)
    },
    async send_message(){
      if(this.message.name != ''  && this.message.phone != '' && this.message.message )
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
    get_slides:function () {
      return this.$store.state.render.slides;
    },
    get_brands:function () {
      return this.$store.state.render.brands;
    },
    get_products:function () {
      return this.$store.state.render.products;
    },
    get_path:function () {
      return this.$route.path;
    },
    get_settings:function () {
      return this.$store.state.render.settings;
    }

  },
  watch:{
    get_slides:function (new_slides) {
      this.slides = new_slides;
      this.loaded = true;
    },
    get_brands:function (new_brands) {
      this.brands = new_brands;
      this.loaded = true;
      setTimeout(this.filter_images_products_by_brand_select(new_brands[0].brand_id),2000);

    },
    get_products:function (new_products) {
      this.products = new_products;
      this.loaded = true;

    },
    get_path:function (new_path) {

    },
    get_settings:function (new_settings) {
      this.settings = new_settings;
    }


  },



}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
  .cover-img{
    transition: 0.5s linear;
    overflow: hidden;
  }
  .grid-img{
    transition: 0.3s linear;
    cursor: pointer;
  }
  .grid-img:hover{
    transform: scale(1.2);
  }


  .myimg{
    animation: mymove .9s ;
  }
  @keyframes mymove {
    0%{
      transform: scale(1.5) ;
    }
    100% {
      transform: scale(1);
    }
  }

  .cover-box-text{
    width: 100%;
    height: 100%;
    position: relative;

  }
  .box-text{
    width: 40%;
    height: 200px;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);

  }
.slide-label{
  margin: auto;
  font-size: 50px;
  animation: mt500 .5s ;
  font-family:Cairo !important;

}

  .slide-text
  {
    overflow: hidden;
    font-size: 20px;
    height: 80px;
    animation: mt500 .9s ;
    background-color: rgba(255,252,248,0.4);
    font-family: Cairo !important;
  }

  .slide-button{
    animation: mt500 1s ;
  }

  @keyframes mt500 {
    0%{
      margin-top: 500px;
    }
    100% {
      margin-top: 0px;
    }
  }
  .v-slide-group__content
  {

  }

</style>
