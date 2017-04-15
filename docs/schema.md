# Schema Information

## users
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
email             | string    | not null, indexed, unique
user_name         | string    | not null, indexed
password_digest   | string    | not null
session_token     | string    | not null, indexed, unique
location_name     | string    |
location_zip      | integer   | not null, indexed, 5-digits
bio               | text      |
profile_pic       | integer   | foreign key (references images), indexed

## groups
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
group_name        | string    | not null, indexed, unique
location_name     | string    | not null
location_zip      | integer   | not null, indexed, 5-digits
description       | text      | not null
organizer_id      | integer   | not null, foreign key (references users), indexed
member_moniker    | string    | can be null (defaults to "members")
group_pic         | integer   | foreign key (references images)

## memberships     
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
member_id         | integer   | not null, foreign key (references users), indexed
group_id          | integer   | not null, foreign key (references groups), indexed

## images
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
url               | string    | not null, indexed

## events
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
date              | datetime  | not null, indexed
name              | string    | not null
description       | text      | not null
location_name     | string    |
location_address  | string    | not null, indexed
location_zip      | integer   | integer, indexed, 5-digits

## rsvps
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
attendee_id       | integer   | not null, foreign key (references users), indexed
event_id          | integer   | not null, foreign key (references events), indexed

## categories
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
title             | string    | not null, indexed, unique
category_pic      | integer   | foreign key (references images), indexed

## category_groups
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
category_id       | integer   | not null, foreign key (references categories), indexed
group_id          | integer   | not null, foreign key (references groups), indexed
