class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.bio = ""
    @user.location_name = ""
    if @user.save
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :full_name, :location_zip, :bio, :location_name, :profile_pic)
  end
end
