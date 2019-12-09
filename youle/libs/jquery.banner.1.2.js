;(function($){
    "use strict";
    $.fn.extend({
        banner: function(options){
            // console.log(this);
            this.obj = {}
            var that = this.obj;

            that.imgs = options.imgs;
            that.list = options.list==false ? false : true;
            that.autoPlay = options.autoPlay==false ? false : true;
            that.delayTime = options.delayTime || 3000;
            that.moveTime = options.moveTime || 300;
            that.listBgColor = options.listBgColor || "red";

            that.index =0;
            that.iPrev= that.imgs.length - 1;
           
            
            function btnLeft(){
                if(that.index==0){
                    that.index = that.imgs.length -1;
                    that.iPrev = 0
                }else{
                    that.index--;
                    that.iPrev= that.index +1;
                }
                btnMove(1);
               
            }


            function btnRight(){
                if(that.index==that.imgs.length -1){
                    that.index = 0
                    that.iPrev = that.imgs.length -1
                }else{
                    that.index++;
                    that.iPrev= that.index -1;
                }
                btnMove(-1);
                
            }
            
            function btnMove(t){
                that.imgs.eq(that.iPrev).css("left",0).stop().animate({"left": that.imgs.eq(0).width()*t})
                that.imgs.eq(that.index).css("left",-that.imgs.eq(0).width()*t).stop().animate({"left":0})
                ul.children("li").eq(that.index).css("background",that.listBgColor).siblings().css("background","#ccc")
            }
            if(options.left!=undefined&& options.left.length>0&&options.right!=undefined&&options.right.length>0){
                options.left.click(btnLeft);
                options.right.click(btnRight);
            }

            if(that.list){
                var str="";
                for(var i = 0;i<that.imgs.length;i++){
                    str += `<li></li>`
                }
                var ul = $("<ul>").html(str);
               
                this.append(ul);
            }
            
            ul.css({
                width:"100%",height:15,display:"flex", justifyContent:"center",position:"absolute",left:0,bottom:0,lineHeight:"15px", listStyle:"none",padding:0,margin:10,textAlign:"center",zIndex:2
                
            })
            ul.children("li").css({
                height:15,width:15,borderRadius:"50%", margin:"0 10px",background:"#CCC",
            }).eq(0).css("background",that.listBgColor);

            ul.children("li").click(function(){
                // console.log($(this).index());
                // console.log( that.index);
                if($(this).index() > that.index){
                    options.imgs.eq(that.index).css("left",0).stop().animate({"left": options.imgs.eq(0).width()})
                    options.imgs.eq($(this).index()).css("left",-options.imgs.eq(0).width()).stop().animate({left: 0})
                }else if ($(this).index() < that.index){
                    options.imgs.eq(that.index).css("left",0).stop().animate({"left":-options.imgs.eq(0).width()})
                    options.imgs.eq($(this).index()).css("left",options.imgs.eq(0).width()).stop().animate({left: 0})
                    
                }
                that.index =$(this).index();
                
                ul.children("li").eq(that.index).css("background",that.listBgColor).siblings().css("background","#ccc")
            })

            if(that.autoPlay){
                that.t = setInterval(()=>{
                    btnRight();
                },that.delayTime)
                this.hover(function(){
                    clearInterval(that.t);
                },function(){
                    that.t = setInterval(()=>{
                        btnRight();
                    },that.delayTime)
                })
            }

        }
    })
    





})(jQuery)