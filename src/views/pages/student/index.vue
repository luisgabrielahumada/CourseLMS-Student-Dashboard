<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import axios from 'axios'

/**
 * Cards component
 */
export default {
  page: {
    title: "Home",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Home",
      articles : [
        { 
          'title' : 'How to subscribe',
          'text' : 'For public courses, you can purchase a card from the points of sale page inside the app.',
          'date' : '2020-08-23 05:04',
        },
        {
          'title' : 'Answers to the questions asked',
          'text' : 'The presentation of the lectures and files will begin on January 8, God willing. ',
          'date' : '2021-04-29 12:01',
        }
      ],
      blogs : [],
      slider2 : [],
    };
  },

  created(){
    let config = {
      params: {
        id : 1
      }
    }

    axios.get(this.$api_host + 'blogs')
    .then((response)=>{
      this.blogs = response.data.blogs;
      this.blogs.forEach((element) =>{
        element.created_at = this.toUTCDate(element.created_at);
      });
      if(this.blogs.length == 1)
        this.blogs.push(this.blogs[0]);
    })
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });

    axios.get(this.$api_host + 'main/sliders', config)
    .then((response)=>{
      this.slider2 = response.data.slider;
    })
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row home-pc">
      <div class="col-md-6 col-xl-4">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
            class="rounded-circle mr-2 "
            alt=""
            width="200"
            height="200"
            src="@/assets/images/student/teachers.jpg"
            data-holder-rendered="true"
          />
          <router-link
                to="/teachers"
                class="btn btn-primary btn-block mt-3">المدرسين</router-link>
        </b-card>
      </div>
      <!-- end col -->

      
      <!-- end col -->

      <div class="col-md-6 col-xl-4">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
              class="rounded-circle mr-2 "
              alt=""
              width="200"
              height="200"
              src="@/assets/images/student/schools.jpg"
              data-holder-rendered="true"
            />
          <router-link
                to="/"
                class="btn btn-primary btn-block mt-3">المدارس</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-md-6 col-xl-4">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
              class="rounded-circle mr-2 "
              alt=""
              width="200"
              height="200"
              src="@/assets/images/student/courses.jpg"
              data-holder-rendered="true"
            />
          <router-link
                to="/mycourses"
                class="btn btn-primary btn-block mt-3">أشتراكاتي</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

    <div class="row home-mobile">
      <div class="col-4 text-center">
        <img
              class="rounded-circle mr-2 "
              alt=""
              width="100"
              height="100"
              src="@/assets/images/footericon/teacher.png"
              data-holder-rendered="true"
            />
        <router-link to="/teachers">
         
          <div class="icon-title">المدرسين</div>
        </router-link>
      </div>

      

      <div class="col-4 text-center">
        <router-link to="/teachers">
          <img
              class="rounded-circle mr-2 "
              alt=""
              width="100"
              height="100"
              src="@/assets/images/footericon/school.png"
              data-holder-rendered="true"
            />
          <div class="icon-title">المدارس</div>
        </router-link>
      </div>

      <div class="col-4 text-center">
        <router-link to="/mycourses">
          <img
              class="rounded-circle mr-2 "
              alt=""
              width="100"
              height="100"
              src="@/assets/images/footericon/video.png"
              data-holder-rendered="true"
            />
          <div class="icon-title">أشتراكاتي</div>
        </router-link>
      </div>
    </div>

    <!-- Articles Categories -->
    <div class="row">
      <div class="col-md-6" v-for='blog in articles' :key='blog.title'>
         <b-card no-body>
          <b-row no-gutters class="align-items-center">
            <b-col md="4">
              <img src="@/assets/images/small/img-2.jpg" class="rounded-0 card-img"/>
            </b-col>
            <b-col md="8">
              <b-card-body>
                <b-card-title>
                  <h4 class="card-title">{{ blog.title }}</h4>
                </b-card-title>
                <b-card-text>{{ blog.text}}</b-card-text>
                <p class="card-text">
                  <small class="text-muted">{{blog.date}}</small>
                </p>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>

    <!-- Blog Slider Area -->
    <div class="row">
       <div class="col-lg-8 col-centered">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">مقالات</h4>
            <!-- <p class="card-title-desc">
              Add captions to your slides easily with the
              <code>.carousel-caption</code> element within any
              <code>.carousel-item</code>.
            </p> -->
            <b-carousel
              id="carousel-1"
              :interval="3000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- Slides with custom text -->
              <b-carousel-slide v-for='(item, index) in blogs' :key='index' :img-src="item.img" >
                <h5 class="text-white">{{ item.title }}</h5>
                <p class="text-white-50" v-html="item.body"></p>
              </b-carousel-slide>

            </b-carousel>
          </div>
        </div>
      </div>
    </div>

    <!--  Blog Category Slider Area -->
    <div class="row">
       <div class="col-lg-8 col-centered">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">أخر الأخبار</h4>
            <b-carousel
              id="carousel-1"
              :interval="3000"
              controls
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
            >
              <!-- Slides with custom text -->
              <b-carousel-slide v-for='(item, index) in slider2' :key='index' :img-src="item.image" >
                <h5 class="text-white">{{ item.title }}</h5>
                <p class="text-white-50">{{ item.sub_title }}</p>
              </b-carousel-slide>

            </b-carousel>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>

<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
}



@media screen and (max-width: 768px) {
  .home-pc{
    display:none;
  }
  .home-mobile{
    display: flex;
  }
  img.rounded-circle.mr-2 {
    background-color: #fffdfa;
    width: 100px;
}

.icon-title {
    font-size: 15px;
    font-weight: bold;
    text-shadow: 0px 0px 1px #f0f5f5;
}
}

@media screen and (min-width:769px){
  .home-pc{
    display: flex;
  }
  .home-mobile{
    display: none;
  }

  
}
</style>