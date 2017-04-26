class Group < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_by_content, :against => [:group_name, :description]
  validates :group_name, uniqueness: true, presence: true
  validates :location_name, :location_zip, :description, :organizer_id, presence: true
  has_attached_file :group_pic, default_url: "DEFAULT"
  validates_attachment_content_type :group_pic, content_type: /\Aimage\/.*\z/

  belongs_to :organizer,
    class_name: "User",
    foreign_key: :organizer_id,
    primary_key: :id

  has_many :memberships,
    class_name: "Membership",
    foreign_key: :group_id,
    primary_key: :id,
    dependent: :destroy

  has_many :members,
    through: :memberships,
    source: :member

  has_many :group_events,
    class_name: "Event",
    foreign_key: :group_id,
    primary_key: :id,
    dependent: :destroy

  has_many :category_groupings,
    class_name: "CategoryGrouping",
    foreign_key: :group_id,
    primary_key: :id,
    dependent: :destroy

  has_many :categories,
    through: :category_groupings,
    source: :category

end
