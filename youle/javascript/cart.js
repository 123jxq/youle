class Car{
    constructor(){
        this.url = this.url = "http://localhost/project/data/data.json";
        this.tbody = document.querySelector("tbody");
        this.table = document.querySelector("table");
        
        this.p = document.querySelector("p");
        this.btn= document.querySelector("button");
        this.totalP = document.getElementById("totalP");
        this.checkB = document.getElementsByClassName("checked");
        this.selectA = document.getElementsByClassName("allSelect");
        this.tr = document.querySelector("table").children[1].rows;
        this.load();
        this.addEvent();
        
       
    }
    load(){
        var that = this;
        ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);
            that.getCookie();
            that.getTotal();
        })
        
    }
    getCookie(){
        this.goods = getCookie("cart") ? JSON.parse(getCookie("cart")) :[];
        
        this.display();
       
        
    }
    display(){
        var str ="";
        if(this.goods.length==0){
            str =` <tr><td colspan="7" class="emptyimg"><a href="index.html"><img src="imgs/emptycart.png" class="emptyc"/></a></td></tr>`;
        }
        var count =0;
        for(var i =0;i<this.res.length;i++){
            for(var j=0; j<this.goods.length;j++){
                if(this.res[i].goodsId === this.goods[j].id){
                    var p = (this.res[i].price * this.goods[j].num).toFixed(2);

                    str += `<tr index="${this.goods[j].id}">
                                <td><input type="checkbox" class= "checked"></td>
                                <td><img src="${this.res[i].img}" alt=""></td>
                                <td>${this.res[i].name}</td>
                                <td class="unitprice">${this.res[i].price}</td>
                                <td><input type="number" min="1" class="num" value="${this.goods[j].num}"></td>
                                <td><p>${p}</p></td>
                                <td><span>删除</span></td>
                                
                            </tr>`
                    count += Number(this.goods[j].num);
                }
            }
        }
        this.tbody.innerHTML = str;
        $(".bottom").children("s").html("数量:"+ count);
    }
    addEvent(){
        var that = this;
        this.tbody.addEventListener("click",function(e){
            if(e.target.tagName==="SPAN"){
                console.log(1);
                that.id = e.target.parentNode.parentNode.getAttribute("index");
                e.target.parentNode.parentNode.remove();
                var cartlength =getCookie("cartlength")-1;
                setCookie("cartlength",cartlength);
                that.updateCookie(function(a){
                    that.goods.splice(a,1);
                })
                console.log(that.tr.length);
                if (that.tr.length==0){
                    that.tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="emptyimg"><a href="index.html"><img src="imgs/emptycart.png" class="emptyc"/></a></td>
                    </tr>
                      
                    
                    `;
                    totalP.innerHTML = "总价: 0";
                    $(".bottom").children("s").html("数量: 0");
                }
                
                that.getTotal();
            }
            
           
            
        })
       
        $("button").click(function(){
            if($("button")){
                that.tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="emptyimg"><a href="index.html"><img src="imgs/emptycart.png" class="emptyc"/></a></td>
                </tr>
                `;
                removeCookie("cart");
                totalP.innerHTML = "总价: 0";
                $(".bottom").children("s").html("数量: 0");
                setCookie("cartlength",0)
               
            }
        })

       
        this.tbody.addEventListener("input", function(e){
            if (e.target.className=="num"){
                that.id = e.target.parentNode.parentNode.getAttribute("index");
                that.updateCookie(function(i){
                    that.goods[i].num = e.target.value;
                    
                })
                console.log(e.target.parentNode.previousElementSibling)
                e.target.parentNode.nextElementSibling.querySelector("p").innerHTML=(e.target.value * e.target.parentNode.previousElementSibling.innerHTML).toFixed(2);
                
                // that.display();
                that.getTotal();
            }
        
        })
        
        this.table.addEventListener("click",function(e){
            if (e.target.className=="allSelect"&&e.target.checked==true){
                for(var i=0;i<that.tr.length;i++){
                    that.tr[i].querySelector(".checked").checked= true;
                }
            }
            if (e.target.className=="allSelect"&&e.target.checked==false){
                console.log(e.target);
                for(var i=0;i<that.tr.length;i++){
                    that.tr[i].querySelector(".checked").checked= false;
                }
            }
            if(e.target.className=="checked"){
                if(e.target.checked==false){    
                    
                 document.querySelector(".allSelect").checked= false;
                }
                that.getTotal();
                
            }
          
            that.getTotal();
        })

        
        
    }
    updateCookie(cb){
        for (var i=0;i<this.goods.length;i++){
            if (this.goods[i].id === this.id){
                cb(i);
            }
        }
        setCookie("cart",JSON.stringify(this.goods));
    }
  

    getTotal(){
        var total = 0;
        var count = 0;
        for (var i = 0; i<this.tr.length;i++){
            if (this.tr[i].querySelector(".checked").checked){
                
               // console.log(this.tr[i]);
                total += +this.tr[i].querySelector("p").innerHTML;
                count += parseInt(this.tr[i].querySelector(".num").value);
            }
        }
        totalP.innerHTML = "总价: "+ total.toFixed(2);
        totalP.style.width = 150+"px";
        $(".bottom").children("s").html("数量:"+ count);
        if(this.tr.length==0){
            $(".bottom").children("s").html("数量: 0");
        }

    }
    
    selectAll(){
        for (var i=0; i<this.tr.length;i++){
            tr[i].querySelector("td")[0].checked = true;
        }
    }
}   

new Car;