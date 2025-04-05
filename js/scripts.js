document.addEventListener("DOMContentLoaded", () => {
  fetch("funko_pops.csv")
    .then((response) => response.text())
    .then((csvText) => {
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      const products = parsed.data;
      window.allProducts = products;

      console.log("Parsed data:", products);

      window.renderProductCards = function (productArray) {
        const container = document.getElementById("product-container");
        container.innerHTML = "";

        const template = document.getElementById("product-template");

        productArray.forEach((product) => {
          const clone = template.content.cloneNode(true);
          const card = clone.querySelector(".product-card");

          const isChase = String(product.Chase).trim().toUpperCase() === "TRUE";
          const isGlow =
            String(product["Glow in the dark"]).trim().toUpperCase() === "TRUE";

          const chaseElement = clone.getElementById("product-chase");
          chaseElement.textContent = `Chase: ${isChase}`;
          chaseElement.classList.add(isChase ? "chase" : "chase-false");

          const glowElement = clone.getElementById("product-glow");
          glowElement.textContent = `Glow: ${isGlow}`;
          glowElement.classList.add(isGlow ? "glow" : "glow-false");

          clone.getElementById("product-name").textContent =
            product.name || "Unnamed";

          clone.getElementById("product-franchise").textContent = `Franchise: ${
            product.franchise || "N/A"
          }`;

          clone.getElementById(
            "product-value"
          ).textContent = `Estimated Value: $${
            product.estimated_value || "N/A"
          }`;

          clone.getElementById(
            "product-number"
          ).textContent = `Product Number: ${product.number || "N/A"}`;

          // clone.getElementById("product-chase").textContent = `Chase`;
          // clone.getElementById("product-glow").textContent = `Glow`;
          clone.getElementById("product-chase").textContent = isChase
            ? "Chase"
            : "";
          clone.getElementById("product-glow").textContent = isGlow
            ? "Glow"
            : "";

          const image = clone.getElementById("product-image");
          image.src = product.image_no_box || "images/default.jpg";
          image.alt = product.name || "Funko Pop";
          image.dataset.nobox = product.image_no_box;
          image.dataset.box = product.image_box;

          clone.getElementById("product-link").href = product.url || "#";

          container.appendChild(clone);
        });
      };

      // Initial render
      window.renderProductCards(products.slice(0, 1000));
    });
});
