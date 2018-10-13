<template>
	<div class="cart">
		<img src="../../static/img/矢量智能对象.jpg" alt="" class="bg" v-show="bg">	
		<img src="../../static/img/摆牌.png" alt="" class="baipai" v-show="baipai">
		<img src="../../static/img/车牌.png" alt="" class="bg_top" v-show="bgTop">
		<img src="../../static/img/迈凯伦跑车 (1).png" alt="" class="cart1" v-show="cart1">
		<img src="../../static/img/车2.png" alt="" class="cart2" v-show="cart2">
		<img src="../../static/img/题目.png" alt="" class="timu" v-show="timu">
		<img src="../../static/img/text.png" alt="" class="text_img" v-show="textImg">
		<div class="mask" v-show="bgMask"></div>
		<img src="../../static/img/开始检测.png" alt="" class="ready" v-show="ready" @click="readyClick()">
		<!-- <img src="../../static/img/开始检测.png" alt="" class="ready" v-show="ready"> -->
		<div v-show="inputShow">
			<img src="../../static/img/木板all.png" alt="" class="input_img">
			<input type="text" class="enter1" v-show="enter" ref="input1" v-model="modelInput1">
			<input type="text" class="enter2" v-show="enter" ref="input2" v-model="modelInput2">
			<input type="text" class="enter3" v-show="enter" ref="input3" v-model="modelInput3">
			<input type="text" class="enter4" v-show="enter" ref="input4" v-model="modelInput4">
			<input type="text" class="enter5" v-show="enter" ref="input5" v-model="modelInput5">
			<!-- <img src="../../static/img/数字格子.png" alt="" class="input_img2"> -->
		</div>
		<div v-show="inputShow2">
			<img src="../../static/img/木板1.png" class="input_img_fan">
		</div>
		<div v-show="bigMuban">
			<img src="../../static/img/退出.png" alt="" class="out grid_anim" v-show="grid" @click="outPage()">
			<img src="../../static/img/木板2.png" class="big_muban">
			<img src="../../static/img/字格子.png" class="grid grid_anim" v-show="grid">
			<div class="grid_left" v-show="gridLeft">
				<ul>
					<li class="list" v-for="(item,index) in getLucky" @click="seleteClick(item,index)">
						<img :src="item.img" alt="" class="lucky_img">
						<img src="../../static/img/组4.png" class="list_img grid_anim">
						<img src="../../static/img/selete.png" alt="" class="selete grid_anim" v-if="seleteArrTest.indexOf(index)>=0">
						<span class="lucky_number">{{item.code | newCode}}</span>
					</li>
				</ul>
			</div>
			<div class="grid_right" v-show="gridRight">
				<img src="../../static/img/我们已经为您挑选出.png" class="right grid_anim">
				<span class="font">{{code2}}</span>
				<img src="../../static/img/已选.png" class="result grid_anim">
				<span class="font2">{{seleteArr.length}}</span>
				<span class="font3">{{totalNo}}</span>
				<img src="../../static/img/换一批.png" class="tab grid_anim" :class="{'active_anim':activeAnim==1}" @click="tabLucky()">
				<img src="../../static/img/付款.png" class="sub grid_anim" :class="{'active_anim':activeAnim2==1}" @click="getOrderId()" v-if="pay==0">
				<img src="../../static/img/付款.png" class="sub grid_anim" :class="{'active_anim':activeAnim2==1}" v-if="pay==1">
			</div>
		</div>
		<div class="tips" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;padding-top: 500px;text-align: center;z-index: 100;background-color: white;" v-if="load">
			<p class="load" style="">正在加载中，请稍后...</p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				load: true,
				bg: false,
				baipai: false,
				bgTop: false,
				cart1: false,
				cart2: false,
				timu: false,
				textImg: false,
				bgMask: false,
				ready: false,
				inputShow: false,
				inputShow2: false,
				bigMuban: false,
				grid: false,
				gridLeft: false,
				gridRight: false,
				enter: false,
				pay: 1,
				activeAnim: 0,
				activeAnim2: 0,

				modelInput1: '',
				modelInput2: '',
				modelInput3: '',
				modelInput4: '',
				modelInput5: '',

				getLucky: [],
				code: '',
				code2: '',
				seleteArr: [],
				seleteArrTest: [],

				token: this.$route.query.token,
				snNo: this.$route.query.snNo,
				lotteryId: this.$route.query.lotteryId,
				amount: this.$route.query.amount,
				typeId: this.$route.query.typeId,
				// singles: this.$route.query.singles,
				singles: '',
				singlesUnlock: '',
				orderObj: '',
			}
		},
		mounted() {
			setTimeout(()=>{
				this.load = false;
				setTimeout(()=>{
					this.bg = true;
				},800);
				setTimeout(()=>{
					this.baipai = true;
				},1600);
				setTimeout(()=>{
					this.bgTop = true;
				},2400);
				setTimeout(()=>{
					this.cart1 = true;
				},3200);
				setTimeout(()=>{
					this.cart2 = true;
				},3400);
				setTimeout(()=>{
					this.timu = true;
				},4200);
				setTimeout(()=>{
					this.textImg = true;
				},4800);
				setTimeout(()=>{
					this.bgMask = true;
				},6300);
				setTimeout(()=>{
					this.inputShow = true;
					setTimeout(()=>{
						this.enter = true;
					},3500);
				},7300);
				setTimeout(()=>{
					this.ready = true;
				},9800);
			},3000);


			let _this = this;
			// this.getLuckyData();

			// 支付成功的回调
			window.onPaySuccess=function(){
				let orId = 0;
				orId = parseInt(_this.orderObj.orderId);
				window.hcbWeb.openDjPage(orId);
				_this.activeAnim2 = 0;
				_this.pay = 0;
				_this.seleteArr = [];
				_this.seleteArrTest = [];
			};

			// 支付失败的回调
			window.onPayCancel=function(){
				_this.seleteArr = [];
				_this.seleteArrTest = [];
				_this.activeAnim2 = 0;
				_this.activeAnim = 0;
				_this.pay = 0;
				_this.unlock();
				_this.getLuckyData();
			};

			// 兑奖成功的回调
			window.onDjSuccess=function(){
				_this.seleteArr = [];
				_this.seleteArrTest = [];
				_this.activeAnim2 = 0;
				_this.activeAnim = 0;
				_this.pay = 0;
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
		methods: {
			// 获取数据
			getLuckyData(){
				this.code2 = this.modelInput1+','+this.modelInput2+','+this.modelInput3+','+this.modelInput4+','+this.modelInput5;
				this.$http.get('/api/activity/winner/code',{
					params: {
						lotteryId: this.lotteryId,
						code: this.modelInput1+''+this.modelInput2+''+this.modelInput3+''+this.modelInput4+''+this.modelInput5,
					}	
				}).then((res)=>{
					console.log(res.data.data);
					if(res.data.status==1){
						this.getLucky = res.data.data;
					}
				},(err)=>{
					console.log(err)
				})
			},

			// 开始检测
			readyClick(){
				window.hcbWeb.hideSysUI();
				if(this.modelInput1!=''&&this.modelInput2!=''&&this.modelInput3!=''&&this.modelInput4!=''&&this.modelInput5!=''){
					this.getLuckyData();
					this.inputShow = false;
					this.inputShow2 = true;
					setTimeout(()=>{
						this.inputShow2 = false;
					},500);
					setTimeout(()=>{
						this.ready = false;
						this.bigMuban = true;
					},400);
					setTimeout(()=>{
						this.grid = true;
					},1200);
					setTimeout(()=>{
						this.gridLeft = true;
					},2000);
					setTimeout(()=>{
						this.gridRight = true;
					},1700);
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

			// 换一批
			tabLucky(){
				this.seleteArr = [];
				this.seleteArrTest = [];
				this.getLuckyData();
				this.gridLeft = false;
				setTimeout(()=>{
					this.gridLeft = true;
				},500);
				this.unlock();
			},

			// 解锁彩票
			unlock(){
				this.activeAnim = 1;
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
					this.activeAnim = 0;
					// if(res.data.status == 1){
					// 	this.orderIdGet = res.data.data;
					// 	this.flop();
					// }
				},(err)=>{
					console.log(err)
				})
			},

			// 微信下单
			getOrderId(){
				this.activeAnim2 = 1;
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
				this.unlock();
				window.hcbWeb.close();
			},
		},
		updated(){
			if(this.enter==true){
				this.$refs['input1'].focus();
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
				this.$refs['input5'].focus();
			}
			if(this.modelInput5.length==1){
				this.$refs['input5'].blur();
			}
			if(this.seleteArrTest.length>0){
				this.pay = 0;
			}
		},

	}
</script>

<style scoped>
img{
	display: inline-block;
}
.cart{
	position: relative;
  width:100%;
  height:100vh;
  overflow: hidden;
  -webkit-perspective: 1500px;
          perspective: 1500px;
}

.bg{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	animation: bg 0.8s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 1;
}
@keyframes bg{
	0%{
		top: -1100px;
	}
	50%{
		top: 0;
	}
	60%{
		top: -150px;
	}
	75%{
		top: 0;
	}
	90%{
		top: -50px;
	}
	100%{
		top: 0;
	}
}

.baipai{
	position: absolute;
	right: 0;
	top: 0;
	bottom: -630px;
	margin: auto;
	animation: baipai .8s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 3;
}
@keyframes baipai{
	0%{
		transform-origin:50% 100%;
		transform: rotateZ(90deg);
	}
	100%{
		transform-origin:50% 100%;
		transform: rotateZ(0deg);
	}
}

.bg_top{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	animation: bgTop .8s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 3;
}
@keyframes bgTop{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.cart1{
	position: absolute;
	right: 0;
	top: 0;
	bottom: -615px;
	margin: auto;
	width: 90%;
	z-index: 2;
	animation: cart1 .8s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes cart1{
	0%{
		right: 1950px;
	}
	100%{
		right: -1150px;
	}
}

.cart2{
	position: absolute;
	left: -600px;
	top: 0;
	bottom: -615px;
	margin: auto;
	width: 60%;
	z-index: 2;
	animation: cart2 .6s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes cart2{
	0%{
		right: 1900px;
	}
	100%{
		right: 1400px;
	}
}

.timu{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1000px;
	margin: auto;
	width: 43%;
	z-index: 4;
	animation: timu .6s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes timu{
	0%{
		bottom: 1000px;
	}
	70%{
		bottom: 150px;
	}
	85%{
		bottom: 200px;
	}
	100%{
		bottom: 150px;
	}
}

.text_img{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 30px;
	margin: auto;
	z-index: 4;
	animation: textimg 1s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes textimg{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.mask{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 465px;
	margin: auto;
	z-index: 4;
	background-color: rgba(0,0,0,0.5);
	box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
	animation: mask 1s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes mask{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.ready{
	position: absolute;
	left: 0;
	right: -1450px;
	top: 0;
	bottom: -370px;
	margin: auto;
	z-index: 4;
	animation: ready 1s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes ready{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.input_img{
	position: absolute;
	left: 0;
	right: 0;
	top: -150px;
	margin: auto;
	z-index: 4;
	animation: inputimg 3s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes inputimg{
	0%{
		top: -700px;
		transform-origin:50% 0%;
		transform: rotateZ(0deg);
	}
	10%{
		top: -550px;
		transform-origin:50% 0%;
		transform: rotateZ(30deg);
	}
	20%{
		top: -430px;
		transform-origin:50% 0%;
		transform: rotateZ(-25deg);
	}
	30%{
		top: -340px;
		transform-origin:50% 0%;
		transform: rotateZ(20deg);
	}
	40%{
		top: -260px;
		transform-origin:50% 0%;
		transform: rotateZ(-15deg);
	}
	50%{
		top: -200px;
		transform-origin:50% 0%;
		transform: rotateZ(10deg);
	}
	60%{
		top: -170px;
		transform-origin:50% 0%;
		transform: rotateZ(-8deg);
	}
	70%{
		top: -160px;
		transform-origin:50% 0%;
		transform: rotateZ(6deg);
	}
	80%{
		top: -150px;
		transform-origin:50% 0%;
		transform: rotateZ(-4deg);
	}
	90%{
		top: -140px;
		transform-origin:50% 0%;
		transform: rotateZ(2deg);
	}
	100%{
		top: -140px;
		transform-origin:50% 0%;
		transform: rotateZ(0deg);
	}
}

.input_img_fan{
	position: absolute;
	left: 0;
	right: 0;
	top: -140px;
	margin: auto;
	z-index: 4;
	animation: inputimgfan .5s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes inputimgfan{
	0%{
		top: -140px;
		transform-origin:50% 0%;
		transform: rotateY(0deg);
		opacity: 1;
	}
	100%{
		top: 0px;
		transform-origin:50% 0%;
		transform: rotateY(-90deg);
		opacity: 0;
	}
}

.out{
	position: absolute;
	right: 40px;
	top: 10px;
	margin: auto;
	z-index: 10;
}

.big_muban{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	margin: auto;
	width: 90%;
	z-index: 6;
	animation: bigmuban .4s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes bigmuban{
	0%{
		top: -90px;
		width: 60%;
		transform-origin:50% 0%;
		transform: rotateY(-110deg);
		opacity: 0;
	}
	100%{
		top: -30px;
		width: 90%;
		transform-origin:50% 0%;
		transform: rotateY(-180deg);
		opacity: 1;
	}
}
.grid{
	position: absolute;
	left: 0;
	right: 0;
	top: -15px;
	bottom: 0;
	margin: auto;
	z-index: 7;
}
.grid_anim{
	animation: grid .3s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes grid{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
.active_anim{
	animation: activeanim .3s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes activeanim{
	0%{
		transform: scale(.9);
	}
	100%{
		transform: scale(1);
	}
}
.grid_left,.grid_right{
	/*animation: grid .3s ease-in-out;
	animation-fill-mode: forwards;*/
}

ul{
	position: relative;
	width: 64%;
	height: 76vh;
	border: 1px solid rgba(0,0,0,0);
	margin: 12vh auto;
	padding: 2.25vh 0;
	z-index: 8;
}
.list{
	position: relative;
	margin: 2.25vh;
	width: 58%;
	z-index: 8;
}
.lucky_img{
	position: absolute;
	top: 7px;
	left: 7px;
	z-index: 9;
	width: 107px;
	height: 110px;
}
.list_img{
	/*z-index: 9;*/
}
.lucky_number{
	position: absolute;
	top: 39px;
	left: 173px;
	width: 370px;
	text-align: center;
	font-size: 35px;
	font-weight: bold;
}
.selete{
	position: absolute;
	top: 30px;
	right: 30px;
}

.right{
	position: absolute;
	top: 260px;
	right: 400px;
	margin: auto;
	z-index: 8;
}
.font{
	position: absolute;
	top: 450px;
	right: 410px;
	z-index: 8;
	color: #df3031;
	font-family: "Comic Sans MS", cursive, sans-serif;
	font-weight: bold;
	font-size: 80px;
}
.result{
	position: absolute;
	bottom: 280px;
	right: 410px;
	margin: auto;
	width: 300px;
	z-index: 8;
}
.font2{
	position: absolute;
	bottom: 270px;
	right: 628px;
	margin: auto;
	color: #df3031;
	font-size: 38px;
	font-weight: bold;
	z-index: 8;
}
.font3{
	position: absolute;
	bottom: 270px;
	right: 443px;
	margin: auto;
	color: #df3031;
	font-size: 38px;
	font-weight: bold;
	z-index: 8;
}
.tab{
	position: absolute;
	bottom: 200px;
	right: 650px;
	margin: auto;
	z-index: 8;
}
.sub{
	position: absolute;
	bottom: 190px;
	right: 410px;
	margin: auto;
	z-index: 8;
}

.enter1,.enter2,.enter3,.enter4,.enter5{
	display: block;
	width: 80px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	font-size: 45px;
	outline: none;
	background-color: rgb(255,239,217);
	border: none;
	/*border: 1px solid red;*/
	z-index: 15;
}
.enter1{
	position: absolute;
	top: 210px;
	left: -500px;
	right: 0;
	margin: auto;
}
.enter2{
	position: absolute;
	top: 210px;
	left: -248px;
	right: 0;
	margin: auto;
}
.enter3{
	position: absolute;
	top: 210px;
	left: 3px;
	right: 0;
	margin: auto;
}
.enter4{
	position: absolute;
	top: 210px;
	left: 0;
	right: -253px;
	margin: auto;
}
.enter5{
	position: absolute;
	top: 210px;
	left: 0;
	right: -504px;
	margin: auto;
}
	
</style>













