# CitySelect
v1.0.0
### 一个简易的 城市筛选 小工具
[csw_select_city.js](http://github.com/caoshiwen/CitySelect/raw/master/js/csw_select_city.js)
```javascript
    let selectCity = new CitySelect();
    //也可以传入json
    /** cities:{
        "Beijing": "北京",
        "Tianjin": "天津",
        "Shanghai": "上海"
        ...
        } **/

    // 返回城市 **key**
    selectCity.getFuzzyQuery("key");
    // *k**e**y***  **表示可有可无  通常使用该方法
    selectCity.getNomalQuery("key");
    // 首字母
    selectCity.getFirstLetter("A");
```
新人 弱弱地请求指教