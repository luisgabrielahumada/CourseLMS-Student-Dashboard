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
                <b-button variant="warning">Home <i class=" ri-home-4-line align-middle ml-2"></i></b-button>
          </router-link>

          <a :href='wallet_url'>
                <b-button variant="warning">Wallet <i class="ri-wallet-3-fill align-middle ml-2"></i></b-button>
          </a>

          <a :href='mycourses_url'>
                <b-button variant="warning">My Courses <i class="ri-play-fill align-middle ml-2"></i></b-button>
          </a>

          <a :href='messages_url'>
                <b-button variant="warning">Messages <i class="ri-notification-4-line align-middle ml-2"></i></b-button>
          </a>

          <a :href='discover_url'>
                <b-button variant="warning">Discover <i class=" ri-search-2-line align-middle ml-2"></i></b-button>
          </a>

          <a :href='possell_url'>
                <b-button variant="warning">POS Sell <i class=" ri-shopping-bag-fill align-middle ml-2"></i></b-button>
          </a>

        </div>
      </div>
    </div>
  </footer>
</template>


<style>
.footer{
  height: 75px;
}

.button-container{
  display: flex;
  justify-content: space-evenly;
}
</style>