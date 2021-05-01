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
          
          <router-link to="/" class="text-center">
                <i class="ri-home-4-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.home')}}</div>
          </router-link>

          <router-link to="/wallet" class="text-center">
                <i class="ri-wallet-3-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.wallet')}}</div>
          </router-link>

          <router-link to="/mycourses" class="text-center">
                <i class=" ri-play-circle-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.mycourses')}}</div>
          </router-link>

          <router-link to="/notifications" class="text-center">
                <i class="ri-notification-4-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.notifications')}}</div>
          </router-link>

          <router-link to="/blogs" class="text-center">
                <i class=" ri-search-2-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.discover')}}</div>
          </router-link>

          <router-link to="/possell" class="text-center">
                <i class=" ri-shopping-bag-fill align-middle icon"></i><div class="icon-title">{{$t('student.footer.possell')}}</div>
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