```js
// State after visiting route: '/group/7'
{
  session: {
    currentUser: {
      id: 5,
      name: "Matt H.",
      profile_pic: 83
    },
    errors: []
  },

  groups: {
    7: {
    id: 7,
    group_name: "Cool People of Brooklyn",
    location_name: "Brooklyn! Woot woot!",
    location_zip: 11206,
    description: "All the coolest people live in Brooklyn. Let's meet up and discuss how great our borough is!",
    organizer_id: 5,
    member_moniker: "hipsters",
    group_pic: 37,
    members: {
      6: {
        id: 6,
        name: "Frankie",
        profile_pic: 184
      },

      29: {
        id: 29,
        name: "Maxwell",
        profile_pic: 25
        }
      }
    }
  },

  events: {
    27: {
      id: 27,
      date: {Datetime Object},
      name: "Craft beer tasting",
      location_name: "Irony Bar",
      location_address: "160 Jerry Ave, Brooklyn",
      location_zip: 11206,
      description: "Irony is serving terrible new beers that we will all pretend to enjoy ironically"
    },
    35: {
      id: 35,
      date: {Datetime Object},
      name: "Board games and BBQ",
      location_name: "Matt's house",
      location_address: "260 Johnny St. Apt 3R",
      location_zip: 11206,
      description: "Let's play some board games and enjoy the spring air by using my BBQ! Facial hair required."
    }
  },

  users: {

  }
}
