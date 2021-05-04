<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from 'axios'

/**
 * Message Component
 */
export default {
  page: {
    title: "Message",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Message",
      teachers: {},
      toTeacher: '',
      // subject : '',
      message : ''
    };
  },

  created(){
    axios.get(this.$api_host + 'all/teachers')
    .then((response) => {
      this.teachers = response.data.teachers;  
    }).catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    })
  },

  methods : {
    sendMessage(){
      let config = {
        teacher_id : this.toTeacher,
        message : this.message
      }

      axios.post(this.$api_host + 'teacher/sendMessage', config)
      .then((response) => {
        this.$bvToast.toast(response.data.message, {
          title: `Send Message`,
          variant: 'primary',
          solid: true
        });
      }).catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-md-8 col-centered">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="teacher">Teacher</label>
                  <div class="col-md-9">
                    <select id="teacher" class="form-control" v-model="toTeacher">
                      <option v-for="teacher in teachers" :key='teacher.user_id' :value='teacher.user_id'>{{teacher.name}}</option>
                    </select>
                  </div>
                </div>

                <!-- <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="subject ">Subject</label>
                  <div class="col-md-9">
                    <input
                      id="subject"
                      type="text"
                      class="form-control"
                      v-model='subject'
                    />
                  </div>
                </div> -->

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="message">Message</label>
                  <div class="col-md-9">
                    <textarea
                      id="message"
                      class="form-control"
                      v-model="message"
                      style='height:200px;'
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <b-button variant="primary" class=" text-center" v-on:click='sendMessage()'>
                    Send Message
                  </b-button>
                </div>

              </div>
              <!-- end col -->
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>




<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
}
</style>