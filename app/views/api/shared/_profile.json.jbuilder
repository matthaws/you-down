json.extract! user, :email, :full_name, :location_name, :location_zip, :bio, :id

json.joined_groups do
  json.array! user.joined_groups do |joined_group|
    json.extract! joined_group, :group_name, :id, :organizer_id
  )
  end
end

json.profile_pic user.profile_pic.url
