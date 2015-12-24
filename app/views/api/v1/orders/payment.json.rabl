node(:order) do
  @order.attributes.merge(order_no: @order.order_no , status: @order.status, payment_url: "http://localhost:3001/process_payment", payment_return_url: "http://localhost:3000/payment_result")
end


