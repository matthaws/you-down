require 'byebug'

class Api::RsvpsController < ApplicationController
  def create
    @rsvp = Rsvp.new(rsvp_params)
    if @rsvp.save
      render json: @rsvp, status: 200
    else
      render json: @rsvp.errors.full_messages, status: 422
    end
  end

  def destroy

    rsvp = Rsvp.find_by(event_id: param[:event_id]).where(attendee_id: current_user.id)
    if rsvp.destroy
      render json: rsvp
    else
      render json: "You aren't going to this event!"
    end
  end

  private
  def rsvp_params
    params.require(:rsvp).permit(:event_id, :attendee_id)
  end
end
