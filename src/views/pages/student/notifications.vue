<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

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
      title: "Customers",
      
      customersData: [
        {
          date: "06 Apr, 2020",
          message: "CarolynHarvey@rhyta.com",
        },
      ],
    };
  },
  
  methods: {
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
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
                    <th>Date</th>
                    <th>Message</th>
                    <th style="width: 120px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in customersData" :key="index">
                    <td>{{item.date}}</td>
                    <td>{{item.message}}</td>
                    <td>
                      <button class="btn btn-light btn-rounded">
                        Read
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