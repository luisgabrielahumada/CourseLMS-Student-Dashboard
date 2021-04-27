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
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 button-container">
          
          <router-link to="/">
                <b-button variant="warning"><i class="ri-home-4-fill align-middle icon"></i><div class="icon-title">Home</div></b-button>
          </router-link>

          <router-link to="/wallet">
                <b-button variant="warning"><i class="ri-wallet-3-fill align-middle icon"></i><div class="icon-title">Wallet</div></b-button>
          </router-link>

          <router-link to="/mycourses">
                <b-button variant="warning"><i class=" ri-play-circle-fill align-middle icon"></i><div class="icon-title">My Courses</div></b-button>
          </router-link>

          <router-link to="/notifications">
                <b-button variant="warning"><i class="ri-notification-4-fill align-middle icon"></i><div class="icon-title">Notifications</div></b-button>
          </router-link>

          <router-link to="/discover">
                <b-button variant="warning"><i class=" ri-search-2-fill align-middle icon"></i><div class="icon-title">Discover</div></b-button>
          </router-link>

          <router-link to="/possell">
                <b-button variant="warning"><i class=" ri-shopping-bag-fill align-middle icon"></i><div class="icon-title">POS Sell</div></b-button>
          </router-link>
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