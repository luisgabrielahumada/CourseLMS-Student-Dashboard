<script>
import simplebar from "simplebar-vue";
import { layoutComputed } from "@/state/helpers";

import MetisMenu from "metismenujs/dist/metismenujs";

import { menuItems } from "./student";
import axios from 'axios';

export default {
  components: {
    simplebar,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuItems: menuItems,
      user: '',
      coupon_code : '',
      modal_charge : false,
    };
  },
  computed: {
    ...layoutComputed,
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu("#side-menu");
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("mm-active");
        const parent2 = parent.parentElement.closest("ul");
        if (parent2 && parent2.id !== "side-menu") {
          parent2.classList.add("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("mm-active");
            var childAnchor = parent3.querySelector(".has-arrow");
            var childDropdown = parent3.querySelector(".has-dropdown");
            if (childAnchor) childAnchor.classList.add("mm-active");
            if (childDropdown) childDropdown.classList.add("mm-active");

            const parent4 = parent3.parentElement;
            if (parent4 && parent4.id !== "side-menu") {
              parent4.classList.add("mm-show");
              const parent5 = parent4.parentElement;
              if (parent5 && parent5.id !== "side-menu") {
                parent5.classList.add("mm-active");
                const childanchor = parent5.querySelector(".is-parent");
                if (childanchor && parent5.id !== "side-menu") {
                  childanchor.classList.add("mm-active");
                }
              }
            }
          }
        }
      }
    }
  },

  created() {
    // const response = await axios.get(this.$api_host + 'user/detail');  // Load the data from your api url
    // this.detail = response.data.teachers;  // set the data
    this.user = this.$current_user;
  },

  methods: {
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    onRoutechange() {
      setTimeout(() => {
        if(document.getElementsByClassName("mm-active").length > 0){
          const currentPosition = document.getElementsByClassName("mm-active")[0]
          .offsetTop;
          if (currentPosition > 400)
            this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 200;
        }
      }, 300);
    },

    logout(){
      axios.post(this.$api_host + 'logout')
      .then((response) => {
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: `Logout`,
            variant: 'primary',
            solid: true
          });
        }else{
          this.$bvToast.toast("Error Occurred", {
            title: `Logout`,
            variant: 'danger',
            solid: true
          });
        }
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = "";
      this.$router.push({ name: 'login' })
    },

    charge(){
      let url = this.$api_host + 'charge';
      let config = {
        code    : this.coupon_code,
      }
      axios.post(url, config)
      .then((response) =>{
        if(response.data.success){
          this.$bvToast.toast(response.data.message, {
            title: `Charge`,
            variant: 'primary',
            solid: true
          });
          this.downloadUserDetail();
          this.closeChargeDialog();
        }else{
          this.$bvToast.toast(response.data.message, {
            title: `Charge`,
            variant: 'danger',
            solid: true
          });
          this.closeChargeDialog();
        }
      }).catch((error)=>{
        this.closeChargeDialog();
        if (error.response && error.response.status == 401){
          this.$router.push({ name: 'login' })  
        }
      })
    },

    closeChargeDialog(){
      this.modal_charge = false;
    }
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
        //   switch (newVal) {
        //     case "dark":
        //       document.body.setAttribute("data-sidebar", "dark");
        //       document.body.removeAttribute("data-topbar");
        //       document.body.removeAttribute("data-sidebar-size");
        //       break;
        //     case "light":
        //       document.body.setAttribute("data-topbar", "dark");
        //       document.body.removeAttribute("data-sidebar");
        //       document.body.removeAttribute("data-sidebar-size");
        //       document.body.classList.remove("vertical-collpsed");
        //       break;
        //     case "compact":
        //       document.body.setAttribute("data-sidebar-size", "small");
        //       document.body.setAttribute("data-sidebar", "dark");
        //       document.body.classList.remove("vertical-collpsed");
        //       document.body.removeAttribute("data-topbar", "dark");
        //       break;
        //     case "icon":
        //       document.body.setAttribute("data-keep-enlarged", "true");
        //       document.body.classList.add("vertical-collpsed");
        //       document.body.setAttribute("data-sidebar", "dark");
        //       document.body.removeAttribute("data-topbar", "dark");
        //       break;
        //     case "colored":
        //       document.body.setAttribute("data-sidebar", "colored");
        //       document.body.removeAttribute("data-keep-enlarged");
        //       document.body.classList.remove("vertical-collpsed");
        //       document.body.removeAttribute("data-sidebar-size");
        //       break;
        //     default:
        //       document.body.setAttribute("data-sidebar", "dark");
        //       break;
        //   }
          document.body.setAttribute("data-topbar", "light");
          document.body.removeAttribute("data-sidebar");
          document.body.removeAttribute("data-sidebar-size");
          document.body.classList.remove("vertical-collpsed");
        }

       
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};

</script>
<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <simplebar class="h-100" ref="currentMenu" id="my-element">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        
        <div class="text-center mt-2 mb-4 user-avatar" >
          <img :src='user.image' alt class="rounded-circle avatar-md mb-4" />
          <b-card-title>
            <h5 class="sidebar-text">{{ user.name }}</h5>
            <h5 class="sidebar-text" v-b-modal.modal-charge variant="primary">{{$t('student.sidebar.balance')}} : {{this.balanceWithDollar()}}</h5>
          </b-card-title>
        </div>

        <b-modal id="modal-charge" title="Charge" v-model='modal_charge' title-class="font-18" hide-footer >
          <b-card-body class="text-center">
            <h3>Top up coint</h3>
            <b-form-group
              id="example text"
              label-cols-sm="2"
              label-cols-lg="2"
              label="Coupon"
              label-for="coupon_code"
              class="mt-3"
            >
              <b-form-input for="coupon_code" v-model="coupon_code" placeholder="Enter Coupon code"></b-form-input>
            </b-form-group>
            <p>
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light mt-3 mr-1"
                v-on:click='charge()'>
                Charge
              </button>
            </p>
          </b-card-body>
        </b-modal>


        <ul class="metismenu list-unstyled" id="side-menu">
          <template v-for="item in menuItems">
            <li class="menu-title" v-if="item.isTitle" :key="item.id">
              {{ $t(item.label) }}
            </li>

            <!--end Layouts menu -->
            <li v-if="!item.isTitle && !item.isLayout" :key="item.id">
              <a
                v-if="hasItems(item)"
                href="javascript:void(0);"
                class="is-parent"
                :class="{
                  'has-arrow': !item.badge,
                  'has-dropdown': item.badge,
                }"
              >
                <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
                <span
                  :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                  v-if="item.badge"
                  >{{ $t(item.badge.text) }}</span
                >
              </a>

              <router-link
                :to="item.link"
                v-if="!hasItems(item) && item.link != '/logout'"
                class="side-nav-link-ref"
              >
                <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
                <span
                  :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                  v-if="item.badge"
                  >{{ $t(item.badge.text) }}</span
                >
              </router-link>

              <a
                :to="item.link"
                v-if="!hasItems(item) && item.link == '/logout'"
                class="side-nav-link-ref"
                href="javascript:void(0);"
                v-on:click="logout()"
              >
                <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                <span>{{ $t(item.label) }}</span>
                <span
                  :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                  v-if="item.badge"
                  >{{ $t(item.badge.text) }}</span
                >
              </a>

              <ul v-if="hasItems(item)" class="sub-menu" aria-expanded="false">
                <li v-for="(subitem, index) of item.subItems" :key="index">
                  <router-link
                    :to="subitem.link"
                    v-if="!hasItems(subitem)"
                    class="side-nav-link-ref"
                    >{{ $t(subitem.label) }}</router-link
                  >
                  <a
                    v-if="hasItems(subitem)"
                    class="side-nav-link-a-ref has-arrow"
                    href="javascript:void(0);"
                    >{{ subitem.label }}</a
                  >
                  <ul
                    v-if="hasItems(subitem)"
                    class="sub-menu mm-collapse"
                    aria-expanded="false"
                  >
                    <li
                      v-for="(subSubitem, index) of subitem.subItems"
                      :key="index"
                    >
                      <router-link
                        :to="subSubitem.link"
                        class="side-nav-link-ref"
                        >{{ $t(subSubitem.label) }}</router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
      <!-- Sidebar -->
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>


<style>
.sidebar-text{
  color:#0071d9 !important;
}
#sidebar-menu ul li a i {
    display: inline-block;
    min-width: 1.5rem;
    padding-bottom: 0.125em;
    font-size: 1.1rem;
    line-height: 1.40625rem;
    vertical-align: middle;
    color: #0071d9;
    transition: all 0.4s;
    opacity: 0.75;
}

.vertical-collpsed .vertical-menu .simplebar-content-wrapper .user-avatar{
  display:none;
}
</style>