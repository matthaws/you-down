json.array! @groups do |singleGroup|
    json.partial! '/api/shared/group', group: singleGroup
  end
