export const selectGroupMembers = (state, group) => {
  if (group.member_ids) {
    return group.member_ids.map(id => state.users[id]);
  }
  return [];
};

export const selectGroupEvents = (state, group) => {
  if (group.event_ids) {
    return group.event_ids.map(id => state.events[id]);
  }
  return [];
};
