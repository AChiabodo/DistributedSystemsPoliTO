"use strict";

function Film(id,title,favorites=false,date=null,rating=null){
    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=date;
    this.rating=rating;
    this.str = function(){
        return `${this.id} - ${this.title} added in date : ${this.date != null ? this.date.format("YYYY-MM-DD") : "not defined"} , stars : ${this.rating!=null ? this.rating : "not inserted" }`;
    }
    this.get_stars = function(){
        let res = "";
        if (this.rating == null){
            for (let i = 0 ; i<5 ; i++){
                res += "<span class='fa fa-star'></span>";
            }
        }
        else{
            for (let i = 0 ; i<this.rating ; i++){
                res += "<span class='fa fa-star checked-star'></span>"
            }
            for (let i = this.rating ; i<5 ; i++){
                res += "<span class='fa fa-star'></span>";
            }
        }
        return res;
    }
    this.get_favorite = function(){
        let res = ""; 
        if(this.favorites){
            res += "<input class='form-check-input' type='checkbox' id='flexCheckDefault' checked>";
        }
        else{
            res += "<input class='form-check-input' type='checkbox' id='flexCheckDefault'>";
        }
        res +=  "<label class='form-check-label' for='flexCheckDefault'> Favorites </label>";
       
        return res;
    }
    this.as_row = function(){
        let stars = this.get_stars();
        return `<td>${this.title}</td> <td>${this.date != null ? this.date.format("YYYY-MM-DD") : "not watched yet"} </td> <td>${stars}</td> <td>${this.get_favorite()}</td>`;
    }
}
    

    
export default Film