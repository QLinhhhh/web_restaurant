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
                    
                    <div class="quantity-control">
                        <button class="qty-btn minus">-</button>
                        <span class="qty-value">0</span>
                        <button class="qty-btn plus">+</button>
                    </div>
                </div>
            `;
            
            row.appendChild(column);
        });
        
        mainSection.appendChild(categoryBlock);
    })
    .catch(err => console.error("Lỗi tải dữ liệu:", err));
}

mainSection.addEventListener('click', function(event) {
    let parent = event.target.parentElement.parentElement;
    let target = parent.querySelector('.price');
    let sum = target.innerText; 
    sum = parseInt(sum);
    console.log(total);
    if (event.target.classList.contains('plus')) {
        let spanValue = event.target.previousElementSibling;
        let currentNum = parseInt(spanValue.innerText);
        spanValue.innerText = currentNum + 1;
        total += sum;
    }

    else if (event.target.classList.contains('minus')) {
        let spanValue = event.target.nextElementSibling;
        let currentNum = parseInt(spanValue.innerText);
        if (currentNum > 0) {
            spanValue.innerText = currentNum - 1;
            total -= sum;
        }
    }
    MakeHtml();
    localStorage.setItem('finalTotal', total);
    console.log("Tổng tiền hiện tại:", total);
});

returnAllMeals();

const main = document.querySelector('section_');

function MakeHtml() {
    const div_card = document.createElement('div');
    let formattedSum = total.toLocaleString('vi-VN');
    div_card.innerHTML = `
            <div class="sticky-checkout-bar">
                <div class="checkout-info">
                    <span>Tổng cộng:</span>
                    <strong id="live-total">${formattedSum}.000 VND</strong>
                </div>
                <a href="booking.html" class="btn checkout-btn">XÁC NHẬN & ĐẶT BÀN</a>
            </div>`
    mainSection.appendChild(div_card);
}

MakeHtml();