module EComm
  module V1
    class Orders < Grape::API
      version 'v1'
      format :json
      formatter :json, Grape::Formatter::Rabl


      desc "View Cart items for a Customer"
      params do
        requires :customer_id, type: Integer, allow_blank: false
      end

      get :cart_items, rabl: "/api/v1/orders/cart_items.json.rabl" do
       begin
          @order = Order.cart_orders.where(customer_id: params[:customer_id]).first
          @total_amount = 0
          @cart_items = @order.order_lines.map{|x| x.attributes } if @order.order_lines.present?
          @order.order_lines.map{|x| @total_amount += x.total_price } if @order.order_lines.present?
          error!({error: "No items in cart"}, 400) if @cart_items.blank?
        rescue Exception => e
          error!({ error: "Internal Server Error" }, 500)
        end
      end

      desc "Add Product to Cart items"
      params do
        requires :customer_id, type: Integer, allow_blank: false
        requires :product_id, type: Integer, allow_blank: false
        requires :qty, type: Integer, allow_blank: false
      end

      put :cart_items, rabl: "/api/v1/orders/cart_item.json.rabl" do
        begin
          product = Product.find_by(id: params[:product_id])
          unit_price = product.price
          total_price = (unit_price * params[:qty])
          total = total_price
          @order = Order.cart_orders.where(customer_id: params[:customer_id]).first
          if @order.blank?
            order_no = rand.to_s[2..8]
            @order = Order.create!(status: 0, order_no: order_no, customer_id: params[:customer_id], total: total_price, date: Date.today)
          else
            @order.order_lines.map { |e| total += e.total_price  }
            @order.update_attributes(total: total)
          end
          @cart_item = @order.order_lines.where(product_id: params[:product_id]).first
          if @cart_item.nil?
            @cart_item = OrderLine.new
            @cart_item.attributes =
            {
              order_id: @order.id, product_id: params[:product_id],
              qty: params[:qty], unit_price: unit_price, total_price: total_price
            }

            error!({error: @cart_item.errors.full_messages}, 400) if !(@cart_item.save!)
          else
            @cart_item.update_attributes!(qty: @cart_item.qty += params[:qty], total_price: @cart_item.total_price += total_price )
          end
        rescue Exception => e
         error!({ error: "Internal Server Error" }, 500)
        end
      end

      desc "List Orders for a User"
      params do
        requires :customer_id, type: Integer, allow_blank: false
        optional :limit, type: Integer, allow_blank: true
        optional :offset, type: Integer, allow_blank: true
      end

      get :orders, rabl: "/api/v1/orders/orders.json.rabl" do
        begin
          limit = params[:limit].nil? ? 10 : params[:limit]
          offset = params[:offset].nil? ? 0 : params[:offset]
          @orders = Order.where(customer_id: params[:customer_id]).limit(limit).offset(offset).order(:date)
          error!({error: ('No Orders available.')}, 400) if @orders.blank?
        rescue Exception => e
          error!({ error: I18n.t('api.internal_server_error')}, 500)
        end
      end

      desc "Initiate Payment"
      params do
        requires :order_no, type: String, allow_blank: false
      end

      get :payment, rabl: "/api/v1/orders/payment.json.rabl" do
        begin
          @order = Order.find_by(order_no: params[:order_no])
          error!({error: 'Order not exists.'}, 400) if @order.nil?
        rescue Exception => e
          error!({ error: "Internal Server Error" }, 500)
        end
      end


    end
  end
end
