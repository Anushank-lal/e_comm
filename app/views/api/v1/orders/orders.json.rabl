node(:orders) do
  @orders.map{|x| x.attributes.merge(status: x.status)}
end

node(:result_count) do
@orders.count
end

node(:last) do
@orders.last.id  if @orders.present?
end
