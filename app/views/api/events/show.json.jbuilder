json.extract! @event, :date, :event_name, :description, :location_name, :location_address, :location_zip
json.organizer do
  json.extract! @event.organizer, :id, :full_name, :profile_pic
end
json.group do
  json.extract! @event.group, :id, :group_name, :group_pic
end
