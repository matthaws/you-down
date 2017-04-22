json.extract! @group, :id, :member_moniker, :group_name, :description, :location_zip, :location_name
json.organizer do
  json.extract! @group.organizer, :full_name, :profile_pic, :id
  end
json.members do
  json.array! @group.members do |member|
    json.extract! member, :full_name, :id
    json.profile_pic asset_path(member.profile_pic.url)
  end
end
json.group_pic asset_path(@group.group_pic.url)
