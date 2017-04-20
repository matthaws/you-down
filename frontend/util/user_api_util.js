export const editUser = (user) => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const fetchUser = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  });
};
