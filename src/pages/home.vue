<template>
  <section>
    <Slider/>
    <Events/>
    <EventDetail/>
  </section>
</template>

<script>
import Slider from "../components/slider";
import Events from "../components/events";
import EventDetail from "../components/eventdetail";

export default {
  name: "Home",
  components: {
    Slider,
    Events,
    EventDetail
  }
};
</script>

