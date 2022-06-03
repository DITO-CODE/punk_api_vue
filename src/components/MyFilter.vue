<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon> mdi-filter</v-icon> Filters
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="applyFilters"> Apply </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Alcohol content on beer
                {{ alcoholContent.val }} %</v-list-item-title
              >
              <v-slider
                v-model="alcoholContent.val"
                :color="alcoholContent.color"
                max="50"
              ></v-slider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >International Bitterness Units
                {{ ibu.val }} </v-list-item-title
              >
              <v-slider
                v-model="ibu.val"
                :color="ibu.color"
                max="100"
              ></v-slider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >
                <v-checkbox
                  v-model="checkboxBb"
                  :label="`Brewed Before`"
                ></v-checkbox
              ></v-list-item-title>
              <v-menu v-if="checkboxBb"
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="brewedBefore"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="brewedBefore"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="brewedBefore" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(brewedBefore)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-list-item-content>
          </v-list-item>
             <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >
                <v-checkbox
                  v-model="checkboxBa"
                  :label="`Brewed After`"
                ></v-checkbox
              ></v-list-item-title>
              <v-menu v-if="checkboxBa"
                ref="menuAfter"
                v-model="menuAfter"
                :close-on-content-click="false"
                :return-value.sync="brewedAfter"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="brewedAfter"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="brewedAfter" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuAfter = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menuAfter.save(brewedAfter)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Food Paring</v-list-item-title
              >
               <v-text-field label="Example: Bacon" v-model="foodParing">
          </v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>

           <v-btn  @click="applyFilters"> Apply </v-btn>
     
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {parseDate} from '../utils';

export default {
  data() {
    return {
      alcoholContent: { val: 0, color: "orange darken-3" },
      ibu: { val: 0, color: "orange darken-3" },
      dialog: false,
      checkboxBb: false,
      checkboxBa: false,
      notifications: false,
      foodParing: '',
      sound: true,
      widgets: false,
      brewedBefore:  (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
       brewedAfter:  (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      menuAfter: false
    };
  },
  methods: {
    applyFilters() {
      let filters = {};

      if (this.alcoholContent.val) {
        filters.alcoholContent = this.alcoholContent.val;
      }

      if (this.ibu.val) {
        filters.ibu = this.ibu.val;
      }

      if(this.checkboxBb){
        filters.brewedBefore = parseDate(this.brewedBefore);
      }

      if(this.checkboxBa){
        filters.brewedAfter = parseDate(this.brewedAfter);
      }

      if(this.foodParing.trim() !== ""){
        filters.foodParing = this.foodParing;
      }

      this.dialog = false;
      this.$store.dispatch("setFiltersFromModalAction", filters);
    },
  },
};
</script>
