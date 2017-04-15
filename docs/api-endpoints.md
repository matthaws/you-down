# API Endpoints

## HTML API

- 'GET /' - loads React web app

## JSON API

### Users

- 'POST /api/users'
- 'PATCH /api/users'
- 'GET /api/users/:id'

### Session

- 'POST /api/session'
- 'DELETE /api/session'

### Groups
- 'GET /api/groups'
  - Accepts query params to return search results (name, date range, location, category)
- 'POST /api/groups'
- 'GET /api/groups/:id'
- 'PATCH /api/groups/:id'
- 'DELETE /api/groups/:id'

### Events
- 'GET /api/events'
  - Accepts query params to return search results (name, date range, location, category)
- 'POST /api/events'
- 'GET /api/events/:id'
- 'PATCH /api/events/:id'
- 'DELETE /api/events/:id'

### Memberships
- 'GET /api/groups/:id/members'
- 'POST /api/groups/:id/members'
- 'DELETE /api/groups/:id/members'

### RSVPs
- 'GET /api/events/:id/rsvps'
- 'POST /api/events/:id/rsvps'
- 'DELETE /api/events/:id/rsvps'
