node(:cart_items) do
  @cart_items.flatten
end

node(:items_count) do
  @cart_items.count
end

