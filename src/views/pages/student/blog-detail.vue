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
    title: "Blog Detail",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Blog Detail",
      blog : '',
    };
  },

  created(){
    let config = {
      params: {
        id: this.$route.params.blog,
      },
    }
    axios.get(this.$api_host + 'blog/detail', config)
    .then((response) => {
      this.blog = response.data.blog;
      this.blog.created_at = this.toUTCDate(this.blog.created_at);
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
   
    <div class="row">
      <div class="col-md-10 col-centered">
        <b-card
            :img-src="blog.img"
            img-alt="Card image"
            img-top
            class="mb-4"
          >
            <b-card-title>
              <h4>{{blog.title}}</h4>
            </b-card-title>
            <p>
              <medium class="text-muted">{{blog.created_at}}</medium>
            </p>
            <p
              class="card-text"
              v-html="blog.body"
            ></p>
            
          </b-card>
      </div>
    </div>

  </Layout>
</template>

<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
  padding:20px;
}
</style>