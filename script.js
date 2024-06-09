const productList = document.getElementById('container')
console.log(productList);
async function fetchQuery(){
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()

    data.products.map(product => {
        const productCard = document.createElement('div')
        productCard.classList.add('productCard')
        const cardTitle = document.createElement('h3')
        cardTitle.textContent = product.title;

        const cardImage = document.createElement('img')
        cardImage.src = product.images[0] 
        cardImage.classList.add('cardImage')

        const cardDescription = document.createElement('p')
        cardDescription.textContent = product.description
         
        
        productCard.append(cardTitle, cardImage, cardDescription)
        productList.append(productCard)
    })
}
fetchQuery()