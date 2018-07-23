$(function() {
    cityInit();
});
function changeBlockInnerWrapHeight() {
    let b = $(".goods-show-block-btn.active");
    let o = {
        "margin-left": "0",
        "height": 0
    }
    if (b.is(".lastest-btn")) {
        o["margin-left"] = "0";
        o["height"] = $(".lastest").css("height");
    } else {
        o["margin-left"] = "-100%";
        o["height"] = $(".hottest").css("height");

    }
    $(".good-block-inner-wrap")
        .css(o);
}


function cityInit() {
    // 当session里存在city 则不重新定位 以防止多次请求权限
    let session_city = getSessionData(POSITION,CITY);
    if(session_city){
        changeCity(session_city);
        return;
    }
    let city = getLocalStorageData(POSITION,CITY);
    if(city){
        showCity(city);
    }
    aMapGetLocation();
}
// 该方法这里重写
function aMapGetLocationSuccess(data) {
    // console.log(data.addressComponent);
    let {addressComponent:{city,citycode,district,province,street,streetNumber,township}} = data;
    let local_city = getLocalStorageData(POSITION,CITY);
    if(!local_city){
        changeCity(city);
    }else if(city!=local_city){
        let r = confirm("检测到您的定位在"+city+",是否切换城市？");
        if(r){
            changeCity(city);
        }
    }

}
// 该方法这里重写
function aMapGetLocationError(data) {

}

//页面首先展示的内容 可与changecity为同一方法 在切换城市前首先展示的页面信息
function showCity(city) {
    $(".location-city").text(city.replace(/市$/,""));
}
//切换城市 需要刷新页面内容 但不能直接reload页面
function changeCity(city) {
    setSessionData(POSITION,CITY,city);
    setLocalStorageData(POSITION,CITY,city);
    showCity(city);
}