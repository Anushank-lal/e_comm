class Order < ActiveRecord::Base
  validates :order_no, :customer_id, :total, :date, presence: true
  has_many :order_lines, dependent: :destroy

  enum status: { not_confirmed: 0, confirmed: 1 }
  enum payment: { declined: 0, success: 1, pending: 2}

end
