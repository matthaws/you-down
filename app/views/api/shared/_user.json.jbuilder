json.extract! user, :id, :full_name
json.group_ids user.joined_groups.pluck(:id)
json.profile_pic user.profile_pic.url
