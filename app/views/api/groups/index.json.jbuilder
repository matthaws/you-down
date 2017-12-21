json.groups do
  @groups.each do |group|
    json.set! group.id do
      json.partial! "api/shared/group", group: group
    end
  end
end
