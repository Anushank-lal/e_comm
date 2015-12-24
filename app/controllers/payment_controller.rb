class PaymentController < ApplicationController
  def payment_result
    @order_no = params[:order_no]
    @status = params[:status]
    @order = Order.find_by(order_no: params[:order_no])
    if @status == true
      @order.update_attributes!(status: 2)
    else
      @order.update_attributes!(status: 1)
    end
    redirect_to "http://localhost:3000/payment_response?status=#{@status}&order_no=#{@order_no}"

  end
end
