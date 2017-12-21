json.extract! group, :id, :member_moniker, :group_name, :description, :location_zip, :location_name
json.organizer_id group.organizer.id
json.member_ids group.members.pluck(:id)
json.event_ids group.group_events.pluck(:id)
