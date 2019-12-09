$('.gakki').hiZoom({
    width: 450,
    position: 'right'
});
$.ajax({
url: "http://localhost/project/data/data.json",
dataType: "json",
success: function (data) {
    display(data);
    tabchange();
    search();
    cartIn();
},
error: function (a, b, c) {
    console.log(b)
    console.log(c)
}
})
var typeChoose = getCookie("type");
//购物车功能：点击加入购物车 
// 1.  创建一个数组，把当前cookie里面有的商品拿出来json。parse转成数组，
//     数组里面加入这个商品的id和数量，判定这个商品是否是第一次加入，
//     如果是数量为1， 如果不是，数量++; 然后通过json。stringfy转成字符串 再放进cookie里面
// 2.  更新当前购物车上的信息， 遍历数组得到；
function cartAdd(){
        var cart=[];
    $(".cartJoin").on("click",function(){
        if(!getCookie("cart")){
            cart.push({
                id: getCookie("id"),
                num:1
            })
        }else{
            var onoff= true;
            cart = JSON.parse(getCookie("cart"));
            for(var i=0;i<cart.length;i++){
                if(cart[i].id==getCookie("id")){
                    cart[i].num ++;
                    onoff= false;
                }
            }
            if(onoff){
                cart.push({
                id: getCookie("id"),
                num:1
                })
            }

        }
        setCookie("cart",JSON.stringify(cart));
        
        
        $(".cart").children("s").html(cart.length);
        setCookie("cartlength",cart.length);
        alert("添加购物车成功");
    })
    
}
function display(data){
    var id = getCookie("id");
    var str = "";
    var title = "";
    var str3 = "";
    for (var i=0;i<data.length;i++){
        if(data[i].goodsId ==id){
            str =`<img src="${data[i].img}"/>`
            $(".hizoom .small").children("img").attr("src",data[i].img);
            $(".big").children("img").attr("src",data[i].img);
            var str2 = `<p>当前位置&nbsp;》&nbsp;新鲜水果&nbsp;》&nbsp;${typeChoose}&nbsp;》&nbsp;${data[i].name}</p>`;
            title = `<h3>${data[i].name}</h3>`
            var ids = `<span>${id}</span>`
            var price = `<span>￥${data[i].price}</span>`
            str3 =`
                    <li><img src="${data[i].img}"/></li>
                    <li><img src="${data[i].img2}"/></li>
                    <li><img src="${data[i].img3}"/></li>
                    <li><img src="${data[i].img4}"/></li>
                    `
        }
    }
    
    $("#location").append(str2);
    $(".introduce").prepend(title);
    $(".goodsId").append(ids);  
    $(".price").append(price);
    $("#main").children("ul").append(str3);

    
    var ass="";
    for (var i=0;i<data.length;i++){
        if(data[i].goodsId ==id){
            var arr = data[i].detail.split(",");
            for(var j = 0;j<arr.length;j++){
                ass += `<img src="${arr[j]}"/>`;
            }
        }
    }
    $(".detail").append(ass);
    $("#main").children("ul").children("li").on("click",function(){
        var src= $("#main").children("ul").children("li").eq($(this).index()).children("img").attr("src");
        $(".hizoom .small").children("img").attr("src",src);
        $(".big").children("img").attr("src",src);
        
    })
    if(getCookie("cartlength")){
        $(".cart").children("s").html(getCookie("cartlength"));
    }
    
    cartAdd();

}
function tabchange(){
    $(".tab").children("ul").children("li").on("click",function(){
        console.log($(this).index());
        $(".tab").children("ul").children("li").eq($(this).index()).addClass("active").siblings().removeClass("active");
        $(".show").children("div").eq($(this).index()).css("display","block").siblings().css("display","none");
    })
    
}

function search(){
    $(".search-c").children("input").eq(1).click(function(){
        if($(".search-c").children("input").eq(0).get(0).value==""){
            return;
        }else {
            setCookie("type",$(".search-c").children("input").eq(0).get(0).value)
        }
        
        window.location.href="list.html";
    })
}
function cartIn(){
    $(".cart").click(function(){
        if(getCookie("logonoff")){
            window.location.href="cart.html";
        }else{
            alert("请登入后再进入购物车");
        }
        
    })
}