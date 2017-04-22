
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
    url: `/api/groups/${group.id}`,
    data: { group }
  });
};

export const deleteGroup = (group) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/${group.id}`
  });
};
