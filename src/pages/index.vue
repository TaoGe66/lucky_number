<template>
	<div class="index">
		<img src="../../static/img/底.jpg" alt="" class="bg">
		<img src="../../static/img/人生大赢家.png" alt="" class="title" :class="{'title_top':titleTop==1}" v-show="title">
		<img src="../../static/img/光.png" alt="" class="line" v-show="line">
		<img src="../../static/img/退出.png" alt="" class="out" v-show="out" @click="outPage()">
		<div class="ribbon" v-show="ribbon">
			<div class="ribbon_box">
				<img src="../../static/img/丝带.png" alt="" class="ribbon_img">
				<div class="ribbon_mask"></div>
			</div>
		</div>

		<ul v-show="typeSelect">
			<li v-for="(item,index) in list" @click="clickRoute(item)" class="list">
				<img :src="item.img" alt="" class="type_icon">
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[
					{
						name:'cart',
						img:'./static/img/车牌号icon.png',
					},
					{
						name:'phone',
						img:'./static/img/手机号.png',
					},
					{
						name:'birthday',
						img:'./static/img/生日封面.png',
					},
					{
						name:'marry',
						img:'./static/img/结婚纪念日.png',
					},
					{
						name:'card',
						img:'./static/img/身份购彩.png',
					},
					{
						name:'await',
						img:'./static/img/期待.png',
					},
				],

				titleTop: 0,
				title: false,
				line: false,
				ribbon: false,
				out: false,
				typeSelect: false,

				token: this.$route.query.token,
				snNo: this.$route.query.deviceNo,
				lotteryId: this.$route.query.lotteryId,
				amount: this.$route.query.amount,
				typeId: this.$route.query.typeId,
			}
		},
		created(){
			setTimeout(()=>{
				this.title = true;
			},600)
			setTimeout(()=>{
				this.line = true;
			},1200)
			setTimeout(()=>{
				this.ribbon = true;
			},1800)
			setTimeout(()=>{
				this.titleTop = 1;
				this.line = false;
				this.ribbon = false;
			},3000)
			setTimeout(()=>{
				this.typeSelect = true;
				this.out = true;
			},3500)
		},
		methods: {
			clickRoute(item){
				this.$router.push({
          path: '/'+item.name,
          query: {
            lotteryId: this.lotteryId,
            snNo: this.snNo,
            token: this.token,
            amount: this.amount,
            typeId: this.typeId,
          }
        })
			},

			// 退出
			outPage(){
				window.hcbWeb.close();
			},
		},

	}
</script>

<style scoped>
.index{
	width: 100%;
	height: 100vh;
	background-color: black;
  overflow: hidden;
  -webkit-perspective: 1500px;
          perspective: 1500px;
}
img{
	display: inline-block;
}

.bg{
	width: 100%;
	animation: bg 0.2s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 1;
}
@keyframes bg{
	0%{
		transform: rotateZ(180deg);
	}
	100%{
		transform: rotateZ(0deg);
	}
}

.title{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 70%;
	animation: title 0.5s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 2;
}
@keyframes title{
	0%{
		top: -600px;
		transform: scale(0);
	}
	100%{
		top: -200px;
		transform: scale(1);
	}
}
.title_top{
	animation: titletop 0.5s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes titletop{
	0%{
		top: -200px;
		transform: scale(1);
	}
	100%{
		top: -750px;
		transform: scale(0.55);
	}
}

.line{
	position: absolute;
	top: 300px;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 70%;
	height: 30px;
	animation: line 0.3s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 3;
}
@keyframes line{
	0%{
		width: 0;
	}
	100%{
		width: 70%;
	}
}

.out{
	position: absolute;
	top: 50px;
	right: 50px;
	animation: out 0.3s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 3;
}
@keyframes out{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

.ribbon{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 180px;
	margin: auto;
	width: 100%;
	height: 176px;
	z-index: 3;
}
.ribbon_box{
	position: relative;
}
.ribbon_img{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.ribbon_mask{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 30%;
	height: 176px;
	animation: mask 0.8s ease-in-out;
	animation-fill-mode: forwards;
	z-index: 4;
	background-color: black;
}
@keyframes mask{
	0%{
		width: 100%;
	}
	100%{
		width: 30%;
	}
}

ul{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 90%;
	margin: 350px auto 0;
	z-index: 5;
	animation: type 0.5s ease-in-out;
	animation-fill-mode: forwards;
}
@keyframes type{
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
.list{
	display: inline-block;
	width: 30%;
	margin: 0 1.66% 40px;
	z-index: 5;
}
.type_icon{
	width: 100%;
	z-index: 5;
}
</style>













