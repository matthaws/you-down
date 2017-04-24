class Api::GroupsController < ApplicationController
  def create
    @group = Group.new(group_params)
    if @group.save
      membership = Membership.new
      membership.member_id = @group.organizer_id
      membership.group_id = @group.id
      membership.save
      @user = current_user
      render :create
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      render :update
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.includes(:members, :group_events).find(params[:id])
    render :show
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    @user = current_user
    render :destroy
  end

  private
  def group_params
    params.require(:group).permit(:group_name, :id, :location_name, :location_zip, :description, :organizer_id, :member_moniker, :group_pic)
  end
end
