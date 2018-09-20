let carousels=[//轮播内容
  {"url":"#","image":"img/img_1.jpg","title":"img_1.jpg"},
  {"url":"#","image":"img/img_2.jpg","title":"img_2.jpg"},
  {"url":"#","image":"img/img_3.jpg","title":"img_3.jpg"},
  {"url":"#","image":"img/img_4.jpg","title":"img_4.jpg"},
  {"url":"#","image":"img/img_5.jpg","title":"img_5.jpg"},
  {"url":"#","image":"img/img_6.jpg","title":"img_6.jpg"}
];
new Vue({
  el: '#carousel',
  data:{
    active: -1,//当前轮播图位置
    carousel: carousels,//轮播内容
    isSetTimeout: true,//定时器
    isCarousel: false,//是否鼠标移入暂停轮播
    leaveToClass: null,//轮播图片离开时的动画，不同方向，动画不同
    interval: 3000//每张图片的间隔空隙
  },
  methods:{
    carouselAnimate:function () {//轮播动画
      this.isCarousel || this.move(1);//如果没有鼠标移入暂停轮播，则轮播下一张图
      this.isSetTimeout && setTimeout(this.carouselAnimate.bind(this),this.interval)
    },
    move:function (direction,index) {//direction为轮播方向，正数为右，负数为左。index为当前轮播图
      let num = this.active;
      num = index === undefined ? num + direction : index;
      num = num < this.carousel.length ?
        num < 0 ?
          this.carousel.length-1 :
          num :
        0;
      this.active = num;
      this.leaveToClass = direction > 0 ? "carousel-animate-leave-to-left" : "carousel-animate-leave-to-right";
    }
  },
  created:function () {//创建实例之后获取
    if(this.carousel === undefined || Object.prototype.toString.call(this.carousel) !== '[object Array]'){
      console.error("请正确设置您的轮播内容");
    }else if(this.carousel.length < 1 ){
      console.warn("轮播图少于一张，无法轮播")
    }else {
      let i =0,n = 0;
      for(;i< this.carousel.length ; i++) {//预加载图片
        let img = new Image();
        img.src = this.carousel[i].image;
        img.onload = ()=>{
          n++;
          n === this.carousel.length && this.carouselAnimate();//开始轮播
        }
      }
    }
  },
  destroyed:function () {//销毁组件时清除定时器
    this.isSetTimeout = false;
  }
})
