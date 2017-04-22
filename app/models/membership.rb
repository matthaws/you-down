class Membership < ActiveRecord::Base
  validates :member_id, uniqueness: { scope: :group_id }

  belongs_to :member,
    class_name: "User",
    primary_key: :id,
    foreign_key: :member_id

  belongs_to :group,
    class_name: "Group",
    primary_key: :id,
    foreign_key: :group_id


end
