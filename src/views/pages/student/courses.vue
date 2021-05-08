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
    title: "الدورة",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader},
  data() {
    return {
      courses: [],
      title : "الدورة"
    };
  },

  async mounted() {
    let teacher_id = this.$route.params.teacher;
    var config;

    if(teacher_id !=0) 
      config = {
        params: {
          teacher_id: teacher_id,
          category_id : this.$route.params.category,
        },
      }
    else{
      config = {
        params: {
          teacher_id: teacher_id,
          search : this.$route.params.category,
        },
      }
    }

    axios.get(this.$api_host + 'teacher/courses', config)
    .then((response) => {
      this.courses = response.data.courses;  // set the data
      this.courses.forEach(course => {
        course.route = '/course-detail/' + course.id;
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
    <div class="row" v-if='courses'>
      <div v-for="course in courses" :key="course.id" class="col-lg-3 col-md-4 col-sm-6">
        <b-card :img-src="course.image" img-alt="Course image" img-top>
          <b-card-title>
            <h5 class="card-title">{{course.title}}</h5>
          </b-card-title>
          <b-card-text>
            <div v-html="course.short_description">
            </div>
          </b-card-text>
          <router-link :to='course.route' class="btn btn-primary btn-block">تفاصيل الدورة</router-link>
        </b-card>
      </div>
      <!-- end col-->
      
      <div v-if='courses.length == 0'>
        <h4 class="card-title">There are no courses.</h4>
      </div>
    </div>

    <div class="row" v-else>
      Loading....
    </div>
    <!-- end row -->

  </Layout>
</template>