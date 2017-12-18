class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.datetime :date, null: false
      t.string :event_name, null: false
      t.text :description, null: false
      t.string :string
      t.string :location_address, null: false
      t.integer :location_zip
      t.integer :group_id, null: false
      t.integer :organizer_id, null: false
    end

    add_index :events, :date
    add_index :events, :location_address
    add_index :events, :location_zip
    add_index :events, :group_id
    add_index :events, :organizer_id
  end
end
