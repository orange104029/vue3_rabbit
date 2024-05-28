<script setup>
import { useMouseInElement } from '@vueuse/core';
import { ref,watch } from 'vue';

defineProps({
  imageList:{// 图片列表
    type:Array,
    default:()=>[]//默认为空
  }
})





const activeIndex = ref(0)
//将当前图片的索引i赋值给activeIndex
const enterhandler = (i) => {
    activeIndex.value=i
}
//初始化target为null，渲染左侧大图时赋值为对应的div
const target = ref(null)
//useMouseInElement为vue内置的函数，参数为某个元素，elementX,elementY,isOutside分别为鼠标距离该元素左上角的x,y,以及是否在元素内部
const {elementX,elementY,isOutside}=useMouseInElement(target)

const left=ref(0)
const top=ref(0)

const positionX = ref(0)
const positionY = ref(0)

watch([elementX,elementY],()=>{
  if (isOutside.value) {
    return 
  }
  if(elementX.value>100 && elementX.value<300){
    left.value=elementX.value-100
  }
  if(elementY.value>100 && elementY.value<300){
    top.value=elementY.value-100
  }
  if(elementX.value>300){
    left.value=200
  }
  if(elementY.value>300){
    top.value=200
  }
  if(elementX.value<100){
    left.value=0
  }
  if(elementY.value<100){
    top.value=0
  }

  positionX.value=-left.value*2
  positionY.value=-top.value*2

})
</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <!-- 将整个图片盒子打上ref标记，为target -->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!--  img：当前迭代的元素值。
            i：当前迭代的索引值。
            imageList：被迭代的数组。 -->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)" :class="{active: i === activeIndex}">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        //设置了背景图片在 X 轴和 Y 轴上的位置
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
        width: 80px;

        li {
        width: 68px;
        height: 68px;
        margin-left: 12px;
        margin-bottom: 15px;
        cursor: pointer;

        &:hover,
        &.active {
            border: 2px solid $xtxColor;
        }
        }
     }
}
</style>