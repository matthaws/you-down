class Api::GroupsController < ApplicationController
  def create
    @group = Group.new(group_params)
    if @group.save
      membership = Membership.new
      membership.member_id = @group.organizer_id
      membership.group_id = @group.id
      membership.save
      if params['group']['selectedCategories']
        params['group']['selectedCategories'].each do |category|
          category = Category.find_by(title: category)
          CategoryGrouping.create("group_id": @group.id, category_id: category.id)
        end
      end
      @user = current_user
      render :create
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def index
    @groups = Group.includes(:members, :group_events).all
    render :index
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
    params.require(:group).permit(:group_name, :selectedCategories, :id, :location_name, :location_zip, :description, :organizer_id, :member_moniker, :group_pic)
  end
end
