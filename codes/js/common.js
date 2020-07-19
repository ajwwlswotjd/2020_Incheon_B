const log = console.log;
window.addEventListener("load",()=>{
	$('.nav-login').on("click",()=>{
		$("#login").dialog();
	});
	$('.nav-join').on("click",()=>{
		$("#join").dialog();
	});
	$("#join_phone").on("input",(e)=>{
		let value = e.target.value;
		value = value.replace(/[^0-9]/g,"").replace(/(^[0-9]{3}|^[0-9]{2})([0-9]{4}|[0-9]{3})([0-9]{4})/,"$1-$2-$3");
		e.target.value = value;
	});
	$('.join_condition').on('input',(e)=>{
		let txt = [];
		if(!(/^[가-힣]{2,4}$/.test(join_name.value))) txt.push("이름은 2~4 글자의 한글");
		if(!(/^(?=.*[^a-zA-Z0-9])(?=.*).{6,20}$/.test(join_pwd.value))) txt.push("비밀번호는 특수문자 포함한 6~20자");
		document.querySelector(".join_txt").innerHTML = txt.map(x=> x).join(', ')+"이여야 합니다.";
	});
		
	let now = 0;
	let isSliding = false;
	$(".controller-btn").on('click',(e)=>{
		log(isSliding);
		if(isSliding) return;
		isSliding = true;
		let num = e.target.dataset.num;
		now += num*1;
		if(now < 0) now = 2;
		if(now > 2) now = 0;
		$(".active").removeClass("active");
		$(".visual-btn-box .visual-ctn-btn").eq(now).addClass("active");
		$(".slider-pannel").animate({left:now*-100+"%"},800,()=>{
			isSliding = false;
		});
	});

	$(".visual-btn-box .visual-ctn-btn").on("click",(e)=>{
		if(isSliding) return;
		isSliding = true;
		now = e.target.dataset.idx*1;
		$(".active").removeClass("active");
		$(".visual-btn-box .visual-ctn-btn").eq(now).addClass("active");
		$(".slider-pannel").animate({left:now*-100+"%"},800,()=>{
			isSliding = false;
		});
	});
});


function login_submit(e){
	if(login_id.value == "" || login_pwd.value == ""){
		alert('입력값이 입력되지 않았습니다.');
		return false;
	}
	return true;
}

function join_submit(e){
	
	return false;
}