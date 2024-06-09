const productList = document.querySelector('#container')
const formItems = document.querySelector('#form')
const loader = document.querySelector('#loader')

formItems.addEventListener('submit', e => {
    e.preventDefault()

    const amount = e.target.amount.value
    if (!(/^[1-9][1-9]*$/.test(amount)) || amount > 20) {
        alert('Error, input natutal number < 20')
        e.target.amount.value = '';
        return;
    }
    e.target.amount.value = '';

    while (productList.firstChild) {
        productList.removeChild(productList.firstChild)
    }

    loader.classList.toggle('loader-hide')

    setTimeout(() => {
        fetchQuery(amount)
    }, 3000)

    console.log(amount);
})

async function fetchQuery(amountProd){
    try{
        const res = await fetch(`https://dummyjson.com/products?limit=${amountProd}`)
        if(!res.ok) {
            throw new Error('HTTP error')
        }
        
        const data = await res.json()

        loader.classList.toggle('loader-hide')

        data.products.map(product => {
            const productCard = document.createElement("div")
            productCard.classList.add('productCard')

            const cardTitle = document.createElement('h3')
            cardTitle.textContent = product.title;

            const cardImage = document.createElement('img')
            cardImage.src = product.images[0]
            cardImage.classList.add('cardImage')

            const cardDescription = document.createElement('p')
            cardDescription.textContent = product.description;


            productCard.append(cardTitle, cardImage, cardDescription)
            productList.append(productCard)
        })
    } catch(error) {
        console.error("Error fetch query", error);
    }

}

