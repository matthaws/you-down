json.array! @events do |event|
  json.partial! '/api/shared/event', event: event
end
