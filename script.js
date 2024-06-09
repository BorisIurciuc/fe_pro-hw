const productList  = document.querySelector('#container')
const productListSelect = document.querySelector('#containerSelect')
const formItems = document.querySelector('#form')
const loader = document.querySelector('#loader')

productList.classList.toggle('container-hide')

async function getAllProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        if (!res.ok) {
            throw new Error('HTTP error')
        }
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
            cardDescription.textContent = product.description;

            productCard.append(cardTitle, cardImage, cardDescription)
            productList .append(productCard)
        })
    } catch(error) {
        console.error('fetch error', error)
    }
}
getAllProducts();

formItems.addEventListener('submit', e => {
    e.preventDefault();

    const amount = e.target.amount.value;
    if (!(/^[1-9]\d*$/.test(amount)) || amount > 20) {
        alert("Error, input natutal number <= 20")
        e.target.amount.value = ''
        return
    }
    e.target.amount.value = '';
    while (productListSelect .firstChild) {
        productListSelect.removeChild(productListSelect.firstChild)
    }
    productList.classList.add('container-hide')
    loader.classList.toggle('loader-hide')

    setTimeout(() => {
        getSelectProducts(amount)
    }, 2000)
})

async function getSelectProducts(amountProd) {
    try{
        const res = await fetch(`https://dummyjson.com/products?limit=${amountProd}`)
        if (!res.ok) {
            throw new Error('HTTP error')
        }
        const data = await res.json()
        loader.classList.toggle('loader-hide')

        data.products.map(product => {
            const productCard = document.createElement('div')
            productCard.classList.add("productCard")

            const cardTitle = document.createElement('h3')
            cardTitle.textContent = product.title

            const cardImage = document.createElement('img')
            cardImage.src = product.images[0]
            cardImage.classList.add('cardImage')

            const cardDescription = document.createElement('p')
            cardDescription.textContent = product.description;

            productCard.append(cardTitle, cardImage, cardDescription)
            productListSelect.append(productCard)
        })
    } catch (error) {
        console.error('fetch error', error)
    }
}
