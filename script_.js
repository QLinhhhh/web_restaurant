const LINK = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

const mainSection = document.getElementById("section");
let total = 0;

const meals = [
    {
        name: "Beef",
        vietsub: "Thịt bò"
    },
    {
        name: "Chicken",
        vietsub: "Thịt gà"
    },
    {
        name: "Pork",
        vietsub: "Thịt lợn"
    },
    {
        name: "Seafood",
        vietsub: "Hải sản"
    },
    {
        name: "Lamb",
        vietsub: "Thịt cừu"
    },
    {
        name: "Pasta",
        vietsub: "Mì ống"
    },
    {
        name: "Dessert",
        vietsub: "Món tráng miệng"
    },
    {
        name: "Vegan",
        vietsub: "Đồ ăn chay"
    },
    {
        name: "Breakfast",
        vietsub: "Đồ ăn sáng"
    }
]

async function returnAllMeals() {
    for (let i = 0; i < meals.length; i++) {
        let APILINK = LINK + meals[i].name;
        await returnMeals(APILINK, meals[i].vietsub);
    }
}

async function returnMeals(url, name) {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        if (!data.meals) return;
        let topMeals = null;
        if (data.meals.length > 10) topMeals = data.meals.slice(0, 12);
        else {
            topMeals = data.meals.slice(0, 10);
        }
        
        const categoryBlock = document.createElement('div');
        categoryBlock.className = 'category-block';
        
        categoryBlock.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">${name}</h2>
                <span class="category-count">${topMeals.length} món</span>
            </div>
            <div class="row"></div>
        `;
        
        const row = categoryBlock.querySelector('.row');
        
        topMeals.forEach(meal => {
            const column = document.createElement('div');
            column.className = 'column';
            const rawPrice = Math.floor(Math.random() * 46 + 5) * 10000;
            const displayPrice = rawPrice.toLocaleString('vi-VN');
            
            column.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" class="thumbnail" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p class="desc">Mô tả đặc trưng chuẩn vị nhà hàng.</p>
                    <strong class="price">${displayPrice}</strong>
                </div>
            `;
            
            row.appendChild(column);
        });
        
        mainSection.appendChild(categoryBlock);
    })
    .catch(err => console.error("Lỗi tải dữ liệu:", err));
}

returnAllMeals();