<template>
  <section class="slider position-relative">
    <h5 class="text-center px-3 rounded-bottom rounded-lg">Eventos esta semana! </h5>
    <div class="col-12 p-0">
      <div class="d-flex w-100">
         <div class="col-12 col-md-3 p-2" 
              v-for="evt in eventsNear.slice(slidePag,(slidePag+slideQty))" 
              @click="showEvent(evt)" 
              @mouseover="stopSlider()"
              @mouseleave="sliderTimer()"
              :style="'background: url('+evt.cover+') center/cover no-repeat;height:280px;transition:all .5s;'"
              :key="evt.id">
              <div class="col-md-12 overlay position-absolute text-white" style="left:0;bottom:0">
                <b v-text="evt.title"></b><br>
                <small >
                  <i class="fa fa-calendar-alt mr-2"></i><span v-once>{{ moment(evt.initdate).format("DD/MM/YYYY") }}</span>
                  <span class="px-2"> | </span>  
                  <i class="fa fa-location-arrow mr-2"></i><span v-text="evt.city"></span>
                </small><br>
                <small><i class="fa fa-map-marker-alt mr-2"></i><span v-text="evt.local"></span></small><br>
              </div>
         </div>
      </div>
      <a class="arrow-item arrow-left gradiente-direita" style="left:0" 
          @click="slider(false, true)"
          v-show="(slidePag-1) >= 0">
            <i class="fa fa-chevron-left"></i>
      </a>
      <a class="arrow-item arrow-right gradiente-esquerda" style="right:0" 
         @click="slider(true, false)"
         v-show="(slidePag+1) < slidePagTotal">
            <i class="fa fa-chevron-right"></i>
      </a>
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import moment from "moment";

Vue.prototype.moment = moment;

export default {
  name:"Slider",
  data(){
    return{
      isLoading: false,
      slidePag: 0,
      slidePagTotal: 0,
      slideQty: ( window.innerWidth < 728 ? 1:4 ),
      interval: null,
      eventsNear:[]
    }
  },
  computed:{
    config: function(){ return this.$store.state.config }
  },
  mounted: function(){
    this.getEventsNear()
  },
  methods:{
     getEventsNear: function(qr){
       var self = this;
       var apiRoot = self.config.apiRoot
       var todayFilter = 'filter=initdate,gt,' + moment().format('YYYY-MM-DD')+'T00:00:00';
       var tomoFilter = 'filter=initdate,lt,' + moment().day(7).format('YYYY-MM-DD')+'T23:59:59';
       this.setLoad(true);
       return fetch( apiRoot +
         `v1/records/events_dev?${todayFilter+'&'+tomoFilter+'&'}`+
         `order=initdate,asc&page=1,20&exclude=desc`+(qr || ''))
         .then((json) => json.json()) 
         .then(function(json){ 
            self.eventsNear = json.records || []
            self.setLoad(false);
            self.sliderTimer()
            self.slider()
            return json
       })
    },
    slider: function(next, prev){
       this.slideQty = ( window.innerWidth < 728 ? 1:4)
       this.slidePagTotal = parseInt((this.eventsNear.length / this.slideQty) + (this.eventsNear.length % this.slideQty), 10)
       if( next) this.slidePag = ((this.slidePag+1) < this.slidePagTotal ? (this.slidePag+1): this.slidePag )
       if( prev ) this.slidePag = ((this.slidePag-1) >= 0 ? (this.slidePag-1): this.slidePag )
    },
    sliderTimer: function(){
       var self = this;
       if(!this.interval){
         //console.log('slider on')
         this.interval = setInterval(function(){
           if( (self.slidePag+1) < self.slidePagTotal ) self.slider(true, false); 
           else self.slidePag = 0
          }, 7000)
       }
    },
    stopSlider: function(){
      clearInterval(this.interval)
      this.interval = null
      //console.log('slider off')
    },
    setLoad: function(load) {
      var self = this;
      this.isLoading = load || false;
      setTimeout(() => (self.isLoading = false), 15000);
    },
    showEvent(evt) {
      this.$store.state.event = evt
      this.$store.commit('setEvent', evt)
    },
  }
}
</script>
<style scoped>
.slider h5{
    position: absolute;
    top: -5px;
    left: 50%;
    width: auto;
    z-index: 999;
    -webkit-transform: translate(-50%, 0);
    transform-origin: center;
    background: #fff;
}
.arrow-item{
    position:absolute;
    top: 0;
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
