# YouDown?

[Live version on heroku][heroku]
[Project page on Trello][trello]

[heroku]: https://you-down.herokuapp.com/
[trello]: https://trello.com/b/T2wVTqqC

## Minimum Viable Product
YouDown? is a web application inspired by Meetup. It will be built using Ruby on Rails and React/Redux. At the end of the two-week development process, the app will have fully implemented the following key features with smooth, bug-free navigation, adequate seed data, and sufficient CSS styling.

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo log-in
- [ ] User feed and editable profile
- [ ] Groups and joining groups
- [ ] Events and RSVPs
- [ ] Calendar (on group page)
- [ ] Search by location and group info (name, description)
- [ ] BONUS: Categories
- [ ] BONUS: Calendar (for all groups in search results)
- [ ] BONUS: Google Map implementation for Events
- [ ] BONUS: Google/Facebook log-in API implementation

## Design Docs
* [View Wireframes][wireframes]
* [API Endpoints][api]
* [React Components][components]
* [DB schema][schema]
* [Sample State][state]

[wireframes]: ./wireframes
[api]: ./api-endpoints.md
[schema]: ./schema.md
[components]: ./component-hierarchy.md
[state]: ./sample-state.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication and landing page (2 days)

**Objective** Functioning rails project with skeleton of home page and full auth form, ability to create user accounts, log-in and log-out.

### Phase 2: User Profiles (1 day)

**Objective** Profile pages. Can view any user's profile and edit profile if it is current user's profile page.  

### Phase 3: Groups (1 day)

**Objective** Ability to create and join groups, group show page.

### Phase 4: Events (1 day)

**Objective** Ability to create and RSVP to events, event show page.

### Phase 5: Search (2 days)

**Objective** Can search groups by category, location, name, and description

### Phase 6: Calendars (2 days)

**Objective** Calendar component added to group page displaying all upcoming events.

### BONUS Features (TBD)
- [ ] Categories
- [ ] Calendar component in search results
- [ ] Can leave comments on events.
- [ ] Google & Facebook log-in option
