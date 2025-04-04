document.addEventListener("DOMContentLoaded", () => {
  let showBoxImages = false;

  const toggleButton = document.getElementById("toggle-image-mode");
  toggleButton.addEventListener("click", () => {
    showBoxImages = !showBoxImages;
    const cards = document.querySelectorAll(".product-card");

    cards.forEach((card) => {
      const image = card.querySelector("img");
      const boxImage = image.dataset.box;
      const noBoxImage = image.dataset.nobox;

      image.src = showBoxImages ? boxImage : noBoxImage;
    });

    toggleButton.textContent = showBoxImages ? "Show No Box" : "Show Box";
  });
});
