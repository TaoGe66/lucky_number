<template>
	<div class="card">
		<div class="bg">
			<img src="../../static/img/card/标题.png" alt="" class="title" v-show="title">
			<div class="title_mask"></div>
			<img src="../../static/img/card/bg底.png" alt="" class="bg_bottom">
			<img src="../../static/img/card/bg02星空.png" alt="" class="star_sky" v-show="starSky">
			<img src="../../static/img/card/星星.png" alt="" class="star">
			<div class="star_sky_mask" v-show="starSky"></div>
		</div>	

		<img src="../../static/img/card/退出btn'.png" alt="" class="out_page opacity2" v-show="wenan" @click="outPage()">
		<img src="../../static/img/card/每个人的身份证号与自己都似乎是冥冥中注定一般.png" alt="" class="wenan opacity2" v-show="wenan">
		<div class="input_box box1_anim" v-show="box1">
			<div class="padding_box">
				<div class="padding_border">
					<img src="../../static/img/card/快输入.png" alt="" class="inputbox_title">
					<div class="input_small_box">
						<input type="text" class="input" v-show="input" ref="input1" v-model="modelInput1">
						<input type="text" class="input" v-show="input" ref="input2" v-model="modelInput2">
						<input type="text" class="input" v-show="input" ref="input3" v-model="modelInput3">
						<input type="text" class="input" v-show="input" ref="input4" v-model="modelInput4">
					</div>
					<img src="../../static/img/card/btn.png" alt="" class="input_btn active" @click="inputBtn()">
				</div>
			</div>
		</div>

		<img src="../../static/img/card/关闭02.png" class="out_page opacity" v-show="box2" @click="hideBox()">
		<img src="../../static/img/card/嗨.png" alt="" class="wenan opacity" v-show="box2">
		<div class="input_box box2_anim" v-show="box2">
			<div class="padding_box">
				<div class="padding_border">
					<ul class="small_box">
						<li class="select_box active" v-for="(item,index) in getLucky" @click="seleteClick(item,index)">
							<p class="name">{{item.name}}</p>
							<p class="number" style="font-size: 24px;">{{item.code | newCode}}</p>
							<img src="../../static/img/card/勾.png" alt="" class="select" v-if="seleteArrTest.indexOf(index)>=0">
						</li>
					</ul>

					<img src="../../static/img/card/换一批.png" alt="" class="tab active" @click="tab()">
					<div class="result" v-show="result">
						<img src="../../static/img/card/已选张.png" alt="" class="result_text">
						<span class="result1">{{seleteArr.length}}</span>
						<span class="result2">{{totalNo}}</span>
					</div>
					<img src="../../static/img/card/支付btn.png" @click="getOrderId()" class="pay active" v-if="pay==0">
					<img src="../../static/img/card/支付btn.png" class="pay active" v-if="pay==1">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				title: true,
				starSky: false,
				wenan: false,
				box1: false,
				box2: false,
				input: false,
				result: false,

				modelInput1: '',
				modelInput2: '',
				modelInput3: '',
				modelInput4: '',

				getLucky: [],

				token: this.$route.query.token,
				snNo: this.$route.query.snNo,
				lotteryId: this.$route.query.lotteryId,
				amount: this.$route.query.amount,
				typeId: this.$route.query.typeId,

				seleteArr: [],
				seleteArrTest: [],
				code: '',
				pay: 1,
				singles: '',
				singlesUnlock: '',
				orderObj: '',
			}
		},
		mounted(){
			setTimeout(()=>{
				this.starSky = true;
			},2200);
			setTimeout(()=>{
				this.wenan = true;
				this.title = false;
			},2800);
			setTimeout(()=>{
				this.box1 = true;
			},3300);
			setTimeout(()=>{
				this.input = true;
			},5200);

			let _this = this;

			// 支付成功的回调
			window.onPaySuccess=function(){
				let orId = 0;
				orId = parseInt(_this.orderObj.orderId);
				window.hcbWeb.openDjPage(orId);
				_this.pay = 1;
				_this.seleteArr = [];
				_this.seleteArrTest = [];
			};

			// 支付失败的回调
			window.onPayCancel=function(){
				_this.seleteArr = [];
				_this.seleteArrTest = [];
				_this.pay = 1;
				_this.unlock();
				_this.getLuckyData();
			};

			// 兑奖成功的回调
			window.onDjSuccess=function(){
				_this.seleteArr = [];
				_this.seleteArrTest = [];
				_this.pay = 1;
				_this.getLuckyData();
			};
		},
		computed: {
			totalNo(){
				let count = 0;
				for(let i = 0 ; i < this.seleteArr.length ; i++){
			    count += parseInt(this.seleteArr[i].price);
				}
				return count;
			}
		},
		methods:{
			// 获取彩票数据
			getLuckyData(){
				let code2 = this.modelInput1+','+this.modelInput2+','+this.modelInput3+','+this.modelInput4;
				this.$http.get('/api/activity/winner/code',{
					params: {
						// lotteryId: this.lotteryId,
						lotteryId: '47',
						code: code2,
					}	
				}).then((res)=>{
					console.log(res);
					if(res.data.status==1){
						this.getLucky = res.data.data;
					}
				},(err)=>{
					console.log(err)
				})
			},

			inputBtn(){
				// window.hcbWeb.hideSysUI();
				if(this.modelInput1!=''&&this.modelInput2!=''&&this.modelInput3!=''&&this.modelInput4!=''){
					this.getLuckyData();
					setTimeout(()=>{
						this.box1 = false;
						this.wenan = false;
						this.box2 = true;
					},300)
				}
			},

			// 选择当前
			seleteClick(item,index){
				if(this.seleteArrTest.indexOf(index)==-1){
					this.seleteArrTest.push(index);
					this.seleteArr.push(item);
					// console.log(this.seleteArr)
				}else{
					let indx = this.seleteArrTest.indexOf(index);
					this.seleteArrTest.splice(indx,1);
					this.seleteArr.splice(indx,1);
					// console.log(this.seleteArr)
				}
			},

			//换一批
			tab(){
				this.getLuckyData();
				this.unlock();
				this.seleteArrTest = [];
				this.seleteArr = [];
			},

			// 解锁彩票
			unlock(){
				this.singlesUnlock = '';
				this.getLucky.forEach((item,index)=>{
					this.singlesUnlock += item.id+',';
				})
				let formData = new FormData();
				formData.append('id',this.singlesUnlock)
				formData.append('token',this.token)
				formData.append('type',2)
				this.$http.post('/api/common/ticket/unlock',formData).then((res)=>{
					console.log(res);
				},(err)=>{
					console.log(err)
				})
			},

			// 微信下单
			getOrderId(){
				this.pay = 1;
				this.singles = '';
				this.seleteArr.forEach((item,index)=>{
					this.singles += item.id+',';
				});
				this.openPay();
			},
			openPay(){
				// this.pay = 1;
				let length = this.seleteArrTest.length;
				let formData = new FormData();
				formData.append('token',this.token)
				// formData.append('amount',1)
				formData.append('amount',this.amount*length)
				formData.append('snNo',this.snNo)
				formData.append('lotteryId',this.lotteryId)
				formData.append('singles',this.singles)
				formData.append('type',3)  //1:普通下单 2:翻牌 3:人生大赢家 4:星座选号 5:生肖选号

				this.$http.post('/api/common/wechat/order',formData).then((res)=>{
					// console.log(res.data)
					if(res.data.status == 1){
						this.orderObj = res.data.data;
						// alert(this.orderObj.orderId+','+this.orderObj.url);
						window.hcbWeb.openPayPage(this.orderObj.orderId,this.orderObj.url);
					}
				},(err)=>{
					console.log(err)
				})
			},

			// 退出
			outPage(){
				window.hcbWeb.close();
			},

			// 关闭第二弹窗
			hideBox(){
				this.unlock();
				this.wenan = true;
				this.box1 = true;
				this.box2 = false;
				this.modelInput1 = '';
				this.modelInput2 = '';
				this.modelInput3 = '';
				this.modelInput4 = '';
				this.seleteArr = [];
				this.seleteArrTest = [];
				this.pay = 1;
			},

		},
		updated(){
			if(this.input==true){
				setTimeout(()=>{
					this.$refs['input1'].focus();
				},1200)
			}
			if(this.modelInput1.length==1){
				this.$refs['input2'].focus();
			}
			if(this.modelInput2.length==1){
				this.$refs['input3'].focus();
			}
			if(this.modelInput3.length==1){
				this.$refs['input4'].focus();
			}
			if(this.modelInput4.length==1){
				this.$refs['input4'].blur();
			}
			if(this.seleteArrTest.length>0){
				this.pay = 0;
			}
			// if(this.modelInput1.length>1){
			// 	this.modelInput1 = '';
			// }
			// if(this.modelInput2.length>1){
			// 	this.modelInput2 = '';
			// }
			// if(this.modelInput3.length>1){
			// 	this.modelInput3 = '';
			// }
			// if(this.modelInput4.length>1){
			// 	this.modelInput4 = '';
			// }
		},

	}
</script>

<style scoped>

.card{
  width:100%;
  height:100vh;
	overflow: hidden;
}
img{
	display: inline-block;
}

.bg{
	position: relative;
	width: 100%;
	height: 100vh;
	background-color: #000026;
	z-index: 0;
}
.title{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 3;
}
.title_mask{
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	width: 1500px;
	height: 400px;
	-webkit-box-shadow: -20px 0 80px #000026;
	        box-shadow: -20px 0 80px #000026;
	background-color: #000026;
	z-index: 50;
	-webkit-animation: titlemask 3s ease-in-out;
	        animation: titlemask 3s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
@-webkit-keyframes titlemask{
	0%{
		width: 1500px;
	}
	100%{
		width: 0;
	}
}
@keyframes titlemask{
	0%{
		width: 1500px;
	}
	100%{
		width: 0;
	}
}
.bg_bottom{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	width: 85%;
	margin: auto;
	z-index: 1;
}
.star_sky{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	margin: auto;
	z-index: 1;
}
.star_sky_mask{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	height: 870px;
	margin: auto;
	-webkit-animation: skymask 0.3s ease-in-out;
	        animation: skymask 0.3s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
	background-color: #000026;
	z-index: 2;
}
@-webkit-keyframes skymask{
	0%{
		width: 100%;
	}
	100%{
		width: 0;
	}
}
@keyframes skymask{
	0%{
		width: 100%;
	}
	100%{
		width: 0;
	}
}

.star{
	position: absolute;
	top: 30%;
	right: 23%;
	width: 120px;
	z-index: 2;
	-webkit-animation: star 0.8s infinite linear;
	        animation: star 0.8s infinite linear;
}
@-webkit-keyframes star{
	0%{
		opacity: 0;
	}
	50%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
@keyframes star{
	0%{
		opacity: 0;
	}
	50%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}

.wenan{
	position: absolute;
	left: 0;
	right: 0;
	top: 175px;
	z-index: 10;
	margin: auto;
	-webkit-animation: wenan 0.5s ease-in-out;
	        animation: wenan 0.5s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
@-webkit-keyframes wenan{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@keyframes wenan{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.out_page{
	position: absolute;
	right: 60px;
	top: 70px;
	z-index: 100;
}

/*第一个box*/
.input_box{
	width: 1200px;
	height: 605px;
	position: absolute;
	left: 0;
	right: 0;
	top: 310px;
	margin: 0 auto;
	z-index: 10;
	border-radius:48px;
	border:10px solid rgba(23,72,166,1);
	-webkit-animation: input 0.5s ease-in-out;
	        animation: input 0.5s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
.box1_anim{
	-webkit-animation: box1 1.5s ease-in-out;
	        animation: box1 1.5s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
@-webkit-keyframes box1{
	0%{
		left: -3500px;
	}
	40%{
		left: 150px;
	}
	60%{
		left: -100px;
	}
	80%{
		left: 50px;
	}
	100%{
		left: 0;
	}
}
@keyframes box1{
	0%{
		left: -3500px;
	}
	40%{
		left: 150px;
	}
	60%{
		left: -100px;
	}
	80%{
		left: 50px;
	}
	100%{
		left: 0;
	}
}
.padding_box{
	position: relative;
}
.padding_border{
	width: 1140px;
	height: 545px;
	margin: 20px auto;
	border-radius:28px;
	border: 3px solid rgba(23,72,166,1);
}
.inputbox_title{
	display: block;
	margin: 120px auto 70px;
}
.input_small_box{
	width: 504px;
	margin: 0 auto;
}
.input{
	display: inline-block;
	width:80px;
	height:90px;
	border:2px solid white;
	border-radius:6px;
	margin: 0 21px;
	font-size: 40px;
	background-color: #000026; 
	outline: none;
	color: white;
	text-align: center;
	-webkit-animation: input 1s ease-in-out;
	        animation: input 1s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
@-webkit-keyframes input{
	0%{
		opacity: 0;
	}
	40%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(-4deg);
		        transform: rotateZ(-4deg);
	}
	60%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(2deg);
		        transform: rotateZ(2deg);
	}
	80%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(-2deg);
		        transform: rotateZ(-2deg);
	}
	100%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(0deg);
		        transform: rotateZ(0deg);
	}
}
@keyframes input{
	0%{
		opacity: 0;
	}
	40%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(-4deg);
		        transform: rotateZ(-4deg);
	}
	60%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(2deg);
		        transform: rotateZ(2deg);
	}
	80%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(-2deg);
		        transform: rotateZ(-2deg);
	}
	100%{
		opacity: 1;
		-webkit-transform-origin: 100% 0%;
		        transform-origin: 100% 0%;
		-webkit-transform: rotateZ(0deg);
		        transform: rotateZ(0deg);
	}
}
.input_btn{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 78px;
	display: block;
	margin: auto;
}

/*第二个box*/
.box2_anim{
	-webkit-animation: box2 1s ease-in-out;
	        animation: box2 1s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
@-webkit-keyframes box2{
	0%{
		top: 1200px;
	}
	100%{
		top: 310px;
	}
}
@keyframes box2{
	0%{
		top: 1200px;
	}
	100%{
		top: 310px;
	}
}
.small_box{
	font-size: 0;
	text-align: center;
	margin-top: 120px;
}
.select_box{
	position: relative;
	display: inline-block;
	width: 320px;
	height: 180px;
	background-image: url("../../static/img/card/彩票bg.png");
	background-size: 100% 100%;
	margin: 0 25px;
	vertical-align: top;
}
.name,.number{
	font-weight:bold;
	font-size:26px;
	color: white;
}
.name{
	margin: 30px 0 15px;
}
.select{
	display: block;
	position: absolute;
	right: 73px;
	bottom: 25px;
}
.tab{
	position: absolute;
	left: 70px;
	bottom: 86px;
}
.pay{
	position: absolute;
	right: 70px;
	bottom: 72px;
}
.result{
	position: absolute;
	right: 205px;
	bottom: 80px;
}
.result1{
	position: absolute;
	right: 165px;
	bottom: 0;
	display: block;
	color: white;
	font-size: 23px;
	font-weight: bold;
}
.result2{
	position: absolute;
	right: 25px;
	bottom: 0;
	display: block;
	width: 40px;
	height: 30px;
	text-align: center;
	color: white;
	font-size: 23px;
	font-weight: bold;
}

/*公共的淡入*/
.opacity{
	-webkit-animation: opacitys 1s ease-in-out;
	        animation: opacitys 1s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
.opacity2{
	-webkit-animation: opacitys2 2.5s ease-in-out;
	        animation: opacitys2 2.5s ease-in-out;
	-webkit-animation-fill-mode: forwards;
	        animation-fill-mode: forwards;
}
.active:active{
	-webkit-transition: all 0.5s;
	-o-transition: all 0.5s;
	transition: all 0.5s;
	-webkit-transform: scale(0.8);
	    -ms-transform: scale(0.8);
	        transform: scale(0.8);
}
@-webkit-keyframes opacitys{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@keyframes opacitys{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@-webkit-keyframes opacitys2{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@keyframes opacitys2{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

</style>













