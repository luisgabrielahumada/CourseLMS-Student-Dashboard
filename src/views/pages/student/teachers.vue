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
    title: "Teachers",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader},
  data() {
    return {
      title : "Teachers",
      teachers: []
    };
  },

  created() {
    axios.get(this.$api_host + 'all/teachers')
    .then((response) => {
      this.teachers = response.data.teachers;  // set the data
      this.teachers.forEach(teacher => {
        teacher.route_url = '/categories/' + teacher.user_id;
      });
    }).catch((error)=>{
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
      <div v-for="teacher in teachers" :key="teacher.user_id" class="col-lg-3 col-md-4">
        <!-- Simple card -->
        <b-card class="text-center">
          <img :src="teacher.image" alt class="rounded avatar-lg mb-4" />
          <b-card-title>
            <h5 class="card-title">{{ teacher.name }}</h5>
          </b-card-title>
          <router-link
                :to='teacher.route_url'
                class="btn btn-primary btn-block">Categories</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>