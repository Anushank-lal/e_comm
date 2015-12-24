# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




Product.create!(status:0 , name: "Product 1", price: 10.40, description: "Test")
Product.create!(status:0 , name: "Product 2", price: 20.10, description: "Test description")
Product.create!(status:0 , name: "Product 3", price: 25.20, description: "Test description")
Product.create!(status:0 , name: "Product 4", price: 21.10, description: "Test description")
Product.create!(status:0 , name: "Product 5", price: 22.50, description: "Test description")

Customer.create!(firstname: "Demo", lastname: "demo", email: "demo@gmail.com", password: "qwerty1")
Customer.create!(firstname: "Anushank", lastname: "lal", email: "anushank@gmail.com", password: "1234567")
Customer.create!(firstname: "Test", lastname: "test", email: "test@gmail.com", password: "qwerty2")

product = Product.first
unit_price = product.price
total_price = (unit_price * params[:qty])
order_no = rand.to_s[2..8]
@order = Order.create!(status: 0, order_no: order_no, customer_id: Customer.first.id, total: total_price, date: Date.today)
@cart_item = OrderLine.new
@cart_item.attributes =
{
  order_id: @order.id, product_id: product.id],
  qty: 2, unit_price: unit_price, total_price: total_price
}
@cart_item.save!
