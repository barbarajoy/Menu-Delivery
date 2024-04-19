const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

cartBtn.addEventListener("click", function (){
  cartModal.style.display = "flex"
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
  if(event.target === cartModal){
    cartModal.style.display = "none"
  }
})

closeModalBtn.addEventListener("click", function(){
  cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
  let parentButton = event.target.closest(".add-to-cart-button")
  if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    //Adicionar no carrinho
    addToCart(name, price)

  }
})

//Função para add no carrinho
function addToCart(name, price){
  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    //Se o item já existe, vamos alterar a quantidade
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    })
  }

  updateCartModal()

}

//Atualizar carrinho
function updateCartModal(){
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price}</p>
        </div>
          <button>
            Remover
          </button>

      </div>
    `

    cartItemsContainer.appendChild(cartItemElement);

  })
}
