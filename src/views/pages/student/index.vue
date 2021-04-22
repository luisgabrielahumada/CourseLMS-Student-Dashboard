<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";

/**
 * Cards component
 */
export default {
  page: {
    title: "Cards",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout },
  data() {
    return {
      title: "Cards",
    };
  }
};
</script>

<template>
  <Layout>
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
                to="/"
                class="btn btn-primary btn-block">Free Courses</router-link>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>