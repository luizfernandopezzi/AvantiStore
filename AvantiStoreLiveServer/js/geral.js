$(document).ready(function() {
    localStorage.clear()

    // Reading JSON, populating HTML and functionalities
    $.getJSON("product.json", function(data){
        const items = data[0].items;
        
        // Defining bannerImage, saleItems and bestSellersItems
        const bannerImage = items[0];
        const saleItems = [items[1], items[2]]
        const bestSellersItems = [items[3], items[4], items[5], items[6]]

        // Defining carousel images (swiper slide images)
        let carousel = '';
        $.each(items, function(key, value){
            carousel += '<div style="height: 200px; width: 200px" class="swiper-slide"><img src="' + value.imageURL + '" ></div>';
        });
        $('.carousel').append(carousel);

        // Defining aside banner image
        let asideImg = '<img class="sale__banner__img" src="' + bannerImage.imageURL + '" >';
        $('#sale__banner').append(asideImg);
    
        // Defining sale items cards and best sellers items cards
        saleItems.forEach(createSaleCard)
        bestSellersItems.forEach(createBestSellerCard)

        // Function that creates sale cards area: the child appended is sale item card created with cardContent function
        function createSaleCard(item,index){
            const saleCards = document.querySelector('.sale__cards')
            saleCards.appendChild(cardContent(item,index,'sale__card'))
        }

        // Function that creates best sellers cards area: the child appended is best seller item card created with cardContent function
        function createBestSellerCard(item,index){
            const bestSellerCards = document.querySelector('.best__sellers__cards')
            bestSellerCards.appendChild(cardContent(item,index,'best__seller__card'))
        }

        // Function that creates item card content
        function cardContent(item, index, classe){
            let isAvailable;
            if(item.available == 0 ? isAvailable = "Indisponível" : isAvailable = "Adicionar");
            const saleCard = document.createElement('li')
            saleCard.classList.add(classe)
            let cardContent = `
                <div class="sale-item">
                    <img class="sale__card__img" src="${item.imageURL}"/>
                    <div class="sale-item__flags">
                        <div class="flag-promotion">
                            <p class="flag-percentage flag-percentage--active">50% OFF</p>
                        </div>
                    </div>
            
                    <div class="shelf-item__specs">
                        <div class="shelf-item__colors">
                          <select tabindex="0">
                            <option selected="selected" disabled="disabled">COR</option>
                          <option data-cor="Marrom">Marrom</option></select>
                        </div>
                        <div class="shelf-item__sizes">
                          <select tabindex="0">
                            <option selected="selected" disabled="disabled">TAMANHO</option>
                          <option data-size="P">P</option><option data-size="M">M</option><option data-size="G">G</     option><option data-size="GG">GG</option><option data-size="XGG">XGG</option></select>
                        </div>
                    </div>
                </div>

                <div class="sale-item__info">
                    <h4 class="sale__description">
                        <a href="#">${item.name}</a>
                    </h4>
            
                    <div class="sale__prices">
                        <p class="sale__sellingprice"> R$ ${item.sellingPrice}</p>
                        <p class="sale__bestprice"> R$ ${item.bestPrice}</p>
                    </div>
            
                    <div class="sale__addremove__cart">
                        <button class="addremove__cart__btn remove__cart__btn" id="remove_sale${item.id}">
                            <img class="addremove__cart__img" src="/images/minus.png"/>
                        </button>
                        <input class="input__amount" id="quantity__sale__${item.id}" type="number"          placeholder="Quantidade" min="0"/>
                        <button class="addremove__cart__btn add__cart__btn" id="add_sale${item.id}">
                            <img class="addremove__cart__img" src="/images/plus.png">
                        </button>
                    </div>
            
                    ${
                        (() => {
                            if(isAvailable == "Adicionar") {
                                return `<button type="submit" class="available_btn hide">${isAvailable}</button>`;
                            } else {
                                return `<button type="submit" class="available_btn not-available_btn hide">${isAvailable}</button>`;
                            }
                        })()
                    }
                </div>

            `
            saleCard.innerHTML = cardContent
            return saleCard;
        }   

        // Creating increase item amount functionality
        const addItemBtn = document.querySelectorAll('.add__cart__btn')
        addItemBtn.forEach(addItem)
        function addItem(item,index){
            item.addEventListener('click', function(event){
                event.preventDefault()
                const inputAmount = document.querySelectorAll('.input__amount')
                if(!inputAmount[index].value){
                    inputAmount[index].value = 1;
                }else{
                    let counter = parseInt(inputAmount[index].value)
                    counter = counter + 1;
                    inputAmount[index].value = counter
                }
            })
        }   

        // Creating decrease item amount functionality
        const removeCartBtn = document.querySelectorAll('.remove__cart__btn')
        removeCartBtn.forEach(removeFromCart)
        function removeFromCart(item,index){
            item.addEventListener('click', function(event){
                event.preventDefault()
                const inputAmount = document.querySelectorAll('.input__amount')
                let counter = parseInt(inputAmount[index].value)
                counter = counter - 1
                if(counter <= 0){
                    inputAmount[index].value = 0                    
                }else{
                    inputAmount[index].value = counter
                }
            })
        }

        // Creating total cart items local storage and add to cart funcionality
        localStorage.setItem('storagedTotalItems', 0)
        const addToCartBtn = document.querySelectorAll(".available_btn")
        addToCartBtn.forEach(addToCart)
        function addToCart(item, index){
            item.addEventListener('click', function(event){
                event.preventDefault();
                if(item.innerText === 'Indisponível'){
                    return
                }else{
                    const cartTotalItems = document.querySelector(".header__minicart-total")
                    const inputAmount = document.querySelectorAll('.input__amount')
                    currentInputValue = parseInt(inputAmount[index].value)
                    if(!currentInputValue){
                        return;
                    }else{
                        if(localStorage.getItem('storagedTotalItems') == '0'){
                            localStorage.setItem('storagedTotalItems', currentInputValue)
                            let newStoragedTotalItems = localStorage.getItem('storagedTotalItems')
                            cartTotalItems.innerText = newStoragedTotalItems;
                        }else{
                            let currentStoragedTotalItems = parseInt(localStorage.getItem('storagedTotalItems'))
                            let newStoragedTotalItems = currentStoragedTotalItems + currentInputValue;
                            localStorage.setItem('storagedTotalItems', newStoragedTotalItems);
                            cartTotalItems.innerText = newStoragedTotalItems;
                        }
                    }
                }
            })
        }
    })
});