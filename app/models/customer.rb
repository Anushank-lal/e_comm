class Customer < ActiveRecord::Base
  validates :firstname, :lastname, :email, :password, presence: true
  validates :email, uniqueness: true
  validates :password, length: { in: 7..20 }


end
