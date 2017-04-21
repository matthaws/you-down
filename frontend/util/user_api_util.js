export const editUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.get('user[id]')}`,
    dataType: "json",
    contentType: false,
    processData: false,
    data: user
  });
};

export const fetchUser = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  });
};
