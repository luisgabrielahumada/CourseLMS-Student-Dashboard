<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from 'axios'

/**
 * Course Detail Component
 */
export default {
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      course: '',
      title: "Course Detail",
      modal_title : '',
      coupon_code : '',
    };
  },

  async created() {
    let config = {
      params: {
        course_id: this.$route.params.course,
      },
    }
    const response = await axios.get(this.$api_host + 'course/detail', config);  // Load the data from your api url
    this.course = response.data.course;  // set the data

    if(this.course.price < this.$current_user.balance)
      this.modal_title = "Your current balance(" + this.balanceWithDollar() + ") is enough";
    else 
      this.modal_title = "Your current balance(" + this.balanceWithDollar() + ") is not enough";
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

    async applyCoupon(){
      let config = {
        params: {
          course_id: this.course.id,
          code    : this.coupon_code,
          user_id : this.$current_user.id
        },
      }
      const response = await axios.post(this.$api_host + 'coupon/apply', config);  // Load the data from your api url
      console.log(response);
    },

    async buyWithWallet(){
      let config = {
        params: {
          course_id: this.course.id,
          user_id : this.$current_user.id
        },
      }
      
      axios.get(this.$api_host + 'course/buyWallet', config)
      .then((response) => {
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: ``,
            variant: 'primary',
            solid: true
          });
        }else{
          this.$bvToast.toast(response.data.message, {
            title: ``,
            variant: 'danger',
            solid: true
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-5">
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
                    
                <div class="row text-center mt-2 container_buy">
                  <b-button v-b-modal.modal-center variant="primary" class="btn-block">
                    <i class="mdi mdi-shopping mr-2"></i>Buy now
                  </b-button>
                  
                  <b-modal header-class="modal-header-enough" id="modal-center" hide-footer 
                    v-if='this.$current_user.balance >= course.price'>
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

                  <b-modal header-class="modal-header-less" id="modal-center" hide-footer 
                    v-if='this.$current_user.balance < course.price'>
                    <template #modal-header>Your current balance ({{ balanceWithDollar() }}) is  not enough</template>
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
              <div class="col-xl-7">
                <div class="mt-4 mt-xl-3">
                  <a href="#" class="text-primary">{{course.category.name}}</a>
                  <h5 class="mt-1 mb-3">{{course.title}}</h5>

                  <h5 class="mt-2">
                    {{ convertWithDollar(course.price)}}
                  </h5>
                  <p
                    class="mt-3"
                    v-html="course.short_description"></p>
                  
                </div>
              </div>
            </div>
            <!-- end row -->

          </div>
        </div>
        <!-- end card -->
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
</style>