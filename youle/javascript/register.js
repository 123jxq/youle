var oTel = document.getElementById("tel");
var oName = document.getElementById("name");
var oKey = document.getElementById("key");
var oKey2 = document.getElementById("key2");
var oBtn = document.getElementById("btn");
var oTelwarn = document.getElementById("tel-warn");
var oKeywarn = document.getElementById("key-warn");
var oKeywarn2 = document.getElementById("key2-warn");
var oKeywarn3 = document.getElementById("key3-warn");
var ocheck = document.getElementById("check");
var reg = /^1[34578]\d{9}$/ //11位手机号
var reg2 = /^\w{6,12}$/ //  字母数字下划线
//设置失焦事件
oTel.onblur = fnTel;
oKey.onblur = fnKey;
oKey2.onblur = fnKey2;


oBtn.onclick = function () {
    console.log(ocheck.value);
    if (!(fnTel() & fnKey() & fnKey2())) {
        console.log(1);
        return;
    }
    if (!ocheck.checked) {
        oKeywarn3.innerHTML = "抱歉您必须同意邮乐网的条款后才能提交注册";
        oKeywarn3.style.color = "red";
        return;
    }
    //把信息拼成一个键值对形式 例如 name:17dian,key:123456,tel:18810701077（2）
    var val = "key" + ":" + oKey.value + "," + "tel" + ":" + oTel.value;
    setCookie("user", val); //存放到当前用户中，
    if (getCookie("bank")) {
        var bankVal = getCookie("bank") + "&" + val;
    } else {
        var bankVal = val;
    }
    setCookie("bank", bankVal);
    window.location.href = "login.html";
}






function fnTel() {
    //判断手机号之前是否被注册过(3)
    if (getCookie("bank")) {
        var arrBank = getCookie("bank").split("&");
        for (var i = 0; i < arrBank.length; i++) {
            var obj = convertCartStrToObj(arrBank[i]);
            if (oTel.value == obj.tel) {
                oTelwarn.innerHTML = "您的手机号已经被注册";
                // oTel.value = "";
                oTelwarn.style.color = "red"
                return;
            }
        }
    }
    if (oTel.value == "") {
        oTelwarn.innerHTML = "手机号不能为空"
        oTelwarn.style.color = "red"
        return;
    }
    if (reg.test(oTel.value)) {
        oTelwarn.innerHTML = "√";
        oTelwarn.style.color = "green";
        return true;
    } else {
        oTelwarn.innerHTML = "请输入正确格式的11位手机号";
        // oTel.value = "";
        oTelwarn.style.color = "red"

    }
}


function fnKey() {
    if (reg2.test(oKey.value)) {
        oKeywarn.innerHTML = "√";
        oKeywarn.style.color = "green"
        return true;
    } else if (oKey.value == "") {
        oKeywarn.innerHTML = "密码不能为空"
        oKeywarn.style.color = "red"
        return;
    }
    else {
        oKeywarn.innerHTML = "请输入6-12位字母数字下划线";
        // oKeywarn.value = "";
        oKeywarn.style.color = "red"
    }
}

function fnKey2() {
    if (oKey2.value == oKey.value && oKey2.value != "") {
        oKeywarn2.innerHTML = "√";

        oKeywarn2.style.color = "green"
        return true;

    } else if (oKey2.value == "") {
        oKeywarn2.innerHTML = "密码不能为空"
        oKeywarn2.style.color = "red"
    }
    else {
        oKeywarn2.innerHTML = "两次输入的密码不同";
        // oKeywarn2.value = "";
        oKeywarn2.style.color = "red"
    }
}

function convertCartStrToObj(cartStr) {
    var obj = {};
    //将字符串name:17dian,key:123456,tel:18810701077 按“,”拆分成数组["name:17dian", "key:123456", "tel:18810701077"]
    var arrVal = cartStr.split(",");
    for (var i = 0; i < arrVal.length; i++) {
        data = arrVal[i].split(":"); // 在将每一项拆分 例如arrVal[0]时 data =["name", "17dian"]
        obj[data[0]] = data[1]; //给对象添加属性
    }
    return obj;
}