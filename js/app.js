/**
 * @class Convertor
 * @description This class help to convert and interact with the convertor API
 * @author @LTPhen
 */


class Convertor{

    /**
     * 
     * @param {String} from The currency from where we are converting
     * @param {String} to The currency to convert to
     * @param {Number} amount The value we wanna convert
     */
    constructor(from, to, amount){
        this._from = from;
        this._to = to;
        this._amount = amount;
        this.api = new API();
        this._countriesAutocomplete = {};
        this._currenciesAutocomplete = {};
        this._db = (new DB()).interface();
        this.illustration = 'https://placehold.it/250x250';
        //this.init();
    }
    /**
     * Setter function
     */
    set from(from){
        this._from = from;
    }
    /**
     * Setter function
     */
    set to(to){
        this._to = to;
    }

    /**
     * Setter function
     */
    set amount(amount){
        this._amount = amount;
    }

    /**
     * 
     * @param {String} from the from currency
     * @param {String} to The to currency from the api
     * @returns JSON
     */
    convert(from = this._form, to = this._to, amount = this._amount, fn){
        this.api.convert(from, to).then((response)=>{
           fn(response[`${from}_${to}`]*amount);
        })
    }

    /**
     * @description this function initialise autocomplete fields as countiers, currencies
     */
    initAutocomplete(){
        this._db.get("currencies").then((data)=>{
            if(data){
                // calling the api to fecth currencies
                const result =  data.results;
                for (const instance in result) {
                    if (result.hasOwnProperty(instance)) {
                        const element =result[instance];
                        this._currenciesAutocomplete[element.id] = this.illustration;
                    }
                }
                Dynamic.currenciesAutocompleteEvent(this._currenciesAutocomplete);
                
                return;
            }
                 // calling the api to fecth currencies
            this.api.currencies().then((response)=>{
                const result =  response.results;
                this._db.set("currencies", response);
                for (const instance in result) {
                    if (result.hasOwnProperty(instance)) {
                        const element =result[instance];
                        this._currenciesAutocomplete[element.id] = this.illustration;
                    }
                }
                Dynamic.currenciesAutocompleteEvent(this._currenciesAutocomplete);
            })
        })
       
        
    }

    initCountries(){
        this._db.get("countries").then((data)=>{
            if(data){
                const result =  data.results;
                
                Dynamic.getCountries(result);
                return;
            }
            // calling the api to fecth countries
            this.api.countries().then((response)=>{
                const result =  response.results;
                this._db.set("countries", response);
                
                Dynamic.getCountries(result);
            })
        });
    }

    initCurrencies(){
        this._db.get("currencies").then((data)=>{
            if(data){
                const result =  data.results;
                
                Dynamic.getCurrencies(result);
                return;
            }
            // calling the api to fecth countries
            this.api.currencies().then((response)=>{
                const result =  response.results;
                this._db.set("currencies", response);
                
                Dynamic.getCurrencies(result);
            })
        });
    }
}