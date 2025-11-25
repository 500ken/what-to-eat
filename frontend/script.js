// 設定你的後端 API URL（等部署後再修改）
const API_URL = "http://localhost:8000/restaurants";


document.getElementById("search-btn").addEventListener("click", () => {
if (!navigator.geolocation) {
alert("你的瀏覽器不支援定位功能");
return;
}


navigator.geolocation.getCurrentPosition(success, error);
});


function success(position) {
const lat = position.coords.latitude;
const lng = position.coords.longitude;


const price = document.getElementById("price").value;
const rtype = document.getElementById("rtype").value;
const radius = document.getElementById("radius").value;


const params = new URLSearchParams({ lat, lng, radius });


if (price !== "") params.append("price", price);
if (rtype !== "") params.append("rtype", rtype);


fetch(`${API_URL}?${params.toString()}`)
.then((res) => res.json())
.then((data) => renderResults(data.results))
.catch(() => alert("API 發生錯誤，請稍後再試"));
}


function error() {
alert("無法取得定位資訊");
}


function renderResults(results) {
const resultDiv = document.getElementById("result");
resultDiv.innerHTML = "";


if (!results || results.length === 0) {
resultDiv.innerHTML = "<p>找不到餐廳，請放寬條件</p>";
return;
}


results.forEach((r) => {
const div = document.createElement("div");
div.className = "card";
div.innerHTML = `
<h3>${r.name}</h3>
<p>評分：${r.rating || "無"}（${r.user_ratings_total || 0} 則）</p>
<p>價格：${r.price_level ?? "無資料"}</p>
<p>地址：${r.vicinity}</p>
`;
resultDiv.appendChild(div);
});
}