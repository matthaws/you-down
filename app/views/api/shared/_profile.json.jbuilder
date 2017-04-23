json.extract! user, :email, :full_name, :location_name, :location_zip, :bio, :id

json.groups do
  json.array! user.joined_groups do |joined_group|
    json.extract! joined_group, :group_name, :id, :organizer_id
    json.group_pic asset_path(joined_group.group_pic.url)
  end
end

json.profile_pic asset_path(user.profile_pic.url)
