class Api::MembershipsController < ApplicationController

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      @user = User.find(@membership.member_id)
      @group = Group.includes(:members, :group_events, :organizer).find(@membership.group_id)

      render :create
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end


  def destroy
    membership = Membership.where("group_id = ?", params[:group_id]).find_by(member_id: current_user.id)
    if membership.destroy
      render json: membership
    else
      render json: "You aren't part of this group!"
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:group_id, :member_id)
  end
end
