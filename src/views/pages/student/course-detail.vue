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
  },
  
  methods: {
    /**
     * Selected image shows
     */
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
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
                          
                      <div class="row text-center mt-2">
                        <button
                          type="button"
                          class="btn btn-light btn-block waves-effect mt-2 waves-light"
                        >
                          <i class="mdi mdi-shopping mr-2"></i>Buy now
                        </button>
                      </div>
                    </div>
                  </div>
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