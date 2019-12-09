
$(".top-l").children("i").mouseenter(function () {
    $(".top-l dl").css("display", "block").parent().children("i").css("borderBottom", "1px solid white");
})
$(".top-l").mouseleave(function () {
    console.log(0)
    $(".top-l dl").css("display", "none").parent().children("i").css("borderBottom", "1px solid #a7a7a7");
})

$(".top-l dl dd").click(function () {
    $(".top-l i span").html($(".top-l dl dd").eq($(this).index() - 1).html());
})

$(".myyoule").mouseenter(function () {
    $(".youle").css("display", "block");
})

$(".yl").mouseleave(function () {
    $(".youle").css("display", "none");
})

$(".phone").mouseenter(function () {
    $(".code").css("display", "block");
})

$(".phone").mouseleave(function () {
    $(".code").css("display", "none");
})

logonstate();
function logonstate(){
    if(getCookie("logonoff")){
        var tel = getCookie("user").split(",")[1].split(":")[1];
        $("#telNow").html(tel);
        var str = `<a href="#" class="logout">[退出登录]</a>`
        $("#theme").html(str);
    }else{
        $("#telNow").html("你好");
        var str =  `<a href="login.html"> [请登录]</a>
                    <a href="register.html"> [免费注册]</a>`;
        $("#theme").html(str);
    }
    
}

$("#theme").children(".logout").on("click",function(){
    removeCookie("logonoff");
    logonstate();
})


