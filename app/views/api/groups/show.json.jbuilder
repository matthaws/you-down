json.extract! @group, :id, :group_name, :description, :location_zip, :location_name
json.organizer do
  json.extract! @group.organizer, :full_name, :profile_pic, :id
  end
json.group_pic asset_path(@group.group_pic.url)
