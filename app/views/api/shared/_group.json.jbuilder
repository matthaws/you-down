json.extract! group, :id, :member_moniker, :group_name, :description, :location_zip, :location_name
json.organizer do
  json.extract! group.organizer, :full_name, :profile_pic, :id
  end
json.members do
  json.array! group.members do |member|
    json.extract! member, :full_name, :id
    json.profile_pic asset_path(member.profile_pic)
  end
end
json.events do
  json.array! group_events do |event|
    json.extract! event, :event_name, :id, :location_address, :location_name, :date, :description
    json.attendeeNum event.attendees.length
  end
end
json.group_pic asset_path(group.group_pic.url)
