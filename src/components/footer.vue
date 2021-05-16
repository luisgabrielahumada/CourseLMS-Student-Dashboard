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
                 <img  class="align-middle icon" src="@/assets/images/footericon/house.png" border="0" /><div class="icon-title">{{$t('student.footer.home')}}</div>
          </router-link>

          <router-link to="/wallet" class="text-center">
                <img  class="align-middle icon" src="@/assets/images/footericon/purse.png" border="0" /><div class="icon-title">{{$t('student.footer.wallet')}}</div>
          </router-link>

          

          <router-link to="/notifications" class="text-center">
                  <img  class="align-middle icon" src="@/assets/images/footericon/notice.png" border="0" /><div class="icon-title">{{$t('student.footer.notifications')}}</div>
          </router-link>

          <router-link to="/blogs" class="text-center">
                  <img  class="align-middle icon" src="@/assets/images/footericon/discover.png" border="0" /><div class="icon-title">{{$t('student.footer.discover')}}</div>
          </router-link>

          <router-link to="/possell" class="text-center">
                  <img  class="align-middle icon" src="@/assets/images/footericon/map.png" border="0" /><div class="icon-title">{{$t('student.footer.possell')}}</div>
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
img.align-middle.icon {
    width: 23px;
}
.col-sm-12.button-container {
    font-size: 16px;
}
@media screen and (max-width: 576px) {
  /* .icon-title {
    visibility: hidden;
    clear: both;
    float: left;
    margin: 10px auto 5px 20px;
    width: 28%;
    display: none;
  } */
}

@font-face {
  font-family: Somar;
  src: url('../assets/fonts/Somar-Medium.otf');
}

.footer{
  height: 60px;
  padding:10px;
  font-family : 'Somar',
}
</style>