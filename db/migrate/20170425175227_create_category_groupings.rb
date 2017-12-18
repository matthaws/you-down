class CreateCategoryGroupings < ActiveRecord::Migration[5.0]
  def change
    create_table :category_groupings do |t|
      t.integer :category_id, null: false
      t.integer :group_id, null: false
    end
  end
end
