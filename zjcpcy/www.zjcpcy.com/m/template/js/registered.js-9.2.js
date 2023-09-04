/* 是否登录 */
function islogin() {
    if (USER_NAME == '') {
        window.location.href = HOME_URL + 'login.php';
    }
}

/*会员注册登录*/
$('#zhuce').click(function(){
	var username  = $('#username'),
		password  = $('#password'),
		rpassword = $('#rpassword'),
		tel       = $('#tel'),
		email     = $('#email');
	switch (true){
		case username.val().length < 6:
			alert("用户名不能少于6位字符！");
			username.focus();
			return false;
			break;
		case password.val().length < 4:
			alert("登录密码不能少于4位字符！");
			password.focus();
			return false;
			break;
		case password.val() != rpassword.val():
			alert("登录密码不一致！");
			rpassword.focus();
			return false;
			break;
		case tel.val() == '':
			alert("联系方式不能为空！");
			tel.focus();
			return false;
			break;
	}
	
	//电话号码验证
	if (!tel.val().match(/^(((1[0-9]{1})|159|153)+\d{9})$/)) { 
		alert("手机号码格式不正确！"); 
		tel.focus(); 
		return false; 
	} 
	if(email.val() != '') {
   		if(!email.val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
       		alert("邮箱格式不正确！请重新输入");
      		email.focus();
      		return false;
  		}
   }

})


$('#denglu').click(function(){
	var username  = $('#username'),
		password  = $('#password'),
		valicode  = $('#valicode');
	switch (true){
		case username.val() == '':
			alert("用户名不能为空！");
			username.focus();
			return false;
			break;
		case password.val() == '':
			alert("登录密码不能为空！");
			password.focus();
			return false;
			break;
		case valicode.val() == '':
			alert("验证码不能为空！");
			valicode.focus();
			return false;
			break;
	}

})


//修改我的个人信息
$('#personal-send').click(function(){
	var tel       = $('#tel'),
		email     = $('#email');
	if(tel.val() != '') {
		if (!tel.val().match(/^(((1[0-9]{1})|159|153)+\d{9})$/)) { 
			alert("手机号码格式不正确！"); 
			tel.focus(); 
			return false; 
		} 
	}
	if(email.val() != '') {
   		if(!email.val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
       		alert("邮箱格式不正确！请重新输入");
      		email.focus();
      		return false;
  		}
    }

})


/*修改密码*/
$('#password-send').click(function(){
	var password       = $('#password'),
		newpassword    = $('#newpassword'),
		repeatpassword = $('#repeatpassword');
	switch (true){
		case password.val() == '':
			alert("原密码不能为空！");
			password.focus();
			return false;
			break;
		case newpassword.val().length < 4:
			alert("新密码不能少于4位字符！");
			newpassword.focus();
			return false;
			break;
		case newpassword.val() != repeatpassword.val():
			alert("两次密码输入不一致！");
			repeatpassword.focus();
			return false;
			break;
	}
	
})

/*收货信息*/
$('#addressadd-send').click(function(){
    var name     = $('#address-name'),
        tel      = $('#address-tel'),
        prov     = $('#prov'),
        detailed = $('#address-detailed');
    switch (true){
        case name.val() == '':
            alert("收货人姓名不能为空！");
            name.focus();
            return false;
            break;
        case prov.val() == '':
            alert("所在地区不能为空！");
            prov.focus();
            return false;
            break;
        case detailed.val() == '':
            alert("详细地址不能为空！");
            detailed.focus();
            return false;
            break;
    }   
    if (tel.val() != '') {
		if (!tel.val().match(/^(((1[0-9]{1})|159|153)+\d{9})$/)) { 
			alert("手机号码格式不正确！"); 
			tel.focus(); 
			return false; 
		} 
	}

})


//详情立即购买按钮
function buyNow(productid) {
    islogin();
    var url = HOME_URL+'ajaxOrders.php?action=shopping';
    var num = $('#cart-number').val();
    $.post(url,{id:productid,num:num}, function(data){
        if (data) {
            if(data == 1){
                window.location.href = HOME_URL+'person.php?action=shopping';
            }
        }
    });
}

//通用产品收藏
function userCollection(_this, cls) {
    islogin();
    var productid = _this.data('id');
    var loves = _this.attr('data-loves');
    var url = HOME_URL+'ajaxOrders.php?action=like';
    $.post(url,{id:productid,loves:loves}, function(data) {
       if (data == 2) {
            _this.attr('data-loves',0);
            _this.removeClass(cls);
        } else if (data == 1) {
        	_this.attr('data-loves',2);
        	_this.addClass(cls);
        }
    });
}


//删除收货地址
function removeAddress(_this){
    var id = _this.data('id');
	var url = HOME_URL + 'ajaxOrders.php?action=deleteAddress';
	var flag = confirm('确定删除此地址么？');
    if (flag) {
    	$.post(url,{id:id}, function(data){
	    	if (data == 1) {
	    		_this.parents('li').remove();
	    	}
	    });
    }
}


//取消产品收藏
function removeLikes(_this) {
	islogin();
    var productid = _this.data('id');
    var url = HOME_URL+'ajaxOrders.php?action=like';
    var flag = confirm('确定不再收藏此商品么？');
    if (flag) {
    	$.post(url,{id:productid,loves:2}, function(data) {
	       if (data == 2) {
	            _this.parents('li').remove();
	        }
	    });
    } 
}

//收藏的产品加入购物车
function addCart(_this, productid) {
    islogin();
    var url = HOME_URL+'ajaxOrders.php?action=shopping';
    $.post(url,{id:productid}, function(data){
        if(data == 1){
        	mui.toast('加入成功',{ duration:'1000ms', type:'#muis-toast' });
        }
    });
}


//删除已购买订单
function userBought(_this) {
    var id = _this.data('id');
    var url = HOME_URL+'ajaxOrders.php?action=lists';
    var flag = confirm('确定删除此记录么？');
    if (flag) {
    	$.post(url,{id:id}, function(data) {
	    	if (data == 1) {
	    		_this.parents('.user-bought').remove();
	    	}
	    });
    }
}


//统计价格
function totalvar() {
	if ($('.shopping-list li').length < 1) {
		$('.shopping-list').html('<div class="no-information">暂无信息！</div>');
		$('.totalcost').remove();
	}
	var price = 0;
	$('.shopping-list li').each(function(){
		var num = parseInt($(this).find('.xy-numbox-input').val());
		var aprice = Number($(this).find('h3 span').text());
		price += num * aprice;
	})
	$('.total-price span').text(price);
}

//购买数量
function quantity(_this, operating, pid) {
    islogin();
	var url = HOME_URL + 'ajaxOrders.php?action=shoppingnum';
	var _that = _this.parent('.xy-numbox');
	var num = parseInt(_that.find('.xy-numbox-input').val());
	if (operating == 0 && num <= 1) { 
		return false;
	}
	if (operating == 0) {
		num -= 1;
	} else {
		num += 1;
	}
    $.post(url,{pid:pid,num:num}, function(data) {
        if (data == 1) {
            mui.toast('库存不足！',{ duration:'1000ms', type:'#muis-toast' });
        } else if (data == 2) {
            _that.find('.xy-numbox-input').val(num);
            totalvar();
        }
    });
}

//删除购物车
function removeShopping(_this, id) {
	url = HOME_URL + 'ajaxOrders.php?action=deleteorder';
	$.post(url, {id:id}, function(data) {
        if(data == 1){
            _this.parents('li').remove();
            totalvar();
        }
    });
}

var wait = 60;
function get_code_time(){
    if(wait==0){
        $("#getmsgcode").removeAttr("disabled");//移除获取验证码按钮的disabled属性
        $("#getmsgcode").val("重新获取");
        wait = 60;
    }else{
        $("#getmsgcode").attr("disabled", true);//设置获取验证码按钮为不可触发
        $("#getmsgcode").val("(" + wait + "s)后重新获取");
        wait--;
        setTimeout("get_code_time()", 1000);
    }
}

$("#getmsgcode").click(function(){
    var tel     = $("#tel").val();
    var actionUrl=$('#forgetForm').attr('action');

    switch (true){
        case tel == '':
            alert("手机号码不能为空！");
            $("#tel").focus();
            return false;
            break;
    }
    //电话号码验证
    var pattern = new RegExp(/^[0-9-+]+$/);
    if(!pattern.test(tel))
    {
        alert('请输入有效的手机号码！');
        $("#tel").focus();
        return false;
    }
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: {action:"getcode",tel:tel},
        dataType: "json",
        success: function(data){
            if(data == 1){
                get_code_time();
                alert('发送成功，请注意查收！');
            }else if(data == 0){
                alert('号码格式错误，请重新填写！'); 
            }else if(data == -1){
                alert('您填写的手机号码不是注册会员，请前往注册');
            }
        }
    });
    return false;
});

$("#resetSubmit").click(function(){
     var tel = $("#tel").val(),
         msg = $(".msg").val(),
         pwd = $("#password").val(),
         rpwd = $("#rpassword").val();
     switch(true){
         case tel == '':
            alert("手机号码不能为空！");
            $("#tel").focus();
            return false;
            break;
         case msg.length > 4:
            alert("短信验证码格式不对，请重新输入");
            $(".msg").focus();
            return false;
            break;    
         case msg == '':
            alert("请填写短信验证码");
            $(".msg").focus();
            return false;
            break; 
         case pwd == '':
            alert("请输入重置密码");
            $("#password").focus();
            return false;
            break;
         case pwd.length < 6:
            alert("重置密码不安全，请填写6位以上数字或字母");
            $("#password").focus();
            return false;
            break;    
         case rpwd == '':
            alert("请确认重置密码");
            $("#rpassword").focus();
            return false;
            break;
         case pwd != rpwd:
            alert("两次密码输入不一致！请重新输入");
            return false;
            break;
         default:
            break;            
     }    
})


