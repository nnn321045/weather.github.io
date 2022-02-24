const cityEl = document.querySelector('#city');
const loadingPag = document.querySelector('.loading');
const showWeather = document.querySelector('#weather');
const baseUrl = "https://run.mocky.io/v3/22722d11-fbb6-4159-b4c3-a8f169fbaa86";
const baseUrl2 = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-79869446-9FB6-43A3-ADD8-3F6A03954730";
let city = [];
let weather = [];
let html = "";
let weatherHtml = "";
let Loading = { // 開啟loading
    isOpen: false
};

// 第一種寫法， 用 axios.all 取得兩隻 API
// function cityApi() {
//     return axios.get(baseUrl);
// }

// function weaApi() {
//     return axios.get(baseUrl2);
// }

// axios.all([cityApi(), weaApi()]).then(axios.spread((cityApi, weaApi) => {
//     city = cityApi.data.twzip.city;
//     weather = weaApi.data.records.location;
//     renderCity(city);
//     change();
//     changeWeather(cityEl.value); // 初始畫面
// }));

async function asyncFn() {
    const getApi = await new Promise((resolve, reject) => {
        resolve(axios.get(`${baseUrl}`));
    })
    const getApi2 = await new Promise((resolve, reject) => {
        resolve(axios.get(`${baseUrl2}`));
    })
    city = getApi.data.twzip.city;
    weather = getApi2.data.records.location;
    console.log(weather);
    renderCity(city);
    change();
    changeWeather(cityEl.value); // 初始畫面
}
asyncFn();

function renderCity(city) {
    city.forEach(obj => {
        html += '<option value="' + obj.name + '">' + obj.name + '</option>'
    });
    cityEl.innerHTML = html;
}

function change() {
    cityEl.addEventListener('change', function() {
        changeWeather(this.value);
    });
}

function changeWeather(val) {
    Loading.isOpen = true;
    weatherHtml = "";
    showWeather.innerHTML = "";
    let chWeather = weather.filter(obj => {
        return obj.locationName === val;
    })

    setTimeout(() => {
        chWeather.forEach(obj => {
            weatherHtml += `
                        <p>${obj.weatherElement[0].time[0].parameter.parameterName} ${obj.weatherElement[3].time[0].parameter.parameterName}</p>
                        <h1>${obj.weatherElement[2].time[0].parameter.parameterName} ˚C <i class="fas fa-cloud-sun"></i> </h1>
                        <h3><i class="fas fa-cloud-showers-heavy"></i> ${obj.weatherElement[1].time[0].parameter.parameterName} %</h3>
                        <h5><i class="fas fa-sun"></i> 最高溫: ${obj.weatherElement[4].time[0].parameter.parameterName} ˚C</h5>`
        });

        showWeather.innerHTML = weatherHtml;
        Loading.isOpen = false;
    }, 800);
}

// loading資料變動
BindValue(Loading, "isOpen", boolean => {
    if (boolean) {
        loadingPag.style.display = "flex";
    } else {
        loadingPag.style.display = "none";
    }
})
