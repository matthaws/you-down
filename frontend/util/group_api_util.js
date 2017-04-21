
export const fetchGroup = (groupId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/groups/${groupId}`
  });
};
