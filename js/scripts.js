document.addEventListener("DOMContentLoaded", () => {
  fetch("funko_pops.csv")
    .then((response) => response.text())
    .then((csvText) => {
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      const products = parsed.data;

      // ✅ Make products globally accessible
      window.allProducts = products;

      console.log("Parsed data:", products); // ✅ Move inside the .then()

      // ✅ Define a reusable function to render products
      window.renderProductCards = function (productArray) {
        const container = document.getElementById("product-container");
        container.innerHTML = ""; // clear existing content

        const template = document.getElementById("product-template");

        productArray.forEach((product) => {
          const clone = template.content.cloneNode(true);

          clone.getElementById("product-name").textContent =
            product.name || "Unnamed";

          // Optional: keep this disabled if you’re not using the character field
          // clone.getElementById("product-character").textContent = `Character: ${
          //   product.character || "Unknown"
          // }`;

          clone.getElementById("product-franchise").textContent = `Franchise: ${
            product.franchise || "N/A"
          }`;

          clone.getElementById(
            "product-value"
          ).textContent = `Estimated Value: $${
            product.estimated_value || "N/A"
          }`;

          // clone.getElementById("product-trend").textContent = `Price Trend: ${
          //   product.price_trend || "N/A"
          // }`;

          clone.getElementById(
            "product-number"
          ).textContent = `Product Number: ${product.number || "N/A"}`;

          const image = clone.getElementById("product-image");
          image.src = product.image_no_box || "images/default.jpg";
          image.alt = product.name;
          image.dataset.nobox = product.image_no_box;
          image.dataset.box = product.image_box;

          clone.getElementById("product-link").href = product.url || "#";

          container.appendChild(clone);
        });
      };

      // ✅ Initially render the first 500 products
      window.renderProductCards(products.slice(0, 1000));
    });
});
