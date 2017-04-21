class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :group_name, null: false
      t.string :location_name, null: false
      t.integer :location_zip, null: false
      t.text :description, null: false
      t.integer :organizer_id, null: false
      t.string :member_moniker, default: "members"
      t.attachment :group_pic
    end

    add_index :groups, :group_name
    add_index :groups, :organizer_id
    add_index :groups, :location_zip
  end
end
