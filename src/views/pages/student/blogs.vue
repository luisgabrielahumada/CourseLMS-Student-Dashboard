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
    title: "مقالات",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "مقالات",
      blogs : [],
    };
  },

  created(){
    axios.get(this.$api_host + 'blogs')
    .then((response)=>{
      this.blogs = response.data.blogs;
      this.blogs.forEach((element) =>{
        element.created_at = this.toUTCDate(element.created_at);
        element.route = '/blog/detail/' + element.id;
      });
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
   
    <!-- Articles Categories -->
    <div class="row">
      <div class="col-md-6" v-for='blog in blogs' :key='blog.title'>
         <b-card no-body>
          <router-link :to="blog.route">
            <b-row no-gutters class="align-items-center">
              <b-col md="4">
                <img :src='blog.img' class="rounded-0 card-img"/>
              </b-col>
              <b-col md="8">
                <b-card-body>
                  <b-card-title>
                    <h5 >{{ blog.title }}</h5>
                  </b-card-title>
                  <p class="card-text">
                    <small class="text-muted">{{ blog.created_at}}</small>
                  </p>
                </b-card-body>
              </b-col>
            </b-row>
          </router-link>
        </b-card>
      </div>
    </div>

  </Layout>
</template>

<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
}
</style>