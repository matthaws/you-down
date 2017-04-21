json.extract! @user, :full_name, :id
json.profile_pic asset_path(@user.profile_pic.url)
