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
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h2 class="mb-0">{{ title }}</h2>

        <div class="page-title-right">
          <b-alert show variant="info">
            لكي تتمكن من مشاهدة {{course}}
يجب تحميل تطبيق الديسكتوب الخاص بنا
          </b-alert>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>