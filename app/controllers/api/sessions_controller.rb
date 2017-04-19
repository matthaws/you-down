class Api::SessionsController < ApplicationController

  def create
    user_params = params[:user]
    @user = User.find_by_credentials(user_params[:email], user_params[:password])

    if @user
      log_in(@user)
      render :show
    else
      render json:"Invalid email or password", status: 422
    end
  end

  def destroy
    if current_user
      log_out!
      render json: {}
    else
      render json: "Not logged in", status: 404
    end
  end
end
