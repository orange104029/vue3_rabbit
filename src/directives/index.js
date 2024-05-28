//引入了 VueUse 库中的 useIntersectionObserver 函数，用于监听元素是否进入视口区域。
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin={
    install(app){
        //注册了一个名为 img-lazy 的指令，用于懒加载图片。
        app.directive('img-lazy',{
            //指令的 mounted 钩子函数，在指令绑定的元素被插入到 DOM 中时调用。
            mounted(el,binding){
                //console.log(el,binding.value)//输出指令绑定的元素和绑定表达式的值，即图片的 URL。
                //使用 useIntersectionObserver 函数监听指令绑定的元素是否进入视口区域。stop 是一个函数，用于停止监听元素。
                const { stop } = useIntersectionObserver(
                    el,
                    //回调函数，当元素进入或离开视口时被调用。
                    // [ { isIntersecting } ] 这个数组包含一个对象，对象的键是 isIntersecting，代表元素是否进入了视口区域。
                    // isIntersecting 是一个布尔值，表示元素是否处于视口区域内，如果元素进入了视口区域，则值为 true，否则值为 false。
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            // 进入视口区域
                            el.src = binding.value//将图片元素的 src 属性设置为绑定表达式的值，即图片的 URL。
                            stop()//停止监听元素的状态变化，即停止懒加载功能。
                        }
                    },
                )
            }
        })
    }
}