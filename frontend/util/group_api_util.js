
export const fetchGroup = (groupId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/groups/${groupId}`
  });
};

export const createGroup = (group) => {
  return $.ajax({
    method: 'POST',
    url: `api/groups`,
    data: { group }
  })
}
