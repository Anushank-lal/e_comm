class OrderLine < ActiveRecord::Base
  validates :order_id, :product_id, :qty, :unit_price, :total_price, presence: true
end

