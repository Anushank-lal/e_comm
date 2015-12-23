class AddStatusToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :status, :integer
    add_column :orders, :payment, :integer
  end
end
