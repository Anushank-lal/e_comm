class Order < ActiveRecord::Base
  validates :order_no, :customer_id, :total, :date, presence: true
end
