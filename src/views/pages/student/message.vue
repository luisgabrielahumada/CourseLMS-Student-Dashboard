<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import axios from 'axios'
import { emailData } from "../email/data-inbox";

import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/**
 * Message Component
 */
export default {
  page: {
    title: "الرسائل",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader,ckeditor: CKEditor.component },
  data() {
    return {
      title: "الرسائل",
      teachers: {},
      toTeacher: '',
      // subject : '',
      message : '',

      
      sentMessages : [],
      receivedMessages : [],
      statusMessageContent : 0,


      emailData: [],
      paginatedEmailData: emailData,
      // page number
      currentPage: 1,
      // default page size
      perPage: 15,

      // start and end index
      startIndex: 1,
      endIndex: 15,

      showModal: false,
      editor: ClassicEditor,
      editorData: ""
    };
  },

  created(){
    // Init Email List
    this.startIndex = 0;
    this.endIndex = this.perPage;

    
    // All teachers for senders
    axios.get(this.$api_host + 'all/receivers')
    .then((response) => {
      this.teachers = response.data.receivers;  
    }).catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });

    // All messages for inbox and sent box
    axios.get(this.$api_host + 'all/messages')
    .then((response) => {
      this.sentMessages     = response.data.sentMessages;  
      this.receivedMessages = response.data.receivedMessages;  

      // Reset Sent Date
      this.sentMessages.forEach(element => {
        element.time = this.toUTCDate(element.created_at);
      });

      this.receivedMessages.forEach(element => {
        element.time = this.toUTCDate(element.created_at);
      });

      this.showReceived();
      
    }).catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });
  },

  methods : {
    sendMessage(){
      let config = {
        teacher_id : this.toTeacher,
        content : this.message
      }

      axios.post(this.$api_host + 'teacher/sendMessage', config)
      .then((response) => {
        this.$bvToast.toast(response.data.message, {
          title: `Send Message`,
          variant: 'primary',
          solid: true
        });
        this.showModal = false;
      }).catch((error) => {
        console.log(error);
      })
    },

    onPageChange() {
      this.startIndex = (this.currentPage - 1) * this.perPage;
      this.endIndex = (this.currentPage - 1) * this.perPage + this.perPage;

      this.paginatedEmailData = this.emailData.slice(
        this.startIndex,
        this.endIndex
      );
    },

    showSent(){
      // Show email data
      this.emailData = this.sentMessages;
      this.paginatedEmailData = this.emailData.slice(
        this.startIndex,
        this.endIndex
      );
      this.statusMessageContent = 1;
    },

    showReceived(){
      // Show email data
      this.emailData = this.receivedMessages;
      this.paginatedEmailData = this.emailData.slice(
        this.startIndex,
        this.endIndex
      );
      this.statusMessageContent = 0;
    }
  },

  computed: {
    rows() {
      return this.emailData.length;
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-12">
        <div class="email-leftbar card">
          <b-button variant="danger" @click="showModal = true">Compose</b-button>
          <div class="mail-list mt-4" v-if="statusMessageContent == 0">
            <a href="javascript: void(0);" class="active" @click="showReceived" >
              <i class="mdi mdi-email-outline mr-2"></i> Received
              <!-- <span class="ml-1 float-right">(18)</span> -->
            </a>
            <a href="javascript: void(0);" @click="showSent">
              <i class="mdi mdi-email-outline mr-2"></i> Sent
            </a>
          </div>

          <div class="mail-list mt-4" v-if="statusMessageContent == 1">
            <a href="javascript: void(0);" @click="showReceived" >
              <i class="mdi mdi-email-outline mr-2"></i> Received
              <!-- <span class="ml-1 float-right">(18)</span> -->
            </a>
            <a href="javascript: void(0);" class="active" @click="showSent">
              <i class="mdi mdi-email-outline mr-2"></i> Sent
            </a>
          </div>

        </div>
        <div class="email-rightbar mb-3">
          <div class="card">
            <!-- <div class="btn-toolbar p-3">
              <Toolbar />
            </div> -->
            <div class="mt-3">
              <ul class="message-list">
                <li
                  v-for="(email,index) in paginatedEmailData"
                  :key="index"
                  :class="{ 'unread': `${email.unread}` === 'true' }"
                >
                  <div class="col-mail col-mail-1">
                    <div class="checkbox-wrapper-mail">
                      <input :id="`chk-${index}`" type="checkbox" />
                      <label :for="`chk-${index}`"></label>
                    </div>
                    <span class="star-toggle far fa-star"></span>
                    <a class="title" v-if="email.sender">{{email.sender.name}}</a>
                    <a class="title" v-if="email.receiver">{{email.receiver.name}}</a>
                  </div>
                  <div class="col-mail col-mail-2">
                    <div class="subject" v-html="email.content"></div>
                    <div class="date">{{email.time}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="row justify-content-md-between align-items-md-center">
            <div class="col-xl-7">Showing {{startIndex}} - {{endIndex}} of {{rows}}</div>
            <!-- end col-->
            <div class="col-xl-5">
              <div class="text-md-right float-xl-right mt-2 pagination-rounded">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  @input="onPageChange"
                ></b-pagination>
              </div>
            </div>
            <!-- end col-->
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showModal" title="New Message" centered>
      <form>
        <div class="form-group">
          <select id="teacher" class="form-control" v-model="toTeacher">
            <option v-for="teacher in teachers" :key='teacher.user_id' :value='teacher.user_id'>{{teacher.name}}</option>
          </select>
        </div>

        <!-- <div class="form-group">
          <input type="text" class="form-control" placeholder="Subject" />
        </div> -->
        <div class="form-group">
          <ckeditor v-model="message" :editor="editor"></ckeditor>
        </div>
      </form>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModal = false">Close</b-button>
        <b-button variant="primary" @click="sendMessage">
          Send
          <i class="fab fa-telegram-plane ml-1"></i>
        </b-button>
      </template>
    </b-modal> 
  </Layout>
</template>


<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
}
</style>