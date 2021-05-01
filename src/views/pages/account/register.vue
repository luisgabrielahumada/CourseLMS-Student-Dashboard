<script>
import { required, email } from "vuelidate/lib/validators";
import axios from 'axios'

import {
  authMethods,
  authFackMethods,
  notificationMethods
} from "@/state/helpers";
export default {
  data() {
    return {
      user: { username: "", email: "", password: "", resetpassword : "", phone : "", male : "", biotic : "", school : "", science : "", literary : "" },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
      colorOptions: [
          { text: "Option nr 1", value: "Option 1", selected: true },
          { text: "Option nr 2", value: "Option 2" },
          { text: "Option nr 3", value: "Option 3" },
          { text: "Option nr 4", value: "Option 4" },
          { text: "Option nr 5", value: "Option 5" }
        ]
    };
  },
  components: {
    },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  validations: {
    user: {
      username: { required },
      email: { required, email },
      password: { required },
      resetpassword : { required },
      city : { required },
      phone : { required },
      male : { required },
      school : { required },
      major : { required },
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToRegister = true;
          // Reset the regError if it existed.
          this.regError = null;
          return (
            this.register({
              email: this.user.email,
              password: this.user.password
            })
              // eslint-disable-next-line no-unused-vars
              .then(token => {
                this.tryingToRegister = false;
                this.isRegisterError = false;
                this.registerSuccess = true;
                if (this.registerSuccess) {
                  this.$router.push(
                    this.$route.query.redirectFrom || { name: "home" }
                  );
                }
              })
              .catch(error => {
                this.tryingToRegister = false;
                this.regError = error ? error : "";
                this.isRegisterError = true;
              })
          );
        } else {
          const { email, username, password, resetpassword, phone, male, school, major, city } = this.user;
          if (email && username && password && resetpassword && phone && male && school && major && city) {
            
          let config = {
              email     : email,
              name      : username,
              password  : password,
              city      : city,
              phone     : phone,
              male      : male,
              school    : school,
              major     : major,
          }

          axios.post(this.$api_host + 'register', config)
            .then((response) => {
              console.log(response)

              if(response.data.success){
                this.tryingToRegister = false;
                this.isRegisterError = false;
                this.registerSuccess = true;

                localStorage.setItem('user', JSON.stringify(response.data.user));
              
                this.$current_user.id = response.data.user.id;
                this.$current_user.name = response.data.user.name;
                this.$current_user.image = response.data.user.image;
                this.$current_user.balance = response.data.user.balance;
                
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || { name: "home" }
                );
              }else{
                this.tryingToRegister = false;
                this.isRegisterError = true;
                this.regError = response.data.message;
              }
            })
            .catch((error) => {
              console.log(error);            
            });
              
          }
        }
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-8">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img src="@/assets/images/logo-dark.png" height="20" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">تسجيل حساب</h4>
                        <p class="text-muted">إنشاء حساب جديد بإستخدام بريدك الإلكتروني وبياناتك</p>
                      </div>

                      <div class="p-2 mt-5">
                        <b-alert
                          v-model="registerSuccess"
                          class="mt-3"
                          variant="success"
                          dismissible
                        >Registration successfull.</b-alert>

                        <b-alert
                          v-model="isRegisterError"
                          class="mt-3"
                          variant="danger"
                          dismissible
                        >{{regError}}</b-alert>

                        <b-alert
                          variant="danger"
                          class="mt-3"
                          v-if="notification.message"
                          show
                          dismissible
                        >{{notification.message}}</b-alert>
                                                
                      </div>


                        <form class="form-horizontal" @submit.prevent="tryToRegisterIn">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-user-2-line auti-custom-input-icon"></i>
                                <label for="username">الأسم الكامل</label>
                                <input
                                  v-model="user.username"
                                  type="text"
                                  class="form-control"
                                  id="username"
                                  :class="{ 'is-invalid': submitted && $v.user.username.$error }"
                                  placeholder="Enter Full Name"
                                />
                                <div
                                  v-if="submitted && !$v.user.username.required"
                                  class="invalid-feedback"
                                >Username is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-mail-line auti-custom-input-icon"></i>
                                <label for="useremail">البريد الألكتروني</label>
                                <input
                                  v-model="user.email"
                                  type="email"
                                  class="form-control"
                                  id="useremail"
                                  placeholder="Enter email"
                                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                                />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                  <span v-if="!$v.user.email.required">Email is required.</span>
                                  <span v-if="!$v.user.email.email">Please enter valid email.</span>
                                </div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                <label for="userpassword">كلمة المرور</label>
                                <input
                                  v-model="user.password"
                                  type="password"
                                  class="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  :class="{ 'is-invalid': submitted && $v.user.password.$error }"
                                />
                                <div
                                  v-if="submitted && !$v.user.password.required"
                                  class="invalid-feedback"
                                >Password is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                <label for="resetpassword">اعادة كلمة المرور</label>
                                <input
                                  v-model="user.resetpassword"
                                  type="password"
                                  class="form-control"
                                  id="resetpassword"
                                  placeholder="Enter password again"
                                  :class="{ 'is-invalid': submitted && $v.user.resetpassword.$error }"
                                />
                                <div
                                  v-if="submitted && !$v.user.resetpassword.required"
                                  class="invalid-feedback"
                                >Password is required again.</div>
                              </div>
                            </div>

                            <div class="col-lg-6">

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-smartphone-line auti-custom-input-icon"></i>
                                <label for="phone">رقم الهاتف</label>
                                <input
                                  v-model="user.phone"
                                  type="text"
                                  class="form-control"
                                  id="phone"
                                  :class="{ 'is-invalid': submitted && $v.user.phone.$error }"
                                  placeholder="Enter Phone number"
                                />
                                <div
                                  v-if="submitted && !$v.user.phone.required"
                                  class="invalid-feedback"
                                >Phone Number is required.</div>
                              </div>
                              
                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-bank-fill auti-custom-input-icon"></i>
                                <label for="male">المنطقة</label>
                                <input
                                  v-model="user.city"
                                  type="text"
                                  class="form-control"
                                  id="city"
                                  :class="{ 'is-invalid': submitted && $v.user.city.$error }"
                                  placeholder="Enter Male"
                                />
                                <div
                                  v-if="submitted && !$v.user.city.required"
                                  class="invalid-feedback"
                                >City is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class=" ri-men-line auti-custom-input-icon"></i>
                                <label for="male">الجنس</label>
                                <select id="major" class="form-control" v-model="user.male">
                                  <option value="1" selected>ذكر</option>
                                  <option value="0">أنثى</option>
                                </select>
                                <div
                                  v-if="submitted && !$v.user.male.required"
                                  class="invalid-feedback"
                                >Male is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class=" ri-building-4-line auti-custom-input-icon"></i>
                                <label for="school">المدرسة</label>
                                <input
                                  v-model="user.school"
                                  type="text"
                                  class="form-control"
                                  id="school"
                                  :class="{ 'is-invalid': submitted && $v.user.school.$error }"
                                  placeholder="Enter School"
                                />
                                <div
                                  v-if="submitted && !$v.user.school.required"
                                  class="invalid-feedback"
                                >School is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class=" ri-edit-line auti-custom-input-icon"></i>
                                <label for="major">أختر الفرع</label>
                                <select id="major" class="form-control" v-model="user.major">
                                  <option selected>أختر الفرع</option>
                                  <option value="Science">علمي</option>
                                  <option value="Literary">أدبي</option>
                                  <option value="Biotic">أحيائي</option>
                                </select>
                                
                                <div
                                  v-if="submitted && !$v.user.major.required"
                                  class="invalid-feedback"
                                >Major is required.</div>
                              </div>
                            </div>

                            <div class="col-lg-12">
                              <div class="text-center">
                                <button
                                  class="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                >تسجيل</button>
                              </div>
                            </div>
                          </div>
                        </form>

                      

                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          للتسجيل انت توافق على شروط الموجودة
                          <a
                            href="#"
                            class="text-primary"
                          >Terms of Use</a>
                        </p>
                      </div>
                      
                      <div class="mt-5 text-center">
                        <p>
                          هل لديك حساب بالفعل ؟
                          <router-link
                            tag="a"
                            to="/login"
                            class="font-weight-medium text-primary"
                          >تسجيل دخول</router-link>
                        </p>
                        <p>
                          © 2021 TECH. Crafted with
                          <i class="mdi mdi-heart text-danger"></i> by DEV
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.authentication-page-content{
  height:auto;
}
</style>