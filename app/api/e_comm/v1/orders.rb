module EComm
  module V1
    class Orders < Grape::API
      version 'v1'
      format :json
      formatter :json, Grape::Formatter::Rabl

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
          order_no = rand.to_s[2..8]
          @order = Order.find_by(customer_id: params[:customer_id])
          @order = Order.create!(order_no: order_no, customer_id: params[:customer_id], total: total_price, date: Date.today) if @order.blank?

          @cart_item = OrderLine.new
          @cart_item.attributes =
          {
            order_id: @order.id, product_id: params[:product_id],
            qty: params[:qty], unit_price: unit_price, total_price: total_price
          }

          error!({error: @cart_item.errors.full_messages}, 400) if !(@cart_item.save!)
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
          @orders = Order.where(customer_id: params[:customer_id]).limit(limit).offset(offset)
          error!({error: ('No Orders available.')}, 400) if @orders.nil?
        rescue Exception => e
          error!({ error: I18n.t('api.internal_server_error')}, 500)
        end
      end

    end
  end
end
