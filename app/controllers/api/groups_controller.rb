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
    @groups = Group.includes(:members, :organizer, :group_events).order('random()').all
    render :index
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      @events = Event.includes(:attendees).find_by(group_id: @group.id)
      render :update
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.includes(:members, :organizer).find(params[:id])
    @events = Event.includes(:attendees).where("group_id = ?", @group.id)
    render :show
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    @user = current_user
    render :destroy
  end

  def search
    @groups = Group.includes(:members, :organizer, :group_events).search_by_content(params[:search])
    render :search
  end

  def category
    all_groups = Group.includes(:categories, :members, :group_events).all
    category_id = Category.find_by(title: params[:category]).id
    @groups = [];
    all_groups.each do |one_group|
      if one_group.categories.ids.include?(category_id)
        @groups << one_group
      end
    end

    render :index
  end

  private
  def group_params
    params.require(:group).permit(:group_name, :selectedCategories, :id, :location_name, :location_zip, :description, :organizer_id, :member_moniker, :group_pic)
  end
end
