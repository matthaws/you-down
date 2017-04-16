# state slices
- session - current user info and errors

- users - used for profile pages
  + on profile page, groups user is member of are passed nested within the user's JSON Object


- groups - used for group show pages and search results
  + on group show page, members and events arrive nested


- events - used for event show pages and search results
  + on event show page, parent group and attendees arrive nested


- categories - used to populate welcome page and in search filters

```js
// state on accessing /groups/7
{
  session: {
    current_user: {
      id: 3,
      user_name: "Matty H.",
      profile_pic: 20
    },
    errors: []    
  },

  groups: {
    id: 21,
    group_name: "Star Wars Fans of Brooklyn",
    location_name: "Brooklyn, NY -- a long time ago, and a borough away!",
    location_zip: 11206,
    description: "It's a great time to be a Star Wars Fan! Let's celebrate the new movies by hanging out in Brooklyn, playing SW trivia, and talking about how much we hate the prequels!",
    organizer_id: 3,
    member_moniker: "Star Wars Nerds",
    group_pic: 28,
    members: {
      93: {
        id: 93,
        user_name: "Boba Jake",
        profile_pic: 201
      },
      109: {
        id: 109,
        user_name: "Darth Jessica",
        profile_pic: 84
      }
    },
    events: {
      upcoming: {
        10: {
          id: 10,
          date: DatetimeObject,
          name: "EPISODE VIII!!!",
          num_attendees: 8
        }
      },
      recent: {
        5: {
          id: 5,
          date: DatetimeObject,
          name: "Gather to watch the new trailer!",
          num_attendees: 6
        }
      }
    }
  },

  events: {
    //nothing, will populate on event show page or in search results
  },

  categories: {
    //nothing, will populate on welcome page or in search results
  }
}


}


```
