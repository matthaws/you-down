
export const fetchGroup = (groupId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/groups/${groupId}`
  });
};

export const createGroup = (group) => {
  return $.ajax({
    method: 'POST',
    url: `/api/groups`,
    data: { group }
  });
};

export const updateGroup = (group) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/groups/${group.get('group[id]')}`,
    dataType: "json",
    contentType: false,
    processData: false,
    data: group
  });
};

export const deleteGroup = (groupId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/${groupId}`
  });
};
