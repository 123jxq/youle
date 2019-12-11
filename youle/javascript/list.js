$.ajax({
    url: "http://localhost/youle/data/data.json",
    dataType: "json",
    success: function (data) {
        addList(data);
        productHover();
        search(data)
        liClick();
        cartIn();
        if(getCookie("cartlength")){
            $(".cart").children("s").html(getCookie("cartlength"));
        }
        
    },
    error: function (a, b, c) {
        console.log(b)
        console.log(c)
    }
})
    function addList(data){
        var str ="";
        var store="";
        var score="";
        var arr=[];
        var typeChoose = getCookie("type");
        console.log(typeChoose);
        
        for(var i=0;i<data.length;i++){
            if(data[i].type.indexOf(typeChoose)!=-1){
                arr.push(i);
            }
        }
        console.log(arr);
        if (arr.length==0){
            str = `<p id="noResult"><img src ="imgs/warn.png"/>抱歉,没有找到与<s>${typeChoose}</s>相关的商品</p>`
        }
        
        for(var i=0;i<arr.length;i++){
            str += `<li>
                        <a><img src="${data[arr[i]].img}" alt="${data[arr[i]].goodsId}"/></a>
                        <a href="#"><p>${data[arr[i]].name}</p></a>
                        <span>￥<b>${data[arr[i]].price}</b></span>
                    </li>`
            
        }
        var str2 = `<p>当前位置&nbsp;》&nbsp;新鲜水果&nbsp;》&nbsp;${typeChoose}</p>`;
        
        $(".list").children(".layout").children("ul").append(str);
        $(".list").children(".layout").children("#location").append(str2);
        for(var i=0;i<arr.length;i++){
            store = `<i>${data[arr[i]].store}</i>`
            score = `<s>店铺评分:${data[arr[i]].score}</s>`
            $(".list").children(".layout").children("ul").children("li").eq(i).append(store);
            $(".list").children(".layout").children("ul").children("li").eq(i).append(score);
        }
    }
    function search(data){
        $(".search-c").children("input").eq(1).click(function(){
            if($(".search-c").children("input").eq(0).get(0).value==""){
                return;
            }
         else {
            setCookie("type",$(".search-c").children("input").eq(0).get(0).value)}
        
        
        window.location.href="list.html";
        })
    }
    function productHover(){
        $(".list").children(".layout").children("ul").children("li").on("mouseenter",function(){
            
            $(this).css("borderColor","red").siblings().css("borderColor","#fff");
         })
         $(".list").children(".layout").children("ul").children("li").on("mouseleave",function(){
            $(this).css("borderColor","#fff");
         })
    }
    
    function liClick(){
        $(".list").children(".layout").children("ul").children("li").on("click",function(){
           var id = $(this).children("a").eq(0).children("img").attr("alt");
           setCookie("id",id);
           window.location.href="detail.html";
        })
    }
    
    function cartIn(){
        $(".cart").click(function(){
            console.log(1);
            if(getCookie("logonoff")){
                window.location.href="cart.html";
            }else{
                alert("请登入后再进入购物车");
            }
            
        })
    }