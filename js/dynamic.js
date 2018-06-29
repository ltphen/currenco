/**
 * @class Dynamic
 * @description this class handled all the interaction with the user
 * 
 */
class Dynamic{
    constructor(){
        this.convertor = new Convertor("PHP", "USD", 200)
    }

    /**
     * @description this function add some specific event to DOM elemen
     * It's init the application
     */
    bootstrap(){
        this.registerSW();
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }

    /**
     * @description this function convert with the form and to currency
     */
    static fromToConvertion(){
        let result = document.querySelector("#beToBeResult b"),
            amount = document.querySelector("#amount"),
            from = document.querySelector("#from"),
            to = document.querySelector("#to");
        amount.addEventListener("keyup", ()=>{
            result.innerHTML = "Loading ... ";
            (new Convertor()).convert(from.value, to.value, amount.value, (data)=>{
                result.innerHTML = data;
            })
        })
    }

     /**
     * @description this function convert with the form and to currency
     */
    static fromOnlyConvertion(){
           let amount = document.querySelector("#amount"),
            from = document.querySelector("#from");
        let favorites = DB.localStorage().get("favorites") != undefined ? DB.localStorage().get("favorites") :  [];
        HTML.buildFavorites(favorites);
        let card = document.querySelectorAll(".card");
        if(card.length == 0) alert("Add some data to favorite please");
        amount.addEventListener("keyup", ()=>{
            if(card.length == 0) alert("Add some data to favorite please");
            for (let i = 0; i < card.length; i++) {
                const element = card[i];
                element.querySelector(".b-result").innerHTML = "Loading ...";
                (new Convertor()).convert(from.value, element.querySelector(".b-result").getAttribute("data-id"), amount.value, (data)=>{
                    element.querySelector(".b-result").innerHTML = data;
                })
            }
            
        })
    }
     /**
     * @description this add data to countries autocomplete
     */
    static countriesAutocompleteEvent(countries){
        
        document.addEventListener('DOMContentLoaded', function() {
            let currency = document.querySelectorAll('.autocomplete-countries');
            let instances = M.Autocomplete.init(currency, {
                data: countries,
            });
        });
    }

    /**
     * @description this add data to currencies autocomplete
     */
    static currenciesAutocompleteEvent(currrencies){
        let currency = document.querySelectorAll('.autocomplete-currrency');
        M.Autocomplete.init(currency, {
            data: currrencies,
        });
        this.stopLoading();
    }

    /**
     * @description this function register the service workers 
     */
    registerSW(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register("/sw.js", { scope : "/currenco/"})
            .then((reg)=>{
                console.log("Registraion succeed !");
            }).catch((error)=>{
                console.error("Error : ", error);
            })
        }
    }

    /**
     * @description This function build countries list then addfavorite on then or not
     */
    static getCountries(value){
        let favorites = DB.localStorage().get("favorites") != undefined ? DB.localStorage().get("favorites") :  [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const element = value[key];
                if(favorites.indexOf(element.currencyId) !== -1){
                    value[key]["favorite"] = true;
                }else{
                    value[key]["favorite"] = false;
                }
                document.querySelector("#countries").innerHTML+=HTML.buildCountriesHtml(value[key]);
            }
        }
        this.stopLoading();
    }

    /**
     * @description add and delete to favorite function
     */
    static toggleFavorite(currencyId, self){

        let favorites = DB.localStorage().get("favorites") != undefined ? DB.localStorage().get("favorites") :  [];
        let toggle  = HTML.toggleFavorite(self);
        if(toggle){
            favorites.push(currencyId);
        }else{
            favorites.splice(favorites.indexOf(currencyId), 1);
        }
        
        DB.localStorage().set("favorites", favorites);
    }

    /**
     * 
     * @param {Number} value list currenties with favorites
     */
    static getCurrencies(value){
        let favorites = DB.localStorage().get("favorites") != undefined ? DB.localStorage().get("favorites") :  [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const element = value[key];
                if(favorites.indexOf(element.id) !== -1){
                    value[key]["favorite"] = true;
                }else{
                    value[key]["favorite"] = false;
                }
                document.querySelector("#currenties").innerHTML+=HTML.buildCurrenciesHtml(value[key]);
            }
        }
        this.stopLoading();
    }
    
    /**
     * 
     * @description this function hide the loader
     */
    static stopLoading(){
        document.querySelector(".preloader-wrapper").classList.remove("active");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    let a = new Dynamic();
    a.bootstrap();
});


