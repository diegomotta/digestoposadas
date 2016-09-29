class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
#protect_from_forgery with: :null_session
#before_action :authenticate_user!,:user_signed_in?
protect_from_forgery prepend: true
#protect_from_forgery with: :exception
# before_action :configure_permitted_parameters, if: :devise_controller?

# protected

# 	def configure_permitted_parameters
# 	  devise_parameter_sanitizer.permit(:sign_in) do |user_params|
# 	    user_params.permit(:username, :email)
# 	  end
# 	end

end
