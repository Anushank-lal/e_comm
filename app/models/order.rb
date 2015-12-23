class Order < ActiveRecord::Base
  validates :order_no, :customer_id, :total, :date, presence: true
  has_many :order_lines, dependent: :destroy
end
