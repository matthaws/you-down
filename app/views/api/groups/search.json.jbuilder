json.array! @groups do |a_group|
  json.extract! a_group, :id, :member_moniker, :group_name, :description, :location_zip, :location_name

  json.organizer do
    json.extract! a_group.organizer, :full_name, :profile_pic, :id
    end
  json.members do
    json.array! a_group.members do |member|
      json.extract! member, :id
    end
  end
end
