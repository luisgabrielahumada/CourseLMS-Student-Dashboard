<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";


export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  }
};
</script>

<style>
@font-face {
  font-family: Somar;
  src: url('assets/fonts/Somar-Medium.otf');
}

.body{
  font-family : 'Somar',
}
</style>