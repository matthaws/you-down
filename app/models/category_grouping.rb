class CategoryGrouping < ActiveRecord::Base

belongs_to :group,
  class_name: "Group",
  foreign_key: :group_id,
  primary_key: :id

belongs_to :category,
 class_name: "Category",
 foreign_key: :category_id,
 primary_key: :id
end
