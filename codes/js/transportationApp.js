window.addEventListener("load",()=>{

	fetch('data/transportation.json').then((e)=>{return e.json()}).then(transportations=>{
		$.getJSON('data/reservation.json',(events)=>{
			$.getJSON('data/transportation_reservation.json',(reservations)=>{
				
				$("#transportation_date").on("input",(e)=>{
					let value = e.target.value;
					$("#res_date").val(value);
					let arr = events.reservations.filter(x=>{
						return new Date(x.until).toMyString() >= new Date(value).toMyString() && new Date(x.since).toMyString() <= new Date(value).toMyString();
					});
					$("#transportation-select").html(`<option value="null" selected>행사 선택</option>`);
					arr.forEach((x)=>{
						$("#transportation-select").append(`<option value="${x.id}" >${x.name}</option>`);
					});
				});

				$('#transportation-select').on("change",(e)=>{
					let value = e.target.value;
					let event = events.reservations.find(x=>{return x.id == value});
					$(".transportation-list").html("");
					if(event === undefined) return;
					let val = $("#transportation_date").val();
					let yoil = new Date(val).getDay(); // 0 1 2 3 4 5 6
					let filtered = transportations.transportation.filter(f=>{
						return f.rest.indexOf(yoil) == -1;
					});
					filtered.forEach(item=>{ // item => 각 교통정보
						let div = temp(item);
						$(div).on("click",()=>{
							$("#res_select").html("");
							$("#res_transport").val(item.name);
							let start = parseInt(item.cycle[0].split(":")[0])*60 + parseInt(item.cycle[0].split(":")[1]);
							let end = parseInt(item.cycle[1].split(":")[0])*60 + parseInt(item.cycle[1].split(":")[1]);
							for(let i = start; i <= end; i+=item.interval*1){
								let string = (Math.floor(i/60)+"").padStart(2,"0")+":"+(i%60+"").padStart(2,"0");
								let date = $("#transportation_date").val();

								let total = 0;
								let ft = reservations.transportation_reservation.filter(x=>{
									return x.date == date && string == x.time && x.transportation == item.id;
								}).forEach(x=>{
									total += x.member.old;
									total += x.member.adult;
									total += x.member.kids;
								});
								let left = item.limit - total;
								string += " 남은자리 : "+left;
								let option = document.createElement("option");
								option.innerHTML = string;
								option.setAttribute("value",string);
								$("#res_select").append(option);
							}
							$("#reserve").dialog();
						});
						$(".transportation-list").append(div);
					});

				});

			});

		});
	});

	Date.prototype.toMyString = function(){
		return this.getFullYear()+(this.getMonth()+1+"").padStart(2,"0")+(this.getDate()+"").padStart(2,"0");
	}

	function temp(item){
		let weekArr = ["일", "월", "화", "수", "목", "금", "토"]; 
		let div = document.createElement("div"); 
		div.classList.add("card"); 
		div.classList.add("col-4"); 
		// div.classList.add("card-onrun");
		div.innerHTML = `
		<div class="card-body">
		<h5 class="card-title">${item.name}</h5>
		<p class="card-text">
		${item.description}
		</p>
		</div>
		<ul class="list-group list-group-flush">
		<li class="list-group-item">간격 : ${item.interval}분</li>
		<li class="list-group-item">
		운행 시간대 : ${item.cycle[0]} ~ ${item.cycle[1]}
		</li>
		<li class="list-group-item">쉬는날 : ${item.rest.map(x=> weekArr[x]+"요일").join(',')}</li>
		<li class="list-group-item">운임 : ${item.price}</li>
		<li class="list-group-item">좌석 수 : ${item.limit}</li>
		</ul>`
		return div; 
	}
});

function reserve_submit(e){

	return false;
}