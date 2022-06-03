<template>
  <v-container>
    <v-layout row>
      <v-col cols="12">
        <v-btn elevation="2" fab @click="returnHome">
          <v-icon> mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-flex xs12 class="d-flex d-sm-none">
        <h1>{{ $store.state.beerSelected.name }}</h1>
      </v-flex>
      <v-flex xs12 class="d-flex d-sm-none">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 md6>
         <v-icon v-if="!$store.state.beerSelected.image_url"> mdi-image-remove</v-icon>
        <v-img v-if="$store.state.beerSelected.image_url"
          class="mx-auto"
          max-height="2000"
          max-width="150"
          :src="$store.state.beerSelected.image_url"
        ></v-img>
      </v-flex>
      <v-flex xs12 md6>
        <v-row>
          <v-col cols="12" class="d-none d-sm-flex">
            <h1>{{ $store.state.beerSelected.name }}</h1>
          </v-col>
          <v-col cols="12" class="d-none d-sm-flex">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="text-left">
            <h3>{{ $store.state.beerSelected.description }}</h3>
          </v-col>
          <v-col cols="12" class="d-none d-sm-flex">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="text-left">
            <label class="caption">Tips:</label>
          </v-col>
          <v-col cols="12" class="text-left">
            {{ $store.state.beerSelected.brewers_tips }}
          </v-col>
            <v-col cols="12" class="d-none d-sm-flex">
            <v-divider></v-divider>
          </v-col>
           <v-col cols="12" class="text-left"
           v-if=" $store.state.beerSelected.food_pairing &&  $store.state.beerSelected.food_pairing.length"
           >
            <label class="caption">Food Paring:</label>
          </v-col>
          <v-col cols="12" class="text-left"   v-if="$store.state.beerSelected.food_pairing &&  $store.state.beerSelected.food_pairing.length">
        
            <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in $store.state.beerSelected.food_pairing"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
          </v-col>
          
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "../router";

export default {
  name: "AboutView",
  data: () => {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    checkBeer() {
      if (!this.$store.state.beerSelected) {
        router.push("/");
      }
    },
    returnHome() {
      router.push("/");
    },
  },
  beforeMount() {
    this.checkBeer();
  },
};
</script>
