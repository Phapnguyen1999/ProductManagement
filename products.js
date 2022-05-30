
class product {
    constructor(id, name, img, price, action) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.action = action;
    }
}
let products = [
    new product(1, "Áo dài thêu hoạ tiết", "img/hoatiet.jpg", 850000),
    new product(2, "Áo dài truyền thống", "img/xua.jpeg", 1500000),
    new product(3, "Áo dài cách tân", "img/cachtan.jpeg", 450000),
    new product(4, "Áo dài cưới", "img/cuoi.png", 2100000),
    new product(5, "Áo dài trẻ em", "img/children.jpeg", 200000),
]
function getId(){
    max=0;
    for (let product of products){
        if (product.id>max){
            max=product.id;
        }
    }   
    return max;                    
}

function renderProducts() {
    let htmls = products.map(function (product) {
        return `
            <tr>
                <td>SP#${product.id}</td>
                <td>${product.name}</td>
                <td> <img src="${product.img}" alt=" " style="width: 70px;"></td>
                <td>${product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                    <button class="btn btn-warning" onclick="productEdit(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `
    })
    document.querySelector("table>tbody").innerHTML = htmls.join("");
}
renderProducts()

function addProduct() {
    let productId= getId()+1;
    let productName = document.querySelector("#name").value;
    let productImg = document.querySelector("#img").value;
    let productPrice = Number(document.querySelector("#price").value);
    let newProduct = new product(productId, productName, productImg, productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))
    products.push(newProduct)
    renderProducts()
    clearForm();
}
function productEdit(productId){
    for (let product of products){
        if (product.id==productId){
            document.querySelector("#name").value=product.name;
            document.querySelector("#img").value=product.img;
            document.querySelector("#price").value=product.price;
            document.getElementById("add").style.display = "none";
            document.getElementById("submit").style.display = "inline-block";
        }
    } 
}
function submit(productId) {
    let productName = document.querySelector("#name").value;
    let productImg = document.querySelector("#img").value;
    let productPrice = Number(document.querySelector("#price").value);
    let newProduct = new product( productName, productImg, productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))
    for (let product of products){
        if (product.id==productId){
            products.splice(productId,1,newProduct)
        
        }}
    renderProducts()
    clearForm();
} 
// function submit(){
//     let productName = document.querySelector("#name").value;
//     let productImg = document.querySelector("#img").value;
//     let productPrice = Number(document.querySelector("#price").value);
//     let newProduct = new product( productName, productImg, productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))

// }
function clearForm(){
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#price").value = "";

}

function deleteProduct(productId) {
    let confirmed = window.confirm("Are you sure to want to remove this product?");
    if (confirmed) {
        let posistion = products.findIndex(function (product) {
            return product.id == productId;
        });
        products.splice(posistion, 1);
        renderProducts();
    }
}
var index=0;
var a=document.querySelector(".image");
function changeImg(){ 
    let imgs=["img/aodaidan.jpeg","img/aodaisen.jpeg","img/aodaixanh.jpeg","img/aodaivang.jpeg","img/aodaido.jpeg"];
        a.style=`background-image: url("${imgs[index]}")`;
        a.style.transition='.1,5s'
        index++;
        if (index==4){
            index=0;
        }

}
setInterval(changeImg,4000);

function searchProduct(){
    let search=document.getElementById("search").value;
    let productSearch=products.filter(value =>{
        return value.name.toUpperCase().includes(search.toUpperCase());
    })

}