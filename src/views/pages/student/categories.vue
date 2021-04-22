<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import axios from 'axios'
/**
 * Cards component
 */
export default {
  page: {
    title: "Categories",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout},
  data() {
    return {
      categories: []
    };
  },

  async created() {
    var teacher_id = this.$route.params.teacher;
    let config = {
      params: {
        teacher_id: teacher_id
      },
    }
    const response = await axios.get(this.$api_host + 'all/categories', config);  // Load the data from your api url
    
    this.categories = response.data.categories;  // set the data
    this.categories.forEach(category => {
      category.route = '/courses/' + teacher_id + '/' + category.id;
    });
  }
};
</script>
<template>
  <Layout>
    <div class="row">
      <div v-for="category in categories" :key="category.id" class="col-lg-3 col-md-4">
        <b-card :img-src="category.icon" img-alt="Category image" img-top>
          <b-card-title>
            <h5 class="card-title">{{ category.name }}</h5>
          </b-card-title>
          <a :href="category.route" class="btn btn-primary btn-block">Course Page</a>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>