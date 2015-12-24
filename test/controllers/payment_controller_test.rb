require 'test_helper'

class PaymentControllerTest < ActionController::TestCase
  test "should get payment_result" do
    get :payment_result
    assert_response :success
  end

end
