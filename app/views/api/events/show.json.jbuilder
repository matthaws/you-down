json.extract! @event, :id
json.partial! '/api/shared/event', event: @event
