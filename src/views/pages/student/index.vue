<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

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
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/student/teachers.jpg')" img-alt="Teachers image" img-top>
          <!-- <b-card-title>
            <h5 class="card-title">Card title</h5>
          </b-card-title>
          <b-card-text>
            Some quick example text to build on the card title and make
            up the bulk of the card's content.
          </b-card-text> -->
          <router-link
                to="/teachers"
                class="btn btn-primary btn-block">Teachers</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/student/universities.jpg')" img-alt="Universities image" img-top>
          <router-link
                to="/"
                class="btn btn-primary btn-block">Universities</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/student/schools.jpg')" img-alt="Schools image" img-top>
          <router-link
                to="/"
                class="btn btn-primary btn-block">Schools</router-link>
        </b-card>
      </div>
      <!-- end col -->

      <div class="col-lg-6 col-xl-3">
        <!-- Simple card -->
        <b-card :img-src="require('@/assets/images/student/courses.jpg')" img-alt="Free Courses image" img-top>
          <router-link
                to="/courses/0/0"
                class="btn btn-primary btn-block">Free Courses</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>