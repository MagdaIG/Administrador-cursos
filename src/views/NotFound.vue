<template>
  <div class="text-center mt-5">
    <h1>Página No Encontrada</h1>
    <p>La página que buscas no existe.</p>
    <router-link to="/" class="btn btn-primary">Volver al Inicio</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>