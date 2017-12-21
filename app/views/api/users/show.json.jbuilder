json.partial! 'api/shared/profile', user: @user

json.groups do
  @user.joined_groups.each do |group|
    json.set! group.id do
      json.partial! 'api/shared/group', group: group
    end
  end
end
