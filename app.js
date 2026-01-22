// ================================
// RECIPE DATA
// ================================
const recipes = [
    { title: "Pasta Alfredo", time: 25, difficulty: "easy", description: "Creamy Italian pasta." },
    { title: "Chicken Curry", time: 45, difficulty: "medium", description: "Spicy Indian curry." },
    { title: "Veg Sandwich", time: 10, difficulty: "easy", description: "Quick snack." },
    { title: "Beef Steak", time: 50, difficulty: "hard", description: "Juicy grilled steak." },
    { title: "Fried Rice", time: 20, difficulty: "easy", description: "Classic fried rice." },
    { title: "Paneer Butter Masala", time: 35, difficulty: "medium", description: "Rich paneer curry." },
    { title: "Fish Fry", time: 30, difficulty: "medium", description: "Crispy fried fish." },
    { title: "Biryani", time: 60, difficulty: "hard", description: "Aromatic rice dish." }
];

// ================================
// STATE
// ================================
let currentFilter = "all";
let currentSort = "none";

// ================================
// DOM
// ================================
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortButtons = document.querySelectorAll(".sort-btn");

// ================================
// RENDER FUNCTIONS
// ================================
const createRecipeCard = (recipe) => `
    <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <span class="badge ${recipe.difficulty}">${recipe.difficulty}</span>
        <p>${recipe.description}</p>
        <p><strong>Time:</strong> ${recipe.time} min</p>
    </div>
`;

const renderRecipes = (list) => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join("");
};

// ================================
// FILTER FUNCTIONS (PURE)
// ================================
const applyFilter = (list, filter) => {
    switch (filter) {
        case "easy":
        case "medium":
        case "hard":
            return list.filter(r => r.difficulty === filter);
        case "quick":
            return list.filter(r => r.time < 30);
        default:
            return list;
    }
};

// ================================
// SORT FUNCTIONS (PURE)
// ================================
const applySort = (list, sort) => {
    if (sort === "name") {
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "time") {
        return [...list].sort((a, b) => a.time - b.time);
    }
    return list;
};

// ================================
// UI UPDATE
// ================================
const updateActiveButtons = () => {
    filterButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.filter === currentFilter)
    );

    sortButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.sort === currentSort)
    );
};

// ================================
// MAIN DISPLAY LOGIC
// ================================
const updateDisplay = () => {
    let result = applyFilter(recipes, currentFilter);
    result = applySort(result, currentSort);
    renderRecipes(result);

    console.log(`Filter: ${currentFilter}, Sort: ${currentSort}`);
};

// ================================
// EVENT HANDLERS
// ================================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        updateActiveButtons();
        updateDisplay();
    });
});

sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentSort = btn.dataset.sort;
        updateActiveButtons();
        updateDisplay();
    });
});

// ================================
// INIT
// ================================
updateDisplay();
