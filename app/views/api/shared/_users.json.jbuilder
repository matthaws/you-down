json.extract! user, :id, :full_name
json.profile_pic asset_path(user.profile_pic.url)
