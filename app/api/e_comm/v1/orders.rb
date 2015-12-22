module EComm
  module V1
    class Orders < Grape::API
      version 'v1'
      format :json
      formatter :json, Grape::Formatter::Rabl

      desc "Add Product to Cart items"
      params do
        requires :order_id, type: Integer, allow_blank: false
        requires :product_id, type: Integer, allow_blank: false
        requires :qty, type: Integer, allow_blank: false
      end

      put :cart_items, rabl: "/api/v1/orders/cart_items.json.rabl" do
        begin
          @cart_items = OrderLine.new
          product = Product.find_by(id: params[:product_id])
          unit_price = product.price
          total_price = (unit_price * params[:qty])
          @cart_items.attributes =
          {
            order_id: params[:order_id], product_id: params[:product_id],
            qty: params[:qty], unit_price: unit_price, total_price: total_price
          }

          error!({error: @cart_items.errors.full_messages}, 400) if !(@cart_items.save!)
        rescue Exception => e
          error!({ error: "Internal Server Error" }, 500)
        end
      end

    end
  end
end
