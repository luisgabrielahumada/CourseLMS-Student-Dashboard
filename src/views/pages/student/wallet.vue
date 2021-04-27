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
    title: "Wallet",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Wallet",
      coupon_code : '',
    };
  },

  created(){
    axios.get(this.$api_host + 'user/checkAuth')
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    })
  }, 

  methods : {
    charge(){
      let url = this.$api_host + 'charge';
      let config = {
        code    : this.coupon_code,
      }
      axios.post(url, config)
      .then((response) =>{
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: `Charge`,
            variant: 'primary',
            solid: true
          });
          this.coupon_code = '';
          this.downloadUserDetail();
        }else{
          this.$bvToast.toast(response.data.message, {
            title: `Charge`,
            variant: 'danger',
            solid: true
          });
          this.coupon_code = '';
        }
      }).catch((error)=>{
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
        this.coupon_code = '';
      })
    },
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row  justify-content-center">
      <div class="col-lg-8">
        <!-- Simple card -->
        <b-card class="text-center">
          <b-card-title>
            <h3>Top up coint</h3>
            <h5>Available balance ({{ balanceWithDollar()}})</h5>
          </b-card-title>

          <p>
            <img 
              class="img-fluid mt-4 mb-4"
              src="@/assets/images/wallet-logo.png"
              data-holder-rendered="true"/>
          </p>
          
          <b-card-text>
            <h5>Recharge the balance</h5>
            You can recharge your balance to be able to purchase our courses
          </b-card-text>

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
          
          <b-button
            size="lg" 
            type="button"
            variant="primary"
            v-on:click='charge()'>
            Charge
          </b-button>
        </b-card>
      </div>
      <!-- end col -->

    </div>
    <!-- end row -->

  </Layout>
</template>