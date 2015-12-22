class Product < ActiveRecord::Base
  validates :name, :price, :description, :status, presence: true
  enum status: { enabled: 0, disabled: 1 }
  validates_inclusion_of :status, :in => ['enabled', 'disabled']
end
