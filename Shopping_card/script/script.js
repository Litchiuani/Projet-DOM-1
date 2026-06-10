// script.js — Shopping Cart DOM Events

// ── Sélectionner le prix total ──
const totalElement = document.querySelector(".total");

// ── Sélectionner toutes les cartes produits ──
const cards = document.querySelectorAll(".card-body .card");

// ── Variable pour stocker le prix total ──
let total = 0;

// ── Fonction : mettre à jour le prix total ──
function updateTotal() {
  total = 0;

  // Parcourir toutes les cartes encore présentes dans le DOM
  document.querySelectorAll(".card-body .card").forEach(card => {
    // Récupérer le prix unitaire (ex: "100 $" → 100)
    const unitPriceText = card.querySelector(".unit-price").textContent;
    const unitPrice = parseInt(unitPriceText);

    // Récupérer la quantité actuelle
    const quantity = parseInt(card.querySelector(".quantity").textContent);

    // Ajouter au total
    total += unitPrice * quantity;
  });

  // Afficher le nouveau total
  totalElement.textContent = total + " $";
}

// APPLIQUER LES EVENTS SUR CHAQUE CARTE

cards.forEach(card => {

  // ── Récupérer les éléments de la carte ──
  const plusBtn    = card.querySelector(".fa-plus-circle");
  const minusBtn   = card.querySelector(".fa-minus-circle");
  const trashBtn   = card.querySelector(".fa-trash-alt");
  const heartBtn   = card.querySelector(".fa-heart");
  const quantityEl = card.querySelector(".quantity");

  // BOUTON "+" — Augmenter la quantité
  
  plusBtn.addEventListener("click", function () {
    // Récupérer la quantité actuelle et l'augmenter de 1
    let quantity = parseInt(quantityEl.textContent);
    quantity++;
    quantityEl.textContent = quantity;

    // Mettre à jour le prix total
    updateTotal();
  });

  
  // BOUTON "-" — Diminuer la quantité
  
  minusBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityEl.textContent);

    // Ne pas descendre en dessous de 0
    if (quantity > 0) {
      quantity--;
      quantityEl.textContent = quantity;

      // Mettre à jour le prix total
      updateTotal();
    }
  });

  
  // BOUTON POUBELLE — Supprimer la carte

  trashBtn.addEventListener("click", function () {
    // Remonter jusqu'au parent .card-body pour supprimer toute la carte
    const cardBody = card.closest(".card-body");
    cardBody.remove();

    // Recalculer le total après suppression
    updateTotal();
  });

  // BOUTON COEUR — Aimer / ne plus aimer

  heartBtn.addEventListener("click", function () {
    // Toggle : si rouge → noir, si noir → rouge
    if (heartBtn.style.color === "red") {
      heartBtn.style.color = "black";
    } else {
      heartBtn.style.color = "red";
    }
  });

});