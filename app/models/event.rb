class Event < ActiveRecord::Base
  validates :date, :event_name, :description, :location_address, presence: true

  belongs_to :organizer,
    class_name: "User",
    foreign_key: :organizer_id,
    primary_key: :id

  belongs_to :group,
    class_name: "Group",
    foreign_key: :group_id,
    primary_key: :id

end
