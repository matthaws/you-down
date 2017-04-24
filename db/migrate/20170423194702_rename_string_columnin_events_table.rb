class RenameStringColumninEventsTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :events, :string, :location_name
  end
end
