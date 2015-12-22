class CreateOrderLines < ActiveRecord::Migration
  def change
    create_table :order_lines do |t|
      t.integer :order_id
      t.integer :product_id
      t.integer :qty
      t.float :unit_price
      t.float :total_price

      t.timestamps null: false
    end
  end
end
