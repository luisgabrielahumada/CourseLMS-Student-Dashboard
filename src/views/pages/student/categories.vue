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
    title: "Categories",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader},
  data() {
    return {
      categories: [],
      title : "Categories"
    };
  },

  created() {
    var teacher_id = this.$route.params.teacher;
    let config = {
      params: {
        teacher_id: teacher_id
      },
    }

    axios.get(this.$api_host + 'all/categories', config)
    .then((response) =>{
      this.categories = response.data.categories;  // set the data
      this.categories.forEach(category => {
        category.route = '/courses/' + teacher_id + '/' + category.id;
      });
    })
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
      <div v-for="category in categories" :key="category.id" class="col-lg-3 col-md-4">
        <b-card :img-src="category.icon" img-alt="Category image" img-top>
          <b-card-title>
            <h5 class="card-title">{{ category.name }}</h5>
          </b-card-title>
          <router-link
                :to='category.route'
                class="btn btn-primary btn-block">Courses</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>