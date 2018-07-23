$(function() {
    // 城市列表初始化
    buildCityList();
    scrollBuild();
    //百度
    // getCityLoadScript(positionGetCityCB);
    //高德
    // 当session里存在city 则不重新定位 以防止多次请求权限
    let session_city = getSessionData(POSITION,CITY);
    if(session_city){
        $(".location-city").text(session_city);
    }else{
        aMapGetLocation();
    }

    $(".positioning-btn, .hot-city-btn").on("click",function() {
        
        cityClickFn(this);
        // setLocalStorageData(POSITION,CITY,"乌鲁木齐");
        
    });

    // input 搜索框
    buildIpt();

});

// 搜索款初始化
function buildIpt() {
    let $search_show = $(".search-show"),
        $search_hide = $(".search-hide");
    // clear-ipt
    $(".clear-ipt").on("click", function() {
        $(this).parents(".clear-ipt-parent").find("input").val("");
        $search_show.hide();
        $search_hide.show();
    });
    // 搜索输入框 change事件 
    $(".search-ipt").on("input propertychange", function() {
        let v = $(this).val() ? $(this).val().trim() : "";
        if (v) {
            $search_show.show();
            $search_hide.hide();
            changeSearchResult(v);
        } else {
            $search_show.hide();
            $search_hide.show();
        }
    });
}
function changeSearchResult(v){
    let c = new CitySelect();
    let r = c.getNomalQuery(v);
    r = r ? r:[];
    let $r = $(".search-result").html("");
    for (var i = 0; i < r.length; i++) {
        let h = `<div class="hot-city-btn fl mr30 br10 tac pt26 pb26 w190 fz28 lh28 mt30" style="border:1px solid #e5e5e5">${r[i].split("|")[0]}</div>`
        $(h).prependTo($r).on("click", function() {
            cityClickFn(this);
        });
    }
}



function buildCityList() {
    let h1 = '<h2 class="fz30 lh30 c666666">[A]</h2><div class="city-list"></div>',
        h2 = '<a class="city-item ac333333" href="javascript:void(0);"><p class="pt30 pb30">[阿巴噶旗]</p></a><div class="h1px bgce5e5e5"></div>';
    $(".all-city li").each((i,n) => {
        $(n).html(h1.replace(/\[A\]/,$(n).attr("id")));
    });

    // 模拟数据请求
    // setTimeout(function() {
        // {"A":["杭州市"],"B"}
        let city_date = myCities();
        // let need = {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};
        $.each(city_date,(i,val)=>{
            let $cl = $("#"+i).find(".city-list");
            if(!val){
                $cl.remove();
                let a = `a[href="#${i}"]`;
                $(a).remove();
                return;
            }
            for (let i = 0; i < val.length; i++) {
                let h = h2.replace(/\[.*\]/,val[i].split("|")[0]);
                $(h).appendTo($cl).on("click",function(){
                    // 城市点击事件
                    cityClickFn(this);
                });
            }
        })
    // },1000);
}

// {"A":["杭州市"],"B"}
//只是拿到了 一些地级市 需要的话 这个方法请重写
function myCities() {
    const start = 41;
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // let A = `\u{${start}};`
    let c = new CitySelect();
    let o ={}   
    for (let i = 0; i < 26; i++) {
        let r = c.getFirstLetter(a[i]);
        o[a[i]] = r;
    }
    return o;
}


function scrollBuild() {
    let fz = CARD_DATA.font_size/75;
    let $header = $(".headerf");
    let $tab = $(".tab-block-inner-wrap");

    // 收集各锚点的top -100
    let $root = $("html, body");
    $(".city-letter a").on("click", function() {
        var href = $.attr(this, 'href');
        var _this = this;
        $root.animate({
            scrollTop: $(href).offset().top - 120*fz
        }, 300, function () {
            // window.location.hash = href;
            var b =$root.scrollTop() >= $root.height() - $(window).height();
            if(b){
                $(".type-btn").removeClass("active");
                $(_this).addClass("active");
            }
        });
        
        return false;
    })

}

function cityClickFn(that) {
    let city = $(that).is(".positioning-btn") ? $(".location-city").text() : $(that).text();
    setSessionData(POSITION,CITY,city);
    setLocalStorageData(POSITION,CITY,city);
    window.location.href = "near_home.html";
}




// 重写的aMapGetLocationCallbackFn方法
// 这段代码无法执行 找不到原因
// function aMapGetLocationCallbackFn() {
//     // let map = new AMap.Map('map');
//     AMap.plugin('AMap.CitySearch', function () {
//       var citySearch = new AMap.CitySeach();
//       console.log(citySearch)
//       citySearch.getLocalCity(function (status, result) {
//         if (status === 'complete' && result.info === 'OK') {
//           // 查询成功，result即为当前所在城市信息
//         }
//           alert(1);
//       })
//     })
// }

// 该方法这里重写
function aMapGetLocationSuccess(data) {
    // console.log(data.addressComponent);
    let {addressComponent:{city,citycode,district,province,street,streetNumber,township}} = data;
    $(".location-city").text(city);
}
// 该方法这里重写
function aMapGetLocationError(data) {

}