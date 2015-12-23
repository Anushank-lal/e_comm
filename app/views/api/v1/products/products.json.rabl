node(:products) do
  @products.map{|x| x.attributes.merge(status: x.status)}
end

node(:result_count) do
@products.count
end

node(:last) do
@products.last.id if @products.present?
end
