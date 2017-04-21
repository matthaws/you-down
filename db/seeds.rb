# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

guest = User.new("full_name": "Guesty McGuestFace", "location_zip": 11206, "email": "Guest@Guest.com", "password": "GUESTGUEST")

guest.save

Group.destroy_all

test_group = Group.new("group_name": "Brooklyn Pancake Lovers", "location_name": "Williamsburg, Brooklyn")
test_group.location_zip = 11206
test_group.description = "We are a group of pancake-obsessed Brooklynites who scour the borough looking for the best p-cakes around!"
test_group.organizer_id = guest.id
test_group.member_moniker = "pancakephiles"

test_group.save
