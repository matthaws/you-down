
class Api::RsvpsController < ApplicationController
  def create
    @rsvp = Rsvp.new(rsvp_params)
    @event = Event.find_by(id: @rsvp.event_id)
    if @rsvp.save
      render :create
    else
      render json: "error"
    end
  end

  def destroy
    rsvp = Rsvp.where(attendee_id: current_user.id).find_by(event_id: params[:event_id])
    @event = Event.find_by(id: rsvp.event_id)
    if rsvp.destroy
      render :create
    else
      render json: "You aren't going to this event!"
    end
  end

  private
  def rsvp_params
    params.require(:rsvp).permit(:event_id, :attendee_id)
  end
end
