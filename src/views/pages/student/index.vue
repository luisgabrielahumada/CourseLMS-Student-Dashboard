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
      blogs : [
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
      ]
    };
  },

  created(){
    axios.get(this.$api_host + 'user/checkAuth')
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    })
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
            class="rounded-circle mr-2"
            alt=""
            width="200"
            height="200"
            src="@/assets/images/student/teachers.jpg"
            data-holder-rendered="true"
          />
          <router-link
                to="/teachers"
                class="btn btn-primary btn-block mt-3">Teachers</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-md-6 col-xl-3">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
              class="rounded-circle mr-2"
              alt=""
              width="200"
              height="200"
              src="@/assets/images/student/universities.jpg"
              data-holder-rendered="true"
            />
          <router-link
                to="/"
                class="btn btn-primary btn-block mt-3">Universities</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-md-6 col-xl-3">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
              class="rounded-circle mr-2"
              alt=""
              width="200"
              height="200"
              src="@/assets/images/student/schools.jpg"
              data-holder-rendered="true"
            />
          <router-link
                to="/"
                class="btn btn-primary btn-block mt-3">Schools</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-md-6 col-xl-3">
        <!-- Simple card -->
        <b-card class="text-center">
          <img
              class="rounded-circle mr-2"
              alt=""
              width="200"
              height="200"
              src="@/assets/images/student/courses.jpg"
              data-holder-rendered="true"
            />
          <router-link
                to="/courses/0/0"
                class="btn btn-primary btn-block mt-3">Free Courses</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-md-6" v-for='blog in blogs' :key='blog.title'>
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

  </Layout>
</template>