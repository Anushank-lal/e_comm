module EComm
  module V1
    class Users < Grape::API
      version 'v1'
      format :json
      formatter :json, Grape::Formatter::Rabl

      desc "Return user information",
      auth: { scopes: [] }
      params do
        requires :email, type: String, allow_blank: false, regexp: /.+@.+/, desc: "User Email"
        requires :password, type: String, allow_blank: false, desc: "User Password"
      end

      get :users, rabl: "/api/v1/users/create.json.rabl" do
        begin
          @user = Customer.find_by(email: params[:email])
          error!({error: ('No user with this email.')}, 400) if @user.nil?
          if @user.password.eql?(params[:password])
            @access_token = @user.password
          else
            error!({error: ('Invalid Password.')}, 400)
          end
        rescue Exception => e
          error!({ error: I18n.t('api.internal_server_error')}, 500)
        end
      end


      # user signup
      desc "Create new user and return user object, access token"
      params do
        requires :first_name, type: String, allow_blank: false, desc: "User First Name"
        requires :last_name, type: String, allow_blank: false, desc: "User Last Name"
        requires :email, type: String, allow_blank: false, regexp: /.+@.+/, desc: "User Email"
        requires :password, type: String, allow_blank: false, desc: "User password"
        requires :confirm_password, type: String, allow_blank: false, desc: "Confirm password"
      end

      post :signup, rabl: "/api/v1/users/create.json.rabl" do
        begin
          user = Customer.find_by(email: params[:email])
          error!({error: ("Email id: #{params[:email]} already exists")}, 400) if user.present?

          if params[:password] == params[:confirm_password]
            @user = Customer.new
            @user.attributes =
            {
              firstname: params[:first_name], lastname: params[:last_name],
              email: params[:email], password: params[:password]
            }

            if @user.save!
              @access_token = @user.password
            else
              error!({error: @user.errors.full_messages}, 400)
            end

          else
            error!({error: ('Password not matched.')}, 400)
          end

        rescue Exception => e
          error!({ error: ('Internal Server Error')}, 500)
        end
      end


    end
  end
end
