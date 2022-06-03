import axios from "axios"
 // NOTE: Example
 /** 
  * 
  * Ocupe la libreria de axios para hacer peticiones a la API
  * tambien solo una constante para el endpoint
  */

export const CONSTANTS = {
    ENTRY_END_POINT: 'https://api.punkapi.com/v2/'
}

 // NOTE: Example
 /** 
  * 
  * Esta funcion se encarga de hacer una peticion a la API
  * asignandole los filtros que se van a realizar dependiendo
  * si en objeto "filters" se encuentra la propiedad a filtrar
  */


export async function searchByFilter(filters, page, perPage) {

    let url = CONSTANTS.ENTRY_END_POINT + 'beers?page=' + page + '&per_page=' + perPage;

    if(filters.searchTxt && filters.searchTxt.trim() !== ""){
        url += '&beer_name=' + filters.searchTxt;
    }

    if(filters.alcoholContent){
        url += '&abv_gt=' + filters.alcoholContent;
    }

    if(filters.ibu){
        url += '&ibu_gt=' + filters.ibu;
    }

    if(filters.brewedBefore){
        url += '&brewed_before=' + filters.brewedBefore;
    }

    if(filters.brewedAfter){
        url += '&brewed_after=' + filters.brewedAfter;
    }

    if(filters.foodParing){
        url += '&food=' + filters.foodParing.replaceAll(' ','_');
    }

    try {
        const response = await axios.get(url);
        return response.data
    }  catch (err) {
        return [];
    }

}

 // NOTE: Example
 /** 
  * 
  * Esta función se creo ya que el api pide en un formato especifico la fecha para los campos
  * brewed_before y brewed_after ( mm-yyyy)
  */

export function parseDate (date) {
    if (!date) return null

    let dateObj = new Date(date); 
    
     let month = dateObj.getUTCMonth() + 1; //months from 1-12
     const year = dateObj.getUTCFullYear();

     if(month < 10){
        month = "0" + month;
     }

     return `${month}-${year}`;
  }




