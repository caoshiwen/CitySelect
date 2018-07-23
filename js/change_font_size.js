//等宽修改字体大小
var CARD_DATA ={};
function changeFontSize() {
    var window_width = $(window).width();
    var font_size = window_width / 10;
    if (font_size < 32.5) {
        font_size = 32.5;
    }
    $("html").css("font-size", font_size);
    return font_size;
}
$(function(){
    CARD_DATA.font_size = changeFontSize();
    $(window).resize(function() {
        CARD_DATA.font_size = changeFontSize();
    });
});