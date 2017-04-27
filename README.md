# YouDown?

[live site]([heroku]
[heroku]: http://you-down.herokuapp.com/#/welcome

Inspired by Meetup, YouDown? is a full-stack web application for forming groups with shared interests and planning events and activities. It uses Ruby on Rails with a PostgreSQL database on the backend, with React.js in a Redux framework on the frontend. Integration with AWS via the handy Paperclip gem allows for user upload of images for both their personal profile and their groups.


## Features & Implementation
### Group Show Component

The show page for an individual group allows you to see group stats, look at past and upcoming events, browse members, make new events, and edit and update the group (if you are the group organizer). All of this functionality is rendered within one master component, GroupShow, which internally renders the various sub-screens when the menu is toggled. This is handled by storing a "location" variable in GroupShow's state that can be updated as the user selects pages from the navigation menu. It is responsible for holding onto the details for the currently viewed group and passing them to the subcomponents as necessary.


### Search Feature

The search page allows the user to search both groups and events. Search was implemented with the pg_search gem attached to the Group and Event model on the backend, referencing the title and description columns of each. The master search component on the frontend takes in the user's search parameters and fetches the results for both groups and events at the same time. This allows the user to switch back and forth between the group and event results for their search without sending another query to the database.

## Future Directions for the Project

There are many more fun and useful features I plan to incorporate into this project in the future, including:

### Group Discussion Boards
A helpful way of staying in touch with your group and brainstorming ideas for future events, group discussion boards will only be viewable by group members and will be able to have multiple conversations or threads. Events will also allow for comments by group members, which will appear beneath the event details.

### Permissions and Notifications
Groups will have the option to be "invite-only", with users sending requests for membership subject to approval by the organizer rather than signing up directly. Groups will be able to have more than one organizer. In addition, members will have a "notifications" panel to let them know about updates in their groups, new events, or event changes.

### Location-based filtering
Using the collected addresses in the database, search results will be able to be filtered and/or sorted by distance to the user.
