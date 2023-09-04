;(function($) {

    $.fn.banner = function(options){

        var defaults = {

            outContainer: ".banner",
            obj_li: ".bb li"
        };
        var settings = $.extend({},defaults,options);
        var _this = this;

        outContainer = _this.find(settings.outContainer);
        obj_li = _this.find(settings.obj_li);
        var nav_num = '';
        var count  = obj_li.length;
        obj_li.first().css("display","block");
        obj_li.each(function(){
            var index = $(this).index() + 1;
            nav_num += '<li><a href="javascript:void(0)">' + index + '</a></li>'; 
        });
        _this.append('<ul class="num">' + nav_num + '</ul>');
        $(".num li").first().addClass("num_hover"); 
        $(".num li").hover(function(){
            sw = $(".num li").index(this);
            myShow(sw);
        });
        function myShow(i){
			$(".num li").eq(i).addClass("num_hover").siblings().removeClass("num_hover");
			obj_li.eq(i).stop(true,true).fadeIn(600).siblings("li").fadeOut(600);
		}
		var myTime = 0;
			//滑入停止动画，滑出开始动画
		_this.hover(function(){
			if(myTime){
			   clearInterval(myTime);
			}
		},function(){
			myTime = setInterval(function(){
			myShow(sw);
			sw++;
			if(sw == count){
				sw=0;
			}
			} , 3000);
		});
			//自动开始
		var sw = 0;
		myTime = setInterval(function(){
		   myShow(sw);
		   sw++;
		   if(sw == count){
			   sw=0;
		   }
		} , 2000);	

    }

})(jQuery);
