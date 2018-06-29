/**
 * @class HTML interaction with the html directly
 */

 class HTML {
     constructor(){
        
     }
    /**
     *  build the countries HTML
     */
    static buildCountriesHtml(data){
        return `<li class="collection-item avatar">
        <i class="material-icons circle ${this.allColor()}">flag</i>
        <span class="title">${data.name}</span>
        <p>${data.currencyName}<br>
           ${data.currencyId}
        </p>
        <a href="#!" data- class="secondary-content" onclick="Dynamic.toggleFavorite('${data.currencyId}', this)"><i class="material-icons">${data.favorite ? "favorite" : "favorite_border"}</i></a>
      </li>`   
    }
    /**
     *  build the countries HTML
     */
    static buildCurrenciesHtml(data){
        return `<li class="collection-item avatar">
        <i class="material-icons circle ${this.allColor()}">flag</i>
        <span class="title">${data.currencyName}</span>
        <p>${data.id}<br>
           ${data.currencySymbol}
        </p>
        <a href="#!" data- class="secondary-content" onclick="Dynamic.toggleFavorite('${data.id}', this)"><i class="material-icons">${data.favorite ? "favorite" : "favorite_border"}</i></a>
      </li>`   
    }
    /**
     * 
     * @param {String} name the favorite name
     */
    static buildFavoriteHtml(name){
        return `<div class="card">
        <div class="card-content">
            ${name} : <span id="beToBeResult"><b class="b-result" data-id="${name}"></b></span>
        </div>
    </div>`
    }
    /**
     * 
     *  build the countries HTML
     * @returns {Boolean} 
     */
    static toggleFavorite(self){
        let elem = self.querySelector("i");
        if(elem.innerHTML == "favorite"){
            elem.innerHTML = "favorite_border"; 
            return false;
        }   
        else{
            elem.innerHTML = "favorite";
            return true;
        }
    }

    static buildFavorites(favorites){
        let favorite = document.querySelector("#favorites");
        for (let i = 0; i < favorites.length; i++) {
            const element = favorites[i];
            favorite.innerHTML += this.buildFavoriteHtml(element);
        }
    }

    static allColor(){
        const colors = ["red", "blue", "purple", "pink", "teal"];
        return colors[Math.round(Math.random()*(0+colors.length-1))];
    }

   
 }