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

Customer.create!(firstname: "Anushank", lastname: "lal", email: "anushank@gmail.com", password: "1234567")
Customer.create!(firstname: "Demo", lastname: "demo", email: "demo@gmail.com", password: "qwerty1")
Customer.create!(firstname: "Test", lastname: "test", email: "test@gmail.com", password: "qwerty2")

