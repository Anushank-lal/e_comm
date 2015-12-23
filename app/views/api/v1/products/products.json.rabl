node(:products) do
  @products.map{|x| x.attributes}
end

node(:result_count) do
@products.count
end

node(:last) do
@products.last.id if @products.present?
end
