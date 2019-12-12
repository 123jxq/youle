
// 轮播图
$(".banner").banner({
    imgs: $(".banner").find("img"),     //必传
    // left:$(".banner").find("#left"),   //左按钮，可选
    // right:$(".banner").find("#right"), //右按钮，可选
    list: true,         //是否要小圆圈，可选，默认要
    autoPlay: true,     //是否要自动播放，可选，默认要
    delayTime: 2000,     //可选的，图片播放间隔时间
    moveTime: 200,        //可选的，图片移动的时间
    listBgColor: "red"
})

$("#tab ul.tab-t li").mouseenter(function () {
    // console.log($(this).index());
    console.log(-$(this).index() * 280);
    $(this).addClass("active").siblings().removeClass("active");
    $("#tab .tab-b .slide ").stop().animate({ "top": -$(this).index() * 280 })

})

// 二级菜单
function tab(){
    $("#tab ul.tab-t li").mouseenter(function () {
        // console.log($(this).index());
        console.log(-$(this).index() * 280);
        $(this).addClass("active").siblings().removeClass("active");
        $("#tab .tab-b .slide ").stop().animate({ "top": -$(this).index() * 280 })
    
    })
}
function cate(){
    $("#category").children("li").mouseenter(function () {
        // console.log($("#cateshow").children("div").eq($(this).index()));
        $("#cateshow").children("div").eq($(this).index()).css("display", "block").siblings().css("display", "none");
    })
    $("nav").mouseleave(function () {
    
        $("#cateshow").children("div").siblings().css("display", "none");
    })
}

// 选项卡 数据渲染
function dataSlide(data) {
    var str = "";
    var length = $("#tab .tab-b").children(".slide").children("ul").length;
    for (var j = 0; j < length; j++) {
        for (var i = 0; i < 5; i++) {
            str += `<li>
                        <a><img src="${data[i + 5 * j].img}"/></a>
                        <a href="#"><p>${data[i + 5 * j].name}</p></a>
                        <span>￥<b>${data[i + 5 * j].price}</b></span>
                    </li>`
        }


        $("#tab .tab-b").children(".slide").children("ul").eq(j).html(str);
        str = "";
    }
}
$.ajax({
    url: "http://localhost/youle/data/data.json",
    dataType: "json",
    success: function (data) {
        console.log(data);
        tab();
        cate();
        dataSlide(data);
        fruitAdd(data);
        search(data)
        if(getCookie("cartlength")){
            $(".cart").children("s").html(getCookie("cartlength"));
        }
        
    },
    error: function (a, b, c) {
        console.log(b)
        console.log(c)
    }
})
function fruitAdd(data) {
    var str = "";
    var length = $(".fdisplay-r").children("ul").length;

    console.log(length);
    for (var j = 0; j < length; j++) {
        for (var i = 0; i < 4; i++) {
            str += `<li>
                        <a><img src="${data[i + 4 * j].img}"/></a>
                        <a href="#"><p>${data[i + 4 * j].name}</p></a>
                        <span>￥<b>${data[i + 4 * j].price}</b></span>
                    </li>`
            $(".fdisplay-r").children("ul").eq(j).append(str);
            str = "";
        }
    }
}

// 楼层
$(".floor").children("li").click(function(){
    var i = $(this).index();
    var t;
    console.log(i)
    switch(i){ 
        case 0: t = $("#tab").offset().top; break;
        case 1: t = $(".discount").offset().top; break;
        case 2: t = $(".type-fruit").offset().top; break;
        case 3: t = 0; break;
        default: break;

    }
    $(".floor").children("li").children("a").css({"background":"#f3f4f6","color":"#999"}).parent().eq(i).children("a").css({"background":"red","color":"#fff"})

    $("html").animate({
        scrollTop:t
    })
})


// 搜索功能
$(".cate-2-l").eq(0).children("div").eq(0).children("ul").children("li").children("a").on("click",function(){
    console.log($(this).html());
   
    setCookie("type",$(this).html());
    
})
function search(data){
    $(".search-c").children("input").eq(1).click(function(){
        if($(".search-c").children("input").eq(0).get(0).value==""){
            return;
        }else {
            setCookie("type",$(".search-c").children("input").eq(0).get(0).value)
        }
        
        window.location.href="list.html";
    })
    
}




//		获取所有需要懒加载的图片
var imgs = document.querySelectorAll("img");
//		获取可视区域的高度
var clientH = document.documentElement.clientHeight;
//		获取初始的滚动的距离顶部的距离
var scrollT = document.documentElement.scrollTop;

//		提前将获取的所有的需要懒加载的图片的数组转成真数组,方便将来使用数组的方法操作
//		var arr = Array.from(elements);
var arr = [];
for(var i=0;i<imgs.length;i++){
    arr.push(imgs[i]);
}
//		懒加载的功能函数
function lazyLoad(elements,cH,sT){
    for(var i=0;i<arr.length;i++){
//				根据可视区域的高度+滚动的top,如果,大于图片的top,说明在可视区域了,要加载
        if(arr[i].offsetTop < cH + sT){
//					将图片的真正的src设置成要加载的图片的地址
            arr[i].src = arr[i].getAttribute("data-src");
//					当前图片设置成功后,不需要参与懒加载的判断了,从数组中删除这个元素
            arr.splice(i,1);
//					在遍历时,删除了数组中的元素,删除元素后面的元素会向前补位,为了能够拿到补位的元素,需要将计数器减一,否则会跳过补位的这个元素
            i--;
        }
    }
}
//		初始执行
lazyLoad(imgs,clientH,scrollT);


onscroll = function(){
    var scrollT = document.documentElement.scrollTop;
//			每次滚动执行
    lazyLoad(imgs,clientH,scrollT);
}




$(".cart").click(function(){
    if(getCookie("logonoff")){
        window.location.href="cart.html";
    }else{
        alert("请登入后再进入购物车"); 
    }
    
})