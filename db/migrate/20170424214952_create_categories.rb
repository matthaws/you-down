class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :title, null: false
      t.attachment :category_pic
    end
  end
end
