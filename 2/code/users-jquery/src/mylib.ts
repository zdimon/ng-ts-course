import $ from "jquery";

export function say(){
    let myvar = $("#myinput").val();
    console.log(`hello ${myvar}`);
}

$("#mybtn").on('click',say);