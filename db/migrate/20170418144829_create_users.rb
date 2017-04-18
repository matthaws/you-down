class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :location_name
      t.integer :location_zip, null: false
      t.text :bio
    end

    add_index :users, :email
    add_index :users, :full_name
    add_index :users, :session_token
    add_index :users, :location_zip
  end
end
