<script>
/**
 * Cards component
 */
export default {
  page: {
    title: "Courses",
  },
  data() {
    return {
      wallet_url: this.$host + 'student/profile', 
      mycourses_url: this.$host + 'my/courses',
      messages_url : this.$host + 'student/message',
      discover_url : this.$host,
      possell_url : this.$host,
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 button-container">
          
          <router-link
                to="/">
                <b-button variant="warning"><i class="ri-home-4-fill align-middle"><br>Home</i></b-button>
          </router-link>

          <a :href='wallet_url'>
                <b-button variant="warning"><i class="ri-wallet-3-fill align-middle"></i><br>Wallet</b-button>
          </a>

          <a :href='mycourses_url'>
                <b-button variant="warning"><i class="ri-play-fill align-middle"></i><br>My Courses</b-button>
          </a>

          <a :href='messages_url'>
                <b-button variant="warning"><i class="ri-notification-4-fill align-middle"></i><br>Messages</b-button>
          </a>

          <a :href='discover_url'>
                <b-button variant="warning"><i class=" ri-search-2-fill align-middle"></i><br>Discover</b-button>
          </a>

          <a :href='possell_url'>
                <b-button variant="warning"><i class=" ri-shopping-bag-fill align-middle"></i><br>POS Sell</b-button>
          </a>

        </div>
      </div>
    </div>
  </footer>
</template>


<style>
.footer{
  height: 80px;
  position:fixed;
  padding:10px;
}

.button-container{
  display: flex;
  justify-content: space-evenly;
}
</style>