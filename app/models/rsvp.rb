class Rsvp < ActiveRecord::Base
  validates :attendee_id, uniqueness: {scope: :event_id}
  validates :attendee_id, :event_id, presence: true

  belongs_to :attendee,
    class_name: "User",
    foreign_key: :attendee_id,
    primary_key: :id

  belongs_to :event,
    class_name: "Event",
    foreign_key: :event_id,
    primary_key: :id

end
