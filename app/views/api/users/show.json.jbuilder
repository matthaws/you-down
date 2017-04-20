json.extract! @user, :email, :full_name, :location_name, :location_zip, :bio, :id
json.profile_pic asset_path(@user.profile_pic.url)
