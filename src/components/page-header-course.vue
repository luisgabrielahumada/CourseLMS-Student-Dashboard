<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    course: {
      type: String,
      default: '',
      player_url : '',
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  created() {
    let host = 'http://api.lmsiq.com/public/videoplayers/';
    let platform = this.getOS();
    if(platform.search('Windows') != -1)
      this.player_url = host + 'PC player.zip';
    else if (platform.search('Android') != -1)
      this.player_url = host + 'com.nanosoft.lmsiq.apk';
    else if (platform.search('iOS') != -1)
      this.player_url = host + 'com.nanosoft.lmsiq.ipa';
  },

  methods : {
    getOS() {
      var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
          windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
          iosPlatforms = ['iPhone', 'iPad', 'iPod'],
          os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os;
    }
  }
}
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h2 class="mb-0">{{ title }}</h2>

        <div class="col-centered page-header">
          <b-alert show variant="info">
            لكي تتمكن من مشاهدة {{course}}
يجب تحميل تطبيق الديسكتوب الخاص بنا

            <a :href="player_url">
             <button
                type="button"
                class="btn btn-primary waves-effect waves-light ml-4 mr-4">
                Download App
              </button>
            </a>
          </b-alert>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>


<style scoped>
.col-centered{
  float: none;
  margin: 0 auto;
}

.page-header{
  font-size:25px;
}
</style>