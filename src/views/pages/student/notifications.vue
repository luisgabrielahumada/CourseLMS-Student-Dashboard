<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import axios from 'axios';

/**
 * Customers Component
 */
export default {
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      title: "أشعارات",
      notifications : [],
    };
  },
  
  methods: {
    markRead(id){
      let config = {
        id : id
      }

      axios.post(this.$api_host + 'notification/mark', config)
        .then((response) => {
          if(response.data.success)
            this.notifications.forEach((element)=>{
              if(element.id == id)
                element.is_read = true;
            });
        }).catch((error) => {
          if (error.response && error.response.status == 401){
            this.$router.push({ name: 'login' })  
          }
        });
    }
  },

  created(){
    let config = {
      params: {
        is_read: 'all'
      },
    }
    axios.get(this.$api_host + 'user/notifications', config)
      .then((response) => {
        this.notifications = response.data.notifications;
        this.notifications.forEach(element => {
          element.time = this.toUTCDate(element.created_at);
        });
      }).catch((error) => {
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
      });
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
            <div class="table-responsive mt-3">
              <table
                class="table table-centered datatable dt-responsive nowrap"
                style="border-collapse: collapse; border-spacing: 0; width: 100%;"
              >
                <thead class="thead-light">
                  <tr>
                    <th>تاريخ</th>
                    <th>الرسائل</th>
                    <th style="width: 200px;">أختر</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in notifications" :key="index">
                    <td>{{item.time}}</td>
                    <td>{{item.data["body"]}}</td>
                    <td>
                      <button class="btn btn-light btn-rounded" v-on:click='markRead(item.id)' v-if='item.is_read == 0'>
                        تم
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>