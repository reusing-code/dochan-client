<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <b-link to="/" class="navbar-brand">Dochan</b-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active-class">
          <b-link :to="{ name: 'home' }" class="nav-link" exact>Home</b-link> 
        </li>
        <li class="nav-item active-class">
          <b-link :to="{ name: 'about' }" class="nav-link" exact>About</b-link>
        </li>
      
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
