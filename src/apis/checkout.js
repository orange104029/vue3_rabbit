import httpInstance from "@/utils/http";
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}
export const craeteOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}