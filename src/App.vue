<template>
  <div id="app">
    <v-app>
      <body  v-if="!$store.state.dashboard"   id="body" class="body-wrapper static">
      <div v-if="$store.state.loading" class="se-pre-con">
        <v-overlay  opacity="1">
          <div style="width: 200px;width: 200px;overflow: hidden;position: relative;border-radius: 50%">
            <div class="div-loading justify-center text-center" style="box-shadow: white 10px 10px 10px;opacity: 0.7;position: absolute;width: 200%;height: 20px;background-color: white;z-index: 9999;transform: rotate(0deg)"></div>

            <div  style="overflow: hidden;background-color: white;height: 200px;width: 200px;border-radius: 50%;padding: 10px;">
              <v-img :src="require('@/assets/logo.png')"></v-img>
            </div>
          </div>


        </v-overlay>
      </div>
      <div  class="main-wrapper">
        <!-- HEADER -->
        <header  id="pageTop" class="header">

          <!-- TOP INFO BAR -->
          <div class="top-info-bar">
            <div class="container pa-0" style="padding: 0px !important;">
              <div class="top-bar-right">
                <ul :style="$vuetify.rtl?'direction: ltr':'direction: ltr'">
                  <li :class="$vuetify.rtl?'float-left':'float-right'" style="margin-right: 5px;margin-left: 5px"><a :href="'mailto:'+settings[0].website_email" :style="$vuetify.breakpoint.xs?'color: white;font-size: 10px !important;':'color: white;'"><i class="fa fa-envelope" aria-hidden="true"></i>{{settings[0].website_email}}</a></li>
                  <li :class="$vuetify.rtl?'float-left':'float-right'" style="margin-right: 5px;margin-left: 5px"><a :href="'tel:'+settings[0].website_phone"  :style="$vuetify.breakpoint.xs?'color: white;font-size: 10px !important;':'color: white;'"><i class="fa fa-phone" aria-hidden="true"></i>{{settings[0].website_phone}}</a></li>
                  <li  :class="$vuetify.rtl?'float-left':'float-right'" class="mt-1" >
                    <v-btn style="color: white;margin-right: 3px;margin-left: 3px" text @click="$store.state.ui.lang_ar = !$store.state.ui.lang_ar;$vuetify.rtl=!$vuetify.rtl ">{{$store.state.ui.lang_ar?'EN':'AR'}}</v-btn>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- NAVBAR -->
          <nav class="navbar navbar-expand-md main-nav navbar-light">
            <div class="container">

              <button class="navbar-toggler" style="position: static;margin: 10px" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>

              <a :class="$vuetify.breakpoint.xs?'navbar-brand pa-4':'navbar-brand'" href="/"><img style="transform: scale(1.5)" data-src="./assets/logo.png" src="./assets/logo.png" alt="logo"></a>

              <div class="collapse navbar-collapse" id="navbarSupportedContent" :style="$vuetify.rtl?'direction: ltr':'direction: rtl'">
                <ul class="navbar-nav"  style="border: 0px">
                  <!-----HOME ---->
                  <li class="nav-item ">
                    <a class="nav-link f-cairo20b" style="font-size: 20px !important;">
                      <a href="/">
                        {{$store.state.ui.lang_ar?'الرئيسية':'HOME'}}
                        <span class="sr-only">(current)</span>
                      </a>
                    </a>
                  </li>

                  <!-----BRANDS ---->
                  <li class="nav-item dropdown ">
                    <a style="font-size: 20px !important;color: #e61990" class="nav-link dropdown-toggle  f-cairo20b" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="javascript:void(0)">
                      <span class="my-a">{{$store.state.ui.lang_ar?'الماركات':'BRANDS'}}</span>
                    </a>
                    <ul class="dropdown-menu">
                      <li v-for="li in brands" :key="li.brand_id" @click="go_to_brand(li.brand_id)" ><a>
                        <div v-if="$store.state.ui.lang_ar">{{li.brand_name_ar}}</div>
                        <div v-if="!$store.state.ui.lang_ar">{{li.brand_name_en}}</div>
                      </a></li>
                    </ul>
                  </li>
                  <!-----PRODUCTS ---->
                  <li  class=" dropdown megaDropMenu nav-item " >
                    <a style="font-size: 20px !important;" class="nav-link  f-cairo20b" >
                      <router-link to="/products">{{$store.state.ui.lang_ar?'المنتجات':'PRODUCTS'}}</router-link>
                    </a>

                  </li>
                  <!-----CONTACT US ---->
                  <li class="nav-item dropdown ">
                    <a style="font-size: 20px !important;" class="nav-link  f-cairo20b" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
                     <router-link to="/about-us"> {{$store.state.ui.lang_ar?'من نحن':'ABOUT US'}}</router-link>
                    </a>

                  </li>

                </ul>
              </div>

              <!--            <div class="cart_btn">-->
              <!--&lt;!&ndash;              <a href="cart.html"><i class="fa fa-shopping-basket" aria-hidden="true"></i><span class="badge">0</span></a>&ndash;&gt;-->
              <!--           -->
              <!--            </div>-->
              <!-- header search ends-->
            </div>
          </nav>

        </header>
      </div>
      </body>
      <router-view/>

      <!-- FOOTER -->
      <footer v-if="!$store.state.dashboard" style="background-image: url(img/home/footer-bg.jpg);">
        <!-- BACK TO TOP BUTTON -->
        <a v-if="path == '/'" href="#pageTop" class="backToTop"><i class="fa fa-angle-up" aria-hidden="true"></i></a>
        <!-- FOOTER INFO -->
        <div class="clearfix footerInfo">
          <div class="container">
            <div class="row">
              <div class="col-sm-3 col-xs-12">
                <div class="footerText">
                  <a  class="footerLogo">
                    <a href="/">
                      <v-img :src="require('@/assets/logo.png')"></v-img>
                    </a>


                  </a>
                </div>
              </div>
              <div class="col-sm-3 col-xs-12 paddingLeft">
                <div class="footerInfoTitle">
                  <h4 class="text-center" v-if="!$store.state.ui.lang_ar">Our Partners</h4>
                  <h4 class="text-center" v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;font-size: 18px">شركائنا</h4>
                </div>
                <v-divider/>
                <div class="useLink">
                  <ul v-if="loaded" class="list-unstyled" style="direction: rtl">
                    <li><a  target="_blank" :href="settings[0].web1 | generate_http">
                      {{settings[0].web1 | remove_http}}
                      <i class="fa fa-circle" aria-hidden="true"></i>
                    </a></li>
                    <li><a  target="_blank" :href="settings[0].web2 | generate_http">
                      {{settings[0].web2 | remove_http}}
                      <i class="fa fa-circle" aria-hidden="true"></i>
                    </a></li>
                    <li>
                      <a  target="_blank" :href="settings[0].web3 | generate_http">
                      {{settings[0].web3 | remove_http}}
                      <i class="fa fa-circle" aria-hidden="true"></i>
                    </a></li>
                    <li><a target="_blank" :href="settings[0].web4 | generate_http">
                      {{settings[0].web4 | remove_http}}
                      <i class="fa fa-circle" aria-hidden="true"></i>
                    </a></li>
                    <li><a target="_blank" :href="settings[0].web5 | generate_http">
                      {{settings[0].web5 | remove_http}}
                      <i class="fa fa-circle" aria-hidden="true"></i>
                    </a></li>

                  </ul>
                </div>
              </div>
              <div class="col-sm-3 col-xs-12">
                <div class="footerInfoTitle">
                  <h4 class="text-center" v-if="!$store.state.ui.lang_ar" style="font-size: 18px;font-weight: normal !important;">Products</h4>
                  <h4 class="text-center" v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;font-size: 18px">المنتجات</h4>

                </div>
                <v-divider/>
                <div class="footerGallery row">

                  <div class="col-4 col-md-6 col-lg-4 mb-3 mb-md-0" v-for="(pp,i) in $store.state.render.products" :key="'img_in_footer'+pp.product_id" >
                    <div v-if="i < 9">
                      <a >
                        <img @click="$store.state.target_product = pp; $store.state.view = true"  :src="$axios.defaults.baseURL+'/images/'+ pp.product_image"  alt="gallery-img">
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              <div class="col-sm-3 col-xs-12" style="direction: ltr">
                <div class="footerInfoTitle">
                  <h4 class="text-center" v-if="!$store.state.ui.lang_ar">Social Media</h4>
                  <h4 class="text-center" v-if="$store.state.ui.lang_ar" style="font-family: Cairo !important;font-size: 18px">مواقع التواصل الاجتماعي</h4>
                </div>
                <v-divider/>

                <div class="footerText">
                  <v-row justify="center">
                    <v-col cols="12" v-for="social in socials" :key="'soc_'+social.id">
                      <v-btn :href="social.url" text class="d-inline-block float-left">
                        <v-icon :color="social.color" large>{{social.icon}}</v-icon>
                        <span style="font-family: Cairo;font-weight: bold;margin-left: 5px">{{social.title}}</span>
                      </v-btn>
                    </v-col>


                  </v-row>




                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- COPY RIGHT -->
        <div class="clearfix copyRight">
          <div class="container">
            <div class="row justify-center">
              <div class="col-md-7" style="direction: ltr">
                <div class="copyRightText">
                  <p style="text-align: center;font-family: Cairo" v-if="!$store.state.ui.lang_ar">&copy; 2022 Copyright <a target="_blank" href="http://www.pasma4tech.com"><b>PASMA</b></a></p>
                  <p style="text-align: center;font-family: Cairo" v-if="$store.state.ui.lang_ar">&copy; 2022 جميع الحقوق محفوظة لشركة <a target="_blank" href="http://www.pasma4tech.com"><b>البصمة</b></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>0
        <ViewBrands/>
      </footer>
    </v-app>

  </div>



</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
.nav-item:hover a{
  color: black;
}

  .my-a:hover{
    color: black !important;
  }
  .f-cairo20b{
    font-family: Cairo;
    font-size: 20px;
  }
  .f-cairo18{
    font-family: Cairo;
    font-size: 18px;
  }

  /* Paste this css to your style sheet file or under head tag */
  /* This only works with JavaScript,
  if it's not present, don't show loader */
  .no-js #loader {
    display: none;
  }

  .js #loader {
    display: block;
    position: absolute;
    left: 100px; top: 0;
  }

  .se-pre-con {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
   }
  .v-input{
    font-size: 33px;
  }
  .div-loading{
    animation: loading infinite 1.5s;
  }
  @keyframes loading {
    from{
      margin-top: 0px;
      margin-right: 0px;
    }
    to{
      margin-top: 300px;
      margin-right: 300px;
    }
  }

</style>

<script>
  import ViewBrands from "@/components/visitor/ViewBrands";
  export default {
    components:{
      ViewBrands
    },
    filters:{
      remove_http: function (str) {
        try{
          var str2 =  str.split("//");
          if(str2.length > 0 )
          {
            if(str2[1] == undefined)
            {
              return str;
            }
            return str2[1];
          }
        }catch (e) {
          console.log(e)
        }
        return str;
      },
      generate_http: function (str) {
        try{
          var str2 =  str.split("//");
          if(str2.length > 0 )
          {
            if(str2[1] == undefined)
            {
              return 'http://'+str;
            }
            return str;
          }
        }catch (e) {
          console.log(e)
        }
        return str;
      },

    },
    data(){
      return{
        loaded:false,
        dashboard:false,
        brands:this.$store.state.render.brands,
        socials:this.$store.state.render.socials,
        path:this.$route.path,
        settings: [
          {
            website_email: '',
            website_phone:'',
            address:''

          }
        ]
      }
    },
    methods:{
      go_to_brand(brand_id)
      {
        this.$store.state.target_brand = brand_id;
        this.$router.push("/products");
      },
      check_url(){

        if(this.$route.path.split('dashboard').length > 1 )
        {
          this.$store.state.dashboard = true;
          console.log("dash")
          console.log(this.$route.path.split('dashboard'))
        }else{
          this.$store.state.dashboard = false;
          console.log("not dash")
        }
      },
      render(){
        this.$store.state.loading = true;
        this.$axios.get('api/render')
        .then(res=>{
          this.$store.state.render.slides = res.data.slides;
          this.$store.state.render.brands = res.data.brands;
          this.$store.state.render.products = res.data.products;
          this.$store.state.render.settings = res.data.settings;
          this.$store.state.render.socials = res.data.socials;
          this.$store.state.loading = false;
          this.loaded = true;
          console.log(res.data)
        })
      }
    },
    created(){
      this.check_url();
      console.log("ch");
      this.$store.state.ui.lang_ar = true;
      this.$vuetify.rtl = false;
      this.render();
    },
    computed:{
      get_url:function () {
        return this.$route.path;
      },
      get_brands:function () {
        return this.$store.state.render.brands;
      },
      get_settings:function () {
        return this.$store.state.render.settings;
      },
      get_socials:function () {
        return this.$store.state.render.socials;
      },
      get_dir:function () {
        return this.$store.state.ui.lang_ar
      }


    },
    watch:{
      get_url:function (new_route) {
        if(new_route =="/")
        {
          this.path = "/";
          window.location.reload();
        }else{
          this.path = ".";
        }
        if(new_route.splite('/')[1] == 'dashboard')
        {
          this.$store.state.dashboard = true;
        }
      },
      get_brands:function (new_brands) {
        this.brands = new_brands;
      },
      get_settings:function (new_settings) {
        this.settings = new_settings;
      },
      get_socials:function (new_socials) {
        this.socials = new_socials;
      },
      get_dir:function (ar_lang) {
        if(ar_lang == true)
        {
          this.$vuetify.rtl = false;
        }else{
          this.$vuetify.rtl = true;
        }
      }
    }
  }
</script>


