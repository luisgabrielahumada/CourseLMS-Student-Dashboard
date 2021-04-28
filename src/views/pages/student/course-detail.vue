<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import axios from 'axios'

/**
 * Course Detail Component
 */
export default {
  page: {
    title: "Course Detail",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      course: undefined,
      title: "Course Detail",
      coupon_code : '',
      modal_buy : false
    };
  },

  created() {
    let config = {
      params: {
        course_id: this.$route.params.course,
      },
    }
    axios.get(this.$api_host + 'course/detail', config)
    .then((response) => {
      this.course = response.data.course;
    })
    .catch((error)=>{
      this.closeBuyDialog();
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    })
  },
  
  methods: {
    /**
     * Selected image shows
     */
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
    },

    applyCoupon(){
      let config = {
        course_id: this.course.id,
        code    : this.coupon_code,
      }
      axios.post(this.$api_host + 'coupon/apply', config)
      .then((response) =>{
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: `Buy Course with Coupon`,
            variant: 'primary',
            solid: true
          });
          this.downloadUserDetail();
          this.course.enrollment_id = response.data.enrollment_id;          
          this.closeBuyDialog();
        }else{
          this.$bvToast.toast(response.data.message, {
            title: `Buy Course with Coupon`,
            variant: 'danger',
            solid: true
          });
          this.closeBuyDialog();
        }
      }).catch((error)=>{
        this.closeBuyDialog();
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
      })
    },

    buyWithWallet(){
      let config = {
        course_id: this.course.id
      }

      axios.post(this.$api_host + 'course/buyWallet', config)
      .then((response) => {
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: `Buy Course with Wallet`,
            variant: 'primary',
            solid: true
          });
          this.downloadUserDetail();
          this.course.enrollment_id = response.data.enrollment_id;
          this.closeBuyDialog();
        }else{
          this.$bvToast.toast(response.data.message, {
            title: `Buy Course with Wallet`,
            variant: 'danger',
            solid: true
          });
          this.closeBuyDialog();
        }
      })
      .catch((error)=>{
        this.closeBuyDialog();
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
      })
    },

    closeBuyDialog() {
      this.modal_buy = false;
    },

    playVideoPC(data){
      var element = document.createElement('a');
      // element.setAttribute('href', 'iqacademyplayer://video/?url=' + data);
      element.setAttribute('href', 'courselmsvideoplayer://video/?user=' + this.$current_user.id + '&class=' + data);
      element.click();
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-lg-12" v-if="course">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4">
                <div class="product-detail">
                  <div class="row">                    
                    <div class="product-img">
                      <img
                        id="expandedImg"
                        :src="course.image"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                  </div>
                </div>
                    
                <div class="row text-center mt-2 container_buy" v-if='!course.enrollment_id'>
                  <b-button v-b-modal.modal-buy variant="primary" class="btn-block">
                    <i class="mdi mdi-shopping mr-2"></i>Buy now
                  </b-button>
                  <b-modal header-class="modal-header-enough" v-model="modal_buy" title-class="font-18" id="modal-buy" hide-footer 
                    v-if="Number(this.$current_user.balance) >= Number(course.price)">
                    <template #modal-header>Your current balance ({{ balanceWithDollar() }}) is enough</template>
                    <div class="text-center modal-content-buy">
                      Direct payment from the balance
                      <p>
                        <button
                          type="button"
                          class="btn btn-primary waves-effect waves-light mt-3 mr-1"
                          v-on:click='buyWithWallet()'>
                          Buy with Wallet
                        </button>
                      </p>
                      Or with new Coupon Code
                      <b-form-group
                        id="example text"
                        label-cols-sm="2"
                        label-cols-lg="2"
                        label="Coupon"
                        label-for="coupon_code"
                        class="mt-3"
                      >
                        <b-form-input for="coupon_code" v-model="coupon_code" placeholder="Enter Coupon code"></b-form-input>
                      </b-form-group>
                      <p>
                        <button
                          type="button"
                          class="btn btn-primary waves-effect waves-light mt-3 mr-1"
                          v-on:click='applyCoupon()'>
                          Apply Coupon
                        </button>
                      </p>
                    </div>
                  </b-modal>

                  <b-modal header-class="modal-header-less" id="modal-buy" hide-footer 
                    v-else>
                    <template #modal-header>Your current balance ({{ balanceWithDollar() }}) is not enough</template>
                      <div class="text-center modal-content-buy">
                        Buy with new Coupon Code
                        <b-form-group
                          id="example text"
                          label-cols-sm="2"
                          label-cols-lg="2"
                          label="Coupon"
                          label-for="coupon_code"
                          class="mt-3"
                        >
                          <b-form-input for="coupon_code" v-model="coupon_code" placeholder="Enter Coupon code"></b-form-input>
                        </b-form-group>
                        <p>
                          <button
                            type="button"
                            class="btn btn-primary waves-effect waves-light mt-3 mr-1"
                            v-on:click='applyCoupon()'>
                            Apply Coupon
                          </button>
                        </p>
                      </div>
                  </b-modal>
                  
                </div>
                <!-- end product img -->
              </div>
              <div class="col-lg-4">
                <div class="mt-4 mt-xl-3">
                  <a href="#" class="text-primary">{{course.category.name}}</a>
                  <h5 class="mt-1 mb-3">{{course.title}}</h5>

                  <h5 class="mt-2" v-if='!course.is_private'>
                    {{ convertWithDollar(course.price)}}
                  </h5>
                  <p
                    class="mt-3"
                    v-html="course.short_description"></p>
                  <p class="card-title-desc alert alert-danger">{{course.requirement}}</p>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="">
                  <div class="card-body">
                    <h4 class="card-title">Classes</h4>
                    <div role="tablist">
                      <b-card no-body class="mb-1 shadow-none" v-for='classItem in course.classes' :key='classItem.id'>
                        <b-card-header header-tag="header" role="tab">
                          <h6 class="m-0">
                            <a
                              v-b-toggle.{{classItem.title}}
                              class="text-dark"
                              href="javascript: void(0);"
                            >{{ classItem.title }}</a>
                          </h6>
                        </b-card-header>
                        <b-collapse :id='classItem.title' visible accordion="my-accordion" role="tabpanel">
                          <b-card-body>
                            <b-card-text v-for='content in classItem.contents' :key='content.id'>{{content.title}} {{ formatDuration(content.duration)}} 
                              <b-button v-on:click="playVideoPC(content.id)" variant="primary" class="btn-watch btn-sm" v-if='course.enrollment_id'>Watch</b-button>
                            </b-card-text>
                          </b-card-body>
                        </b-collapse>
                      </b-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

          </div>
        </div>
        <!-- end card -->
      </div>
      <div class="col-lg-12" v-else>
        Loading....
      </div>
    </div>
    <!-- end row -->

  </Layout>
</template>

<style>
.btn_container{
  justify-items: center;
}

.modal-header-enough{
  background-color:#3848ca;
  color:white;
  font-size: large;
}

.modal-header-less{
  background-color:#ff1741;
  color:white;
  font-size: large;
}

.modal-content-buy{
  text-align: center;
  padding:20px;
  font-size:initial;
}

.btn-watch{
  float:left;
}
</style>