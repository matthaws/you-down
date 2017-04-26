class Api::EventsController < ApplicationController
  def create
    @event = Event.new(event_params)
    if @event.save
      rsvp = Rsvp.new
      rsvp.event_id = @event.id
      rsvp.attendee_id = current_user.id
      rsvp.save
      @event = Event.includes(:group, :organizer, :attendees).find(rsvp.event_id)
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.includes(:group, :organizer, :attendees).find(params[:id])
    if @event.update(event_params)
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def search
    @events = Event.search_by_content(params[:search])
    render :index
  end

  def index
    @events = Event.all
    render :index
  end

  def show
    @event = Event.includes(:group, :organizer, :attendees).find(params[:id])
    render :show
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    render json: event
  end

  private
  def event_params
    params.require(:event).permit(:date, :event_name, :description, :location_name, :location_zip, :location_address, :organizer_id, :group_id)
  end
end
