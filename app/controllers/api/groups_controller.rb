class Api::GroupsController < ApplicationController
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to api_group_url(@group.id)
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to api_user_url(@group.id)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.find(params[:id])
    render :show
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    render :show
  end

  private
  def group_params
    params.require(:group).permit(:group_name, :id, :location_name, :location_zip, :description, :organizer_id, :member_moniker, :group_pic)
  end
end
