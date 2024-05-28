import httpInstance from "@/utils/http";

export function getCategoryAPI(){
    return httpInstance({
        url: '/home/category/head'
    })
}

// 导入了第一个文件中定义的 axios 实例 httpInstance，然后定义了一个名为 getCategoryAPI 的函数，用于发送请求获取分类数据。

// 在这个函数中，它调用了 httpInstance 并传入了一个配置对象，其中包括了请求的 URL /home/category/head。然后，httpInstance 函数会发送请求到指定的 URL，并返回一个 Promise 对象，该 Promise 对象将在请求完成后被 resolve，其值为响应数据。

// 这个文件通过调用 httpInstance 函数来实现了 axios 发送请求的功能，并将响应数据返回给调用方。