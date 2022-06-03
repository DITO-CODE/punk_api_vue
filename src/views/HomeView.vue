<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Search" @input="search" v-model="searchTxt">
            <v-icon slot="append"> mdi-magnify </v-icon>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <MyFilter />
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <v-btn
          :disabled="$store.state.page === 1"
          @click="setPage($store.state.page - 1)"
          >
            <v-icon> mdi-arrow-left</v-icon>
          </v-btn>
          Pag. {{ $store.state.page }}
          <v-btn 
          :disabled="$store.state.beers.length === 0"
          @click="setPage($store.state.page + 1)">
            <v-icon> mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="$store.state.beers.length">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Tag Line</th>
                  <th class="text-left">ABV</th>
                  <th class="text-left">IBU</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in $store.state.beers" :key="item.id">
                  <td>
                    <v-icon v-if="!item.image_url"> mdi-image-remove</v-icon>
                    <v-img v-if="item.image_url" class="imgBeer" :src="item.image_url"> </v-img>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.tagline }}</td>

                  <td>
                    {{ item.abv }}
                  </td>
                  <td>
                    {{ item.ibu }}
                  </td>
                  <td>
                    <v-btn elevation="2" fab @click="setBeer(item)">
                      <v-icon> mdi-eye</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MyFilter from "../components/MyFilter.vue";

export default {
  name: "HomeView",
  components: {
    MyFilter,
  },
  data: () => {
    return {
      msg: "Welcome to Your Vue.js App",
      searchTxt: "",
    };
  },
  methods: {
    getBeers() {
      this.$store.dispatch("getBeersAction");
    },
    setBeer(item) {
      this.$store.dispatch("setBeerSelectedAction", item);
    },
    search() {
      console.log(this.searchTxt);
      if (this.searchTxt.trim().length > 3) {
        console.log("Entra a buscar por texto");
        this.$store.dispatch("setFilterSearchTxtAction", this.searchTxt);
      }

      if (this.searchTxt.trim().length == 0) {
        this.$store.dispatch('clearSearchTextAction');
        this.getBeers();
      }
    },
    setPage(page){
      this.$store.dispatch("setPageAction", page);
    }
  },
  beforeMount() {
    this.getBeers();
  },
};
</script>
