<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import axios from 'axios'

/**
 * Cards component
 */
export default {
  page: {
    title: "POS Sell",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "POS Sell",
      select_city : '',
      pos_data : [
        {
          name : "نينوى",
          title : "مكتبة كنانة", 
          address : "الموصل - المجموعة الثقافية - قرب مطعم النخيل داخل القيصرية",
          phones : [
            {
             number : "07740864133", 
             link : "tel:07740864133"
            }, 
            {
             number : "07517052876", 
             link : "tel:07517052876"
            }, 
          ]
        },
        {
          name : "صلاح الدين",
          title : "مكتبة الصديقين",
          address : "سامراء شارع الفاطمي",
          phones : [
            {
             number : "07702854488", 
             link : "tel:07702854488"
            }
          ]
        },
        {
          name : "كركوك",
          title : "قرطاسية الحاج علي",
          address : "كركوك شارع محاكم",
          phones : [
            {
             number : "07723313414", 
             link : "tel:07723313414"
            }
          ]
        },
        {
          name : "ديالى",
          title : "مكتبة المتنبي 2",
          address : "المقدادية سوق حي المعلمين",
          phones : [
            {
             number : "07711040655", 
             link : "tel:07711040655"
            }
          ]
        },
        {
          name : "الانبار",
          title : "مكتبة ابو مصطفى",
          address : "الانبار شارع المستودع مقابل مرطبات زنبقة",
          phones : [
            {
             number : "07828881255", 
             link : "tel:07828881255"
            }
          ]
        },
        {
          name : "واسط",
          title : "مكتبة الكريم",
          address : "الكوت شارع المحافظة",
          phones : [
            {
             number : "07725423700", 
             link : "tel:07725423700"
            }
          ]
        },
        {
          name : "بابل ",
          title : "مكتبة التاج",
          address : "بابل-الحلة-شارع ٤٠ من جهة باب الحسين قرب حلويات الرهيمي",
          phones : [
            {
             number : "07802767474", 
             link : "tel:07802767474"
            },
            {
             number : "07803444345", 
             link : "tel:07803444345"
            },
            {
             number : "07601241926", 
             link : "tel:07601241926"
            }
          ]
        },

        {
          name : "كربلاء ",
          title : "مكتبة القبس ",
          address : "حي الموظفين مقابل الحج والعمرة ",
          phones : [
            {
             number : "07702725522", 
             link : "tel:07702725522"
            },
            {
             number : "07801004015", 
             link : "tel:07801004015"
            }
          ]
        },

        {
          name : "النجف  ",
          title : "مكتبة الوان ",
          address : "حي الامير شارع عطية الجبوري ",
          phones : [
            {
             number : "07800662212", 
             link : "tel:07800662212"
            }
          ]
        },
        {
          name : "ذي قار",
          title : "مكتبة الغدير ",
          address : "شارع الحبوبي مقابل دكتور فراس النعيمي ومجاور مصور الجامعة 2",
          phones : [
            {
             number : "07832303772", 
             link : "tel:07832303772"
            }
          ]
        },
        {
          name : "الديوانية ",
          title : "مكتبة الشمس ",
          address : "مقابل مبنى المحافظة القديمة",
          phones : [
            {
             number : "07801089423", 
             link : "tel:07801089423"
            }
          ]
        },

        {
          name : "ميسان ",
          title : "مكتبة ومطبعة النباهة",
          address : "ميسان شارع دجلة مجاور سوق مريم العذراء",
          phones : [
            {
             number : "07716854026", 
             link : "tel:07716854026"
            }
          ]
        },

        {
          name : "المثنى ",
          title : "مكتبة فراس",
          address : "السماوة السوق الكبير",
          phones : [
            {
             number : "07716163457", 
             link : "tel:07716163457"
            }
          ]
        },
        {
          name : "البصرة ",
          title : "مكتبة الجذور ",
          address : "البصرة الجنينة شارع السوق قرب جامع الجنينة داخل السوق ",
          phones : [
            {
             number : "07702687911", 
             link : "tel:07702687911"
            }
          ]
        },

      ],
      search_data : '',
    };
  },

  created(){
    axios.get(this.$api_host + 'user/checkAuth')
    .catch((error)=>{
      if (error.response && error.response.status == 401){
        this.$router.push({ name: 'login' })  
      }
    });
    this.search_data = this.pos_data;
  },

  methods:{
    search(){
      if(this.select_city == 0)
        this.search_data = this.pos_data;
      else {
        let temp_data = [];
        this.pos_data.forEach(element => {
          if(element.name.search(this.select_city) != -1)
            temp_data.push(element);
        });
        this.search_data = temp_data;
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>

    <div class="row mt-3 mb-3">
      <div class="col-md-6">
          <select class="form-control mb-3" v-model='select_city'>
            <option value="0">Select</option>
            <option v-for='item in pos_data'  :value="item.name" :key="item.name">{{item.name}}</option>
          </select>
      </div>

      <div class="col-md-6">
        <b-button block variant="primary" size="md" v-on:click='search'>Search</b-button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6"  v-for="pos in search_data" :key="pos.name">
        <b-card>
          <h4>{{ pos.name }}</h4>
          <h5>{{ pos.title }}</h5>
          <b-card-text>
            <i class="ri-map-pin-fill"></i>{{ pos.address}}
            <div v-for='phone in pos.phones' :key="phone.number">
              <a :href="phone.link">{{ phone.number }}<i class="ri-phone-fill"></i></a>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6" >
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>