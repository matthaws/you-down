# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.destroy_all
Membership.delete_all

guest = User.new("full_name": "Russell T.", "location_zip": 11206, "email": "Guest@Guest.com", "password": "GUESTGUEST")
user1 = User.new("full_name": "Cheryl", "location_zip": 10027, "email": "puppies@puppies.com", "password": "ILOVEDOGS")

20.times do |x|
  seed_data = User.new
  seed_data.full_name = Faker::Name.first_name
  seed_data.location_zip = 10001
  seed_data.email = "#{x}test@test.com"
  seed_data.password = "TESTTEST"
  seed_data.location_name = Faker::Address.city
  seed_data.save
end

guest.save

Group.destroy_all

test_group = Group.new("group_name": "Brooklyn Pancake Lovers", "location_name": "Williamsburg, Brooklyn")
test_group.location_zip = 11206
test_group.description = "We are a group of pancake-obsessed Brooklynites who scour the borough looking for the best p-cakes around!"
test_group.organizer_id = guest.id
test_group.member_moniker = "pancakephiles"
test_group.save


Membership.destroy_all

a = Membership.new
a.member_id = guest.id
a.group_id = test_group.id
a.save

corgis = Group.new("group_name": "Cute Corgi Lovers!", "location_name": "Upper East Side", "member_moniker": "corginis", "organizer_id": user1.id )
corgis.location_zip = 11206
corgis.description = "We love corgis and we don't care who knows it. Do you love Corgis? Do you LOVE CORGIS THE MOST? Come prove it!"
corgis.save

b = Membership.new
b.member_id = user1.id
b.group_id = corgis.id
b.save

Category.destroy_all
CategoryGrouping.destroy_all
outdoors = Category.create("title": "Outdoors & Adventure")
tech = Category.create("title": "Technology")
learning = Category.create("title": "Learning")
food = Category.create("title": "Food & Drink")
writing = Category.create("title": "Writing")
lgbt = Category.create("title": "LGBTQ")
book = Category.create("title": "Book Clubs")
pets = Category.create("title": "Pets")
hobbies = Category.create("title": "Hobbies & Crafts")
social = Category.create("title": "Social")
career = Category.create("title": "Career & Business")
games = Category.create("title": "Games")

cata = CategoryGrouping.new("category_id": pets.id, "group_id": corgis.id)
catb = CategoryGrouping.new("category_id": food.id, "group_id": test_group.id)

cata.save
catb.save
