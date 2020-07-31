<template>
  <section id="app">
    <Header/>
    <router-view></router-view>
  </section>
</template>

<script>
import Header from "./components/header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
body{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.overlay {
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: pointer;
    left: 0;
}
.gradiente-direita{
    background: -webkit-linear-gradient(left, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: -moz-linear-gradient(left, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: -o-linear-gradient(left, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: linear-gradient(to right, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%); 
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0f0303', endColorstr='#007db9e8',GradientType=1 );

}
.gradiente-esquerda{
    background: -webkit-linear-gradient(right, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: -moz-linear-gradient(right, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: -o-linear-gradient(right, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%);
    background: linear-gradient(to left, rgba(15,3,3,1) 0%, rgba(125,185,232,0) 100%); 
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0f0303', endColorstr='#007db9e8',GradientType=1 );

}
</style>
