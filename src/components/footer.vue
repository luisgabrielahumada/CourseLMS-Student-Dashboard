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
                <b-button variant="warning"><i class="ri-home-4-fill align-middle icon"></i><div class="icon-title">Home</div></b-button>
          </router-link>

          <a :href='wallet_url'>
                <b-button variant="warning"><i class="ri-wallet-3-fill align-middle icon"></i><div class="icon-title">Wallet</div></b-button>
          </a>

          <a :href='mycourses_url'>
                <b-button variant="warning"><i class=" ri-play-circle-fill align-middle icon"></i><div class="icon-title">My Courses</div></b-button>
          </a>

          <a :href='messages_url'>
                <b-button variant="warning"><i class="ri-notification-4-fill align-middle icon"></i><div class="icon-title">Messages</div></b-button>
          </a>

          <a :href='discover_url'>
                <b-button variant="warning"><i class=" ri-search-2-fill align-middle icon"></i><div class="icon-title">Discover</div></b-button>
          </a>

          <a :href='possell_url'>
                <b-button variant="warning"><i class=" ri-shopping-bag-fill align-middle icon"></i><div class="icon-title">POS Sell</div></b-button>
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

.icon{
  font-size:18px;
}

@media screen and (max-width: 600px) {
  .icon-title {
    visibility: hidden;
    clear: both;
    float: left;
    margin: 10px auto 5px 20px;
    width: 28%;
    display: none;
  }

  .footer{
    height: 60px;
    padding:10px;
  }
}
</style>