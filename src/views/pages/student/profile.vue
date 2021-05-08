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
    title: "الصفحة الشخصية",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "الصفحة الشخصية",
      user: {},
      current_password : '',
      new_password : '',
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
    },

    resetPassword(){
      let config = {
        current_password    : this.current_password,
        new_password        : this.new_password,
      }
      
      axios.post(this.$api_host + 'user/resetPassword', config)
      .then((response)=>{
        if(response.data.success)
          this.$bvToast.toast(response.data.message, {
            title: `Reset Password`,
            variant: 'primary',
            solid: true
          });
        else
          this.$bvToast.toast(response.data.message, {
            title: `Reset Password`,
            variant: 'danger',
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
                  <label class="col-md-3 col-form-label" for="userName">الأسم الكامل</label>
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
                  <label class="col-md-3 col-form-label" for="email">البريد الألكتروني</label>
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
                  <label class="col-md-3 col-form-label" for="phone">رقم الهاتف</label>
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
                  <label class="col-md-3 col-form-label" for="male">الجنس</label>
                  <div class="col-md-9">
                    <select id="male" class="form-control" v-model="user.male">
                      <option value="1" selected>ذكر</option>
                      <option value="0">أنثى</option>
                    </select>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="city">المدينة</label>
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
                  <label class="col-md-3 col-form-label" for="school">المدرسة</label>
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
                    حفظ
                  </b-button>
                </div>

              </div>
              <!-- end col -->
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="current_password">الرقم السري الحالي</label>
                  <div class="col-md-9">
                    <input
                      id="current_password"
                      type="text"
                      class="form-control"
                      v-model='current_password'
                    />
                  </div>
                </div>
  
                <div class="form-group row mb-3">
                  <label class="col-md-3 col-form-label" for="new_password">رقم السري الجديد</label>
                  <div class="col-md-9">
                    <input
                      id="new_password"
                      type="text"
                      class="form-control"
                      v-model='new_password'
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <b-button variant="primary" v-on:click='resetPassword()' >
                    حفظ الرقم السري
                  </b-button>
                </div>
              </div>
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