conn = new Mongo();

db = conn.getDB("nodegoat");

//remove existing data
db.users.remove({});
db.allocations.remove({});
db.contributions.remove({});
db.counters.remove({});

//reset unique id counter
db.counters.insert({_id: "userid", seq: 3});

//insert admin and test users
db.users.insert([{
	"userName" : "admin",
	"firstName" : "Node Goat",
	"lastName" : "Admin ",
    "password": "Admin_123",
	//"password" : "$2a$10$8Zo/1e8KM8QzqOKqbDlYlONBOzukWXrM.IiyzqHRYDXqwB3gzDsba", // Admin_123
	"userId" : 1,
    "isAdmin": true
},
{
	"userName" : "user1",
	"firstName" : "John",
	"lastName" : "Doe",
    "benefitStartDate": "2030-01-10",
    "password": "User1_123",
	// "password" : "$2a$10$RNFhiNmt2TTpVO9cqZElb.LQM9e1mzDoggEHufLjAnAKImc6FNE86",// User1_123
	"userId" : 2
},
{
	"userName" : "user2",
	"firstName" : "Will",
	"lastName" : "Smith",
    "benefitStartDate": "2025-11-30",
    "password" : "User2_123",
	//"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
	"userId" : 3
}]);

// Add seed allocations
db.allocations.insert([
    { "userId" : 2, "stocks" : 40, "funds" : 9, "bonds" : 51 },
    { "userId" : 3, "stocks" : 22, "funds" : 12, "bonds" : 66 },
    { "userId" : 1, "stocks" : 23, "funds" : 22, "bonds" : 55 }
]);
