json.extract! @user, :full_name, :id
json.image_url asset_path(@user.profile_pic.url)
