const year = document.querySelector("#year");
let yearFormat = new Date();

yearFormat = yearFormat.getFullYear();

console.log(yearFormat);
year.innerText = yearFormat;