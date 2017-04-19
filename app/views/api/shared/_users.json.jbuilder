json.extract! user, :id, :full_name
json.image_url asset_path(user.profile_pic.url)
