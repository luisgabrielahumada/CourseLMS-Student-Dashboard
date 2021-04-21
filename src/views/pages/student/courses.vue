<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import axios from 'axios'
/**
 * Cards component
 */
export default {
  page: {
    title: "Courses",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout},
  data() {
    return {
      courses: []
    };
  },

  async created() {
    let config = {
      params: {
        teacher_id: this.$route.params.teacher
      },
    }
    const response = await axios.get(this.$api_host + 'teacher/courses', config);  // Load the data from your api url
    this.courses = response.data.courses;  // set the data
    this.courses.forEach(course => {
      course.route = this.$host + 'course/' + course.slug;
    });
  }
};
</script>
<template>
  <Layout>
    <div class="row">
      <div v-for="course in courses" :key="course.user_id" class="col-lg-3 col-md-4 col-sm-6">
        <b-card :img-src="course.image" img-alt="Course image" img-top>
          <b-card-title>
            <h5 class="card-title">{{course.title}}</h5>
          </b-card-title>
          <b-card-text>
            <div v-html="course.short_description">
            </div>
          </b-card-text>
          <a :href="course.route" class="btn btn-primary btn-block">Course Detail</a>
        </b-card>
      </div>
      <!-- end col-->

    </div>
    <!-- end row -->

  </Layout>
</template>