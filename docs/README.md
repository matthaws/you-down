# YouDown?

[Project page on Trello][trello]

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
- [ ] Categories
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

**Objective** Functioning rails project with skeleton of home page and full auth form, ability to create user accounts, log-in, and user's main page and profile page.

### Phase 2: Groups & Events (2 days)

**Objective** Ability to create and join groups, create and rsvp to events, with group and event show pages.

### Phase 3: Categories (1 day)

**Objective** Organizers can label groups as one or more categories, can view all groups in a specific category.

### Phase 4: Search (2 days)

**Objective** Can search groups by category, location, name, and description

### Phase 5: Calendars (2 days)

**Objective** Calendar component added to group page displaying all upcoming events.

### BONUS Features (TBD)
- [ ] Calendar component in search results populated by upcoming events in groups returned by search
- [ ] Can leave comments on events.
- [ ] Google & Facebook log-in option
