class Rsvp < ActiveRecord::Base
  validates :attendee_id, uniqueness: {scope: :group_id}
  validates :attendee_id, :group_id, presence: true

  belongs_to :attendee,
    class_name: "User",
    foreign_key: :attendee_id,
    primary_key: :id

  belongs_to :event,
    class_name: "Event",
    foreign_key: :event_id,
    primary_key: :id

end
