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
      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card>
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

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card>
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

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card>
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

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card>
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

  </Layout>
</template>