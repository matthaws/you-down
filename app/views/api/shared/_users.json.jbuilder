json.extract! user, :id, :full_name
json.joined_groups do
  json.array! user.joined_groups do |joined_group|
    json.extract! joined_group, :group_name, :id
  end
end
json.profile_pic user.profile_pic.url
