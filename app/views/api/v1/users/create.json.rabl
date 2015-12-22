object @user

attributes :id, :firstname, :lastname, :email

node(:access_token) do
  @access_token
end
