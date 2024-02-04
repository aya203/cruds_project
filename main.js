let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let deletell = document.getElementById("deleteall")
 

let mood = 'create';
let sign;

//make total
function gettotal() {
    if (price.value !== "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = " #cc3300";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#0099ff";
    }
}
//make create
let savepro;
if (localStorage.getItem("savedata") !== null) {
    savepro = JSON.parse(localStorage.getItem("savedata"));
} else {
    savepro = [];
}
create.onclick = function() {
    let getproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' 
    && price.value != ''
    && category.value != ''
    && count.value < 101){
        if(mood === 'create'){    
            if(getproduct.count > 1){
                for(let i = 0; i < getproduct.count; i++){
                    savepro.push(getproduct)
                }
            }else{
                savepro.push(getproduct)
            }
        }else{
            savepro[sign] = getproduct;
            create.innerHTML = 'Create';
            count.style.display = "block";
        }
        clearproduct();
    }       
    // savepro.push(getproduct)
    deletell.innerHTML = `Delete All {${savepro.length}} `    

    localStorage.setItem("savedata", JSON.stringify(savepro));
    showproduct();
    // clearproduct();
    gettotal();
}
showproduct();
//clear products
function clearproduct() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//show product
// showproduct();
function showproduct() {
    let taple = '';
    for (let i = 0; i < savepro.length; i++) {
        taple += `
        <tr>
        <td>${i}</td>
        <td>${savepro[i].title.toLowerCase()}</td>
        <td>${savepro[i].price}</td>
        <td>${savepro[i].taxes}</td>
        <td>${savepro[i].ads}</td>
        <td>${savepro[i].discount}</td>
        <td>${savepro[i].total}</td>
        <td>${savepro[i].count}</td>
        <td>${savepro[i].category.toLowerCase()}</td>
        <td><button onclick="getupdate(${i})" id="update">update</button>
        </td>
        <td><button onclick="deleteelement(${i})" id="delete">delete</button></td>
        </th>
        </tr>`;
    }
    document.querySelector("tbody").innerHTML = taple
    // deleteallproducts()
    if(savepro.length > 0){
      deletell.style.display = "block";
    }else{
      deletell.style.display = 'none'
    }
    gettotal();
}
//make delete
function deleteelement(i) {
    savepro.splice(i,1);
    localStorage.savedata = JSON.stringify(savepro);
    showproduct();
}
// delete all
deleteallproducts();

function deleteallproducts(){
  deletell.onclick = function(){

    savepro.splice(0);
    localStorage.savedata = JSON.stringify(savepro);
    showproduct();
  }
}
// make update
function getupdate(i){
    title.value = savepro[i].title
    price.value = savepro[i].price
    taxes.value = savepro[i].taxes
    ads.value = savepro[i].ads
    discount.value = savepro[i].discount
    gettotal();
    category.value = savepro[i].category
    count.style.display = 'none';
    create.innerHTML = "Update";
    scroll({
        top: 0,
        behavior: "smooth",
    })
    mood = 'update';
    sign = i;
    showproduct();
}
showproduct();
//make search
let searchmood = 'title';
let search = document.getElementById("search")
function makesearchmood(id){
    if(id === 'title'){
        searchmood = 'title'
    }else{
        searchmood = 'category'
    }
    search.placeholder = "search by " + searchmood
    search.focus();
    search.value = ''
    showproduct()
} 
function makesearch(value){
    let taple = ''
    for(let i = 0; i < savepro.length; i++){
        if(searchmood === 'title' ){
            if(savepro[i].title.includes(value.toLowerCase())){
                taple += `
                <tr>
                <td>${i + 1}</td>
                <td>${savepro[i].title}</td>
                <td>${savepro[i].price}</td>
                <td>${savepro[i].taxes}</td>
                <td>${savepro[i].ads}</td>
                <td>${savepro[i].discount}</td>
                <td>${savepro[i].total}</td>
                <td>${savepro[i].count}</td>
                <td>${savepro[i].category}</td>
                <td><button onclick="getupdate(${i})" id="update">update</button>
                </td>
                <td><button onclick="deleteelement(${i})" id="delete">delete</button></td>
                </th>
                </tr>`;
            }
        }
        else{        
            if(savepro[i].category.includes(value.toLowerCase())){
                taple += `
                <tr>
                <td>${i}</td>
                <td>${savepro[i].title}</td>
                <td>${savepro[i].price}</td>
                <td>${savepro[i].taxes}</td>
                <td>${savepro[i].ads}</td>
                <td>${savepro[i].discount}</td>
                <td>${savepro[i].total}</td>
                <td>${savepro[i].count}</td>
                <td>${savepro[i].category}</td>
                <td><button onclick="getupdate(${i})" id="update">update</button>
                </td>
                <td><button onclick="deleteelement(${i})" id="delete">delete</button></td>
                </th>
                </tr>`;
            }
        }
    }    
    document.querySelector("tbody").innerHTML = taple    
}
