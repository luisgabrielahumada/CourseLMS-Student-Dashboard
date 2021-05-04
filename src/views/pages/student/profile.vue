<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from 'axios'

/**
 * Profile Component
 */
export default {
  page: {
    title: "Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Profile",
      user: {},
    };
  },

  created(){
    axios.get(this.$api_host + 'user/profile')
    .then((response)=>{
      this.user = response.data.user;
    })
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });
  },

  methods : {
    saveProfile(){
      let config = {
        email     : this.user.email,
        name      : this.user.name,
        city      : this.user.city,
        phone     : this.user.phone,
        male      : this.user.male,
        school    : this.user.school,
        major     : this.user.major,
      }
      
      axios.post(this.$api_host + 'user/updateProfile', config)
      .then((response)=>{
        this.user = response.data.user;
        console.log("this.user : ", this.user);
        this.$bvToast.toast(response.data.message, {
          title: `Update profile`,
          variant: 'primary',
          solid: true
        });
      })
      .catch((error)=>{
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
      });
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
                  <label class="col-md-3 col-form-label" for="userName">User name</label>
                  <div class="col-md-9">
                    <input
                      id="username"
                      type="text"
                      class="form-control"
                      v-model='user.name'
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="email">Email</label>
                  <div class="col-md-9">
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      v-model="user.email"
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="phone">Phone</label>
                  <div class="col-md-9">
                    <input
                      id="phone"
                      type="phone"
                      class="form-control"
                      v-model="user.phone"
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="male">Male</label>
                  <div class="col-md-9">
                    <select id="male" class="form-control" v-model="user.male">
                      <option value="1" selected>ذكر</option>
                      <option value="0">أنثى</option>
                    </select>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="city">City</label>
                  <div class="col-md-9">
                    <input
                      id="city"
                      type="text"
                      class="form-control"
                      v-model="user.city"
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="school">School</label>
                  <div class="col-md-9">
                    <input
                      id="school"
                      type="text"
                      class="form-control"
                      v-model="user.school"
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="major">أختر الفرع</label>
                  <div class="col-md-9">
                    <select id="major" class="form-control" v-model="user.major">
                      <option selected>أختر الفرع</option>
                      <option value="Science">علمي</option>
                      <option value="Literary">أدبي</option>
                      <option value="Biotic">أحيائي</option>
                    </select>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <b-button variant="primary" class=" text-center" v-on:click='saveProfile()'>
                    Save Profile
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