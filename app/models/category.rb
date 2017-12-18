class Category < ActiveRecord::Base

  has_many :category_groupings,
    class_name: "CategoryGrouping",
    foreign_key: :category_id,
    primary_key: :id

  has_many :groups,
    through: :category_groupings,
    source: :group

end
