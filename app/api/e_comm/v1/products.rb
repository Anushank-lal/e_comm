module EComm
  module V1
    class Products < Grape::API
      version 'v1'
      format :json
      formatter :json, Grape::Formatter::Rabl

      desc "List Products"
      params do
        optional :limit, type: Integer, allow_blank: true
        optional :offset, type: Integer, allow_blank: true
      end

      get :products, rabl: "/api/v1/products/products.json.rabl" do
        begin
          limit = params[:limit].nil? ? 2 : params[:limit]
          offset = params[:offset].nil? ? 1 : params[:offset]
          @products = Product.limit(limit).offset(offset)
          error!({error: ('No products available.')}, 400) if @products.nil?
        rescue Exception => e
          error!({ error: I18n.t('api.internal_server_error')}, 500)
        end
      end

      desc "Create new Product"
      params do
        requires :description, type: String, allow_blank: false, desc: "Product Description"
        requires :name, type: String, allow_blank: false, desc: "Product Name"
        requires :price, type: String, allow_blank: false, desc: "Product Price"
        requires :status, type: String, allow_blank: false, desc: "Product status"
      end

      put :product, rabl: "/api/v1/products/create.json.rabl" do
        begin
          product = Product.find_by(name: params[:name])
          error!({error: ("Product name already exists")}, 400) if product.present?

          @product = Product.new
          @product.attributes =
          {
            name: params[:name], description: params[:description],
            price: params[:price], status: params[:status]
          }

          if @product.save!
            #error!({success: ('Product Created.')}, 200)
          else
            error!({error: @product.errors.full_messages}, 400)
          end
        rescue Exception => e
          error!({ error: ('Internal Server Error')}, 500)
        end
      end

      desc "Edit a Product"
      params do
        optional :description, type: String, allow_blank: false, desc: "Product Description"
        optional :name, type: String, allow_blank: false, desc: "Product Name"
        optional :price, type: String, allow_blank: false, desc: "Product Price"
        optional :status, type: String, allow_blank: false, desc: "Product status"
        requires :id, type: String, allow_blank: false, desc: "Product Id"
      end
      patch :product, rabl: "/api/v1/products/create.json.rabl" do
        begin
          @product = Product.find_by(id: params[:id])
          error!({error: ("Product name not exists")}, 400) if @product.nil?

          @product.update_attributes!(name: params[:name], description: params[:description],
            price: params[:price], status: params[:status])
          if !@product.errors.blank?
            error!({error: @product.errors.full_messages}, 400)
          end
        rescue Exception => e
          error!({ error: ('Internal Server Error')}, 500)
        end
      end


    end
  end
end
