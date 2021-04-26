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
    title: "Courses",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader},
  data() {
    return {
      courses: [],
      title : "Courses"
    };
  },

  async mounted() {
    let config = {
      params: {
        teacher_id: this.$route.params.teacher,
        category_id : this.$route.params.category,
      },
    }
    const response = await axios.get(this.$api_host + 'teacher/courses', config);  // Load the data from your api url
    this.courses = response.data.courses;  // set the data
    this.courses.forEach(course => {
      course.route = '/course-detail/' + course.id;
    });
  }
};
</script>
<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div v-for="course in courses" :key="course.id" class="col-lg-3 col-md-4 col-sm-6">
        <b-card :img-src="course.image" img-alt="Course image" img-top>
          <b-card-title>
            <h5 class="card-title">{{course.title}}</h5>
          </b-card-title>
          <b-card-text>
            <div v-html="course.short_description">
            </div>
          </b-card-text>
          <router-link :to='course.route' class="btn btn-primary btn-block">Course Detail</router-link>
        </b-card>
      </div>
      <!-- end col-->

      <div v-if='courses.sizeof == 0'>
        <h4 class="card-title">There are no courses.</h4>
      </div>

    </div>
    <!-- end row -->

  </Layout>
</template>