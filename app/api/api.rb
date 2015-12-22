class API < Grape::API
  # error_formatter :json, API::ErrorFormatter

  before do
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Request-Method'] = '*'
  end


  helpers do
  end

  prefix :api

  mount EComm::V1::Users

end
