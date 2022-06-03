import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import { searchByFilter } from '../utils';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    page: 1,
    perPage: 10,
    beers: [],
    beerSelected: null,
    filters: {
      searchTxt: '',
      alcoholContent: 0,
      ibuContent: 0,
    }
  },
  mutations: {
    async getBeersMut(state) {
      const beers = await searchByFilter(state.filters, state.page, state.perPage);
      state.beers = beers;
    },
    setBeerSelected(state, beer) {

      // NOTE: Example
      /** 
       * 
       * Se asigna el valor de la cerveza al estado para no rener que realizar otro llamado al api.
       */
      state.beerSelected = beer;
      router.push('/about');
    },
    async setFilterSearchTxt(state, searchTxt) {
      // NOTE: Example
      /** 
       * 
       *Para realizar el filtrado por texto es necesario como minimo 4 caracteres
       */
      state.filters.searchTxt = searchTxt;
      state.page = 1;
      const beers = await searchByFilter(state.filters, state.page, state.perPage);

      state.beers = beers;
      
    },
    async setFiltersFromModal(state, filters) {

      if (state.filters.searchTxt && state.filters.searchTxt.trim() !== "") {
        filters.searchTxt = state.filters.searchTxt;
      }

      state.filters = filters;

      const beers = await searchByFilter(state.filters, state.page, state.perPage);
      state.beers = beers;
      state.page = 1;
    },
    async setPage(state, page) {
      if (page > 0) {
        state.page = page;
        const beers = await searchByFilter(state.filters, state.page, state.perPage);
        state.beers = beers;
      }
    },
    clearSearchText(state){
      state.filters.searchTxt = '';
    }

  },
  actions: {
    getBeersAction(context) {
      context.commit('getBeersMut');
    },
    setBeerSelectedAction(context, beer) {
      context.commit('setBeerSelected', beer);
    },
    setFilterSearchTxtAction(context, searchTxt) {
      context.commit('setFilterSearchTxt', searchTxt);
    },
    setFiltersFromModalAction(context, filters) {
      context.commit('setFiltersFromModal', filters);
    },
    setPageAction(context, page) {
      context.commit('setPage', page);
    },
    clearSearchTextAction(context){
      context.commit('clearSearchText');
    }

  },
})

export default store;