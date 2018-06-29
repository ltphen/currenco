/**
 * @class API
 * @description this class containt all the url we can calll to interact with the api
 */

class API {
    constructor(){
        this.base = "https://free.currencyconverterapi.com";
        this.urls = {
            currencies : "/api/v5/currencies",
            countries : "/api/v5/countries",
            call : "/api/v5/convert"
        }
        this.format();
    }

    /**
     * @description this function format url by adding base to specific routes
     */
    format(){
      
    }

    /**
     * 
     * @param {String} from the from currency
     * @param {String} to The to currency from the api
     * @returns JSON
     */
    convert(from, to){
        return fetch(`${this.base+this.urls.call}?q=${from}_${to}&compact=ultra`).then((response)=> response.json());
    }

    /**
     * This function get the the countries 
     */
    countries(){
        return fetch(`${this.base+this.urls.countries}`).then((response)=> response.json());
    }

    /**
     * This function get all the currencies
     */
    currencies(){
        return fetch(`${this.base+this.urls.currencies}`).then((response)=> response.json());
    }
}