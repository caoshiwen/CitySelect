const POSITION = "position", CITY = "city";
//sessionStorage  - set
function setSessionData(data_name, item_name, item_data) {
    var data_varchar = sessionStorage.getItem(data_name);
    var data_obj = {};
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
    }
    if (!data_obj) {
        data_obj = {};
    }
    data_obj[item_name] = item_data;

    sessionStorage.setItem(data_name, JSON.stringify(data_obj));
}
//sessionStorage - get
function getSessionData(data_name, item_name) {
    var data_varchar;
    if (data_name in sessionStorage) {
        data_varchar = sessionStorage.getItem(data_name);
    } else {
        data_varchar = "{}";
    }
    var data_obj;
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
        return "";
    }
    return data_obj[item_name];
}
//localStorage
function setLocalStorageData(data_name, item_name, item_data) {
    var data_varchar = localStorage.getItem(data_name);
    var data_obj = {};
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
    }
    if (!data_obj) {
        data_obj = {};
    }
    data_obj[item_name] = item_data;

    localStorage.setItem(data_name, JSON.stringify(data_obj));
}
function getLocalStorageData(data_name, item_name) {
    var data_varchar;
    if (data_name in localStorage) {
        data_varchar = localStorage.getItem(data_name);
    } else {
        data_varchar = "{}";
    }
    var data_obj;
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
        return "";
    }
    return data_obj[item_name];
}
//返回上一页
function goBack() {
    window.history.back();
}

//高德
const AMAP_KEY = ""
function aMapGetLocation() {

    let url = 'https://webapi.amap.com/maps?v=1.4.8&key='+AMAP_KEY+'&callback=aMapGetLocationCallbackFn';
    let $jsapi = $('<script></script>');
    $jsapi.attr({
        "charset": "utf-8",
        "src": url
    });
    $jsapi.appendTo("head");
}

// 调用aMapGetLocation后重写该方法 
// 获取经度高 速度慢
function aMapGetLocationCallbackFn({
    sCB = function() {},
    eCB = function() {}
} = {}) {
    let map = new AMap.Map('map');
    map.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', aMapGetLocationSuccess)
        AMap.event.addListener(geolocation, 'error', aMapGetLocationError)

        
    })
}

// 该方法请在使用的页面重写
function aMapGetLocationSuccess(data) {

}
// 该方法请在使用的页面重写
function aMapGetLocationError(data) {

}