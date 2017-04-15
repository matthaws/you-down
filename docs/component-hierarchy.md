## Component Hierarchy
**App**
- TopNavBar
  + LogIn/SignUpButtons
  + LoggedInBar(with drop-down menu)
- Footer

**WelcomeContainer**
- Welcome/"Landing Page"
  + VideoBar
  + SuggestionButtons
  + CategoryListButtons

**AuthFormContainer**
- AuthForm (modal, appears "on top" of greyed out Welcome page)

**HomeContainer**
- Home
  + SearchBar
  + UpcomingEvents

**ProfileContainer**
- Profile

**GroupContainer**
- Group
  + GroupSidebar
  + GroupMain
  + Members

**EventContainer**
- Event
  + EventSidebar
  + EventMain
  + WhosGoing

**NewEventFormContainer**
- NewEventForm

**NewGroupFormContainer**
- NewGroup

**SearchContainer**
- Search
  + SearchBar
  + SearchResults


## Routes
|Path              | Component                        |
|------------------|----------------------------------|
|"/welcome"        | "WelcomeContainer"               |
|"/welcome/signup" | "AuthFormContainer"              |
|"/welcome/login"  | "AuthFormContainer"              |
|"/home"           | "HomeContainer"                  |
|"/member/:id"     | "ProfileContainer"               |
|"/group/:id"      | "GroupContainer"                 |
|"/event/:id"      | "EventContainer"                 |
|"/newevent"       | "NewEventFormContainer"          |
|"/newgroup"       | "NewGroupFormContainer"          |
|"/search"         | "SearchContainer"
