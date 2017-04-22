class Api::MembershipsController < ApplicationController

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render json: @membership, status: 200
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end


  def destroy
    membership = Membership.find(params[:id])
    membership.destroy
    render json: membership 
  end

  private
  def membership_params
    params.require(:membership).permit(:group_id, :member_id)
  end
end
