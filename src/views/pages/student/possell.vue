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
    title: "POS Sell",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "POS Sell",
      select_city : '',
      pos_data : [
        {
          name : "Electronic cards",
          address : "Baghdad Rusafa / Al-Karkh",
          phone : "07716018041",
          phone_link : "tel:07716018041",
          position: { lat: 10.0, lng: 10.0 }
        },
        {
          name : "Al-Mustansiriya Library",
          address : "Baghdad - Rusafa - Palestine Street opposite the 7days supermarket. There is delivery to all regions and governorates",
          phone : "07702724455",
          phone_link : "tel:07702724455",
          position: { lat: 15.0, lng: 13.0 }
        },
      ],
      search_data : '',
    };
  },

  created(){
    axios.get(this.$api_host + 'user/checkAuth')
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });
    this.search_data = this.pos_data;
  },

  methods:{
    search(){
      if(this.select_city == 0)
        this.search_data = this.pos_data;
      else {
        let temp_data = [];
        this.pos_data.forEach(element => {
          if(element.address.search(this.select_city) != -1)
            temp_data.push(element);
        });
        this.search_data = temp_data;
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>

    <div class="row mt-3 mb-3">
      <div class="col-md-6">
        <b-card>
          <select class="form-control mb-3" v-model='select_city'>
            <option value="0">Select</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Basra">Basra</option>
            <option value="Nineveh">Nineveh</option>
            <option value="Erbil">Erbil</option>
          </select>
          <b-button block variant="primary" size="md" v-on:click='search'>Search</b-button>
        </b-card>

        <b-card v-for="pos in search_data" :key="pos.name">
          <h5>{{ pos.name }}</h5>
          <b-card-text>
            <i class="ri-map-pin-fill"></i>{{ pos.address}}
          </b-card-text>
          <b-card-text>
            <a :href="pos.phone_link"><i class="ri-phone-fill"></i>{{ pos.phone }}</a>
          </b-card-text>
        </b-card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6" >
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>