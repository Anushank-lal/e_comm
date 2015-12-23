class Order < ActiveRecord::Base
  validates :order_no, :customer_id, :total, :date, presence: true
  has_many :order_lines, dependent: :destroy

  enum status: { in_cart: 0, not_confirmed: 1, confirmed: 2 }
  enum payment: { declined: 0, success: 1, pending: 2}

  scope :cart_orders, -> { where(status: 0) }

end
