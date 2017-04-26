class Event < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_content, :against => [:event_name, :description]

  
  validates :date, :event_name, :description, :location_address, presence: true

  belongs_to :organizer,
    class_name: "User",
    foreign_key: :organizer_id,
    primary_key: :id

  belongs_to :group,
    class_name: "Group",
    foreign_key: :group_id,
    primary_key: :id

  has_many :rsvps,
    class_name: "Rsvp",
    foreign_key: :event_id,
    primary_key: :id

  has_many :attendees,
    through: :rsvps,
    source: :attendee

end
