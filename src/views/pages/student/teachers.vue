<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import axios from 'axios'
/**
 * Cards component
 */
export default {
  page: {
    title: "Teachers",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout},
  data() {
    return {
      teachers: []
    };
  },

  async created() {
    const response = await axios.get(this.$api_host + 'all/teachers');  // Load the data from your api url
    this.teachers = response.data.teachers;  // set the data
    this.teachers.forEach(teacher => {
      teacher.route_url = '/categories/' + teacher.user_id;
    });
  }
};
</script>
<template>
  <Layout>
    <div class="row">
      <div v-for="teacher in teachers" :key="teacher.user_id" class="col-lg-3 col-md-4">
        <!-- Simple card -->
        <b-card :img-src="teacher.image" img-alt="Teachers image" img-top>
          <b-card-title>
            <h5 class="card-title">{{ teacher.name }}</h5>
          </b-card-title>
          <a :href="teacher.route_url" class="btn btn-primary btn-block">Teacher Page</a>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>