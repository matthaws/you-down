class Api::EventsController < ApplicationController
  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to api_event_url(@event.id)
    else
      render json: @event.errors.full_messages, status: 422
  end

  def update
    @event = Event.find(params[:id])
    if @event.update
      redirect_to api_event_url(@event.id)
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def show
    @event = Event.includes(:group, :organizer).find(params[:id])
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
