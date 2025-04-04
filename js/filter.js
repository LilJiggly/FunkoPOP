// document.addEventListener("DOMContentLoaded", () => {
//   function waitForProducts() {
//     if (!window.allProducts || !window.renderProductCards) {
//       return setTimeout(waitForProducts, 50); // keep waiting until it's ready
//     }

//     initFilters(); // when ready, start filters
//   }

//   waitForProducts();

//   function initFilters() {
//     const searchInput = document.getElementById("search-bar");
//     const franchiseDropdown = document.getElementById("franchise-filter");

//     // Populate dropdown
//     const franchises = [
//       ...new Set(window.allProducts.map((p) => p.franchise).filter((f) => f)),
//     ];
//     franchises.sort();
//     franchises.forEach((f) => {
//       const option = document.createElement("option");
//       option.value = f;
//       option.textContent = f;
//       franchiseDropdown.appendChild(option);
//     });

//     function filterProducts() {
//       const searchValue = searchInput.value.toLowerCase();

//       const selectedFranchise = franchiseDropdown.value;

//       const filtered = window.allProducts.filter((product) => {
//         const matchesSearch =
//           (product.name && product.name.toLowerCase().includes(searchValue)) ||
//           (product.character &&
//             product.character.toLowerCase().includes(searchValue));

//         const matchesFranchise =
//           selectedFranchise === "all" ||
//           product.franchise === selectedFranchise;

//         return matchesSearch && matchesFranchise;
//       });

//       window.renderProductCards(filtered.slice(0, 100));
//     }

//     searchInput.addEventListener("input", filterProducts);
//     franchiseDropdown.addEventListener("change", filterProducts);
//   }
// });

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", () => {
//   function waitForProducts() {
//     if (!window.allProducts || !window.renderProductCards) {
//       return setTimeout(waitForProducts, 50);
//     }

//     initFilters();
//   }

//   waitForProducts();

//   function initFilters() {
//     const searchInput = document.getElementById("search-bar");
//     const franchiseDropdown = document.getElementById("franchise-filter");
//     const sortDropdown = document.getElementById("sort-filter");

//     // Populate franchise dropdown
//     const franchises = [
//       ...new Set(window.allProducts.map((p) => p.franchise).filter(Boolean)),
//     ];
//     franchises.sort();
//     franchises.forEach((f) => {
//       const option = document.createElement("option");
//       option.value = f;
//       option.textContent = f;
//       franchiseDropdown.appendChild(option);
//     });

//     function filterProducts() {
//       const searchValue = searchInput.value.toLowerCase();
//       const selectedFranchise = franchiseDropdown.value;
//       const selectedSort = sortDropdown.value;

//       const filtered = window.allProducts.filter((product) => {
//         const matchesFranchise =
//           selectedFranchise === "all" ||
//           product.franchise === selectedFranchise;

//         if (searchValue.startsWith("#")) {
//           const numberSearch = searchValue.slice(1);
//           return (
//             matchesFranchise &&
//             product.number &&
//             product.number.toString().includes(numberSearch)
//           );
//         }

//         const matchesSearch =
//           (product.name && product.name.toLowerCase().includes(searchValue)) ||
//           (product.character &&
//             product.character.toLowerCase().includes(searchValue)) ||
//           (product.franchise &&
//             product.franchise.toLowerCase().includes(searchValue));

//         return matchesSearch && matchesFranchise;
//       });

//       // Sort
//       filtered.sort((a, b) => {
//         const getPrice = (p) => parseFloat(p.price) || 0;
//         const getNumber = (p) => parseInt(p.number) || 0;

//         if (selectedSort === "az") {
//           return a.name.localeCompare(b.name);
//         } else if (selectedSort === "za") {
//           return b.name.localeCompare(a.name);
//         } else if (selectedSort === "priceLow") {
//           return getPrice(a) - getPrice(b);
//         } else if (selectedSort === "priceHigh") {
//           return getPrice(b) - getPrice(a);
//         } else if (selectedSort === "numberLow") {
//           return getNumber(a) - getNumber(b);
//         } else if (selectedSort === "numberHigh") {
//           return getNumber(b) - getNumber(a);
//         }
//         return 0;
//       });

//       window.renderProductCards(filtered.slice(0, 100));
//     }

//     searchInput.addEventListener("input", filterProducts);
//     franchiseDropdown.addEventListener("change", filterProducts);
//     sortDropdown.addEventListener("change", filterProducts);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  function waitForProducts() {
    if (!window.allProducts || !window.renderProductCards) {
      return setTimeout(waitForProducts, 50);
    }
    initFilters();
  }

  waitForProducts();

  function initFilters() {
    const searchInput = document.getElementById("search-bar");
    const franchiseDropdown = document.getElementById("franchise-filter");
    const sortDropdown = document.getElementById("sort-filter");

    // Populate franchise dropdown
    const franchises = [
      ...new Set(window.allProducts.map((p) => p.franchise).filter(Boolean)),
    ];
    franchises.sort();
    franchises.forEach((f) => {
      const option = document.createElement("option");
      option.value = f;
      option.textContent = f;
      franchiseDropdown.appendChild(option);
    });

    function filterProducts() {
      const searchValue = searchInput.value.toLowerCase();
      const selectedFranchise = franchiseDropdown.value;
      const selectedSort = sortDropdown.value;

      let filtered = window.allProducts.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const character = product.character?.toLowerCase() || "";
        const franchise = product.franchise?.toLowerCase() || "";
        const number = product.number?.toString().toLowerCase() || "";

        const matchesSearch =
          name.includes(searchValue) ||
          character.includes(searchValue) ||
          franchise.includes(searchValue) ||
          number.includes(searchValue);

        const matchesFranchise =
          selectedFranchise === "all" ||
          product.franchise === selectedFranchise;

        return matchesSearch && matchesFranchise;
      });

      // Safely parse values
      const getPrice = (p) =>
        parseFloat(p.price?.toString().replace(/[^0-9.]/g, "")) || 0;
      const getNumber = (p) =>
        parseInt(p.number?.toString().replace(/[^0-9]/g, "")) || 0;

      // Sort
      filtered.sort((a, b) => {
        if (selectedSort === "az") {
          return a.name.localeCompare(b.name);
        } else if (selectedSort === "za") {
          return b.name.localeCompare(a.name);
        } else if (selectedSort === "priceLow") {
          return getPrice(a) - getPrice(b);
        } else if (selectedSort === "priceHigh") {
          return getPrice(b) - getPrice(a);
        } else if (selectedSort === "numberLow") {
          return getNumber(a) - getNumber(b);
        } else if (selectedSort === "numberHigh") {
          return getNumber(b) - getNumber(a);
        }
        return 0;
      });

      window.renderProductCards(filtered.slice(0, 100));
    }

    searchInput.addEventListener("input", filterProducts);
    franchiseDropdown.addEventListener("change", filterProducts);
    sortDropdown.addEventListener("change", filterProducts);
  }
});
