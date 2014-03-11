db.users.remove();
db.allocations.remove();
db.contributions.remove();
db.sessions.remove();
db.counters.remove();
db.counters.insert({_id: "userid", seq: 2});

db.users.insert([{
	"userName" : "admin",
	"firstName" : "Node Goat",
	"lastName" : "Admin ",
	"password" : "$2a$10$8Zo/1e8KM8QzqOKqbDlYlONBOzukWXrM.IiyzqHRYDXqwB3gzDsba",
	"userId" : 1
},
{
	"userName" : "user1",
	"firstName" : "John",
	"lastName" : "Doe",
	"password" : "$2a$10$RNFhiNmt2TTpVO9cqZElb.LQM9e1mzDoggEHufLjAnAKImc6FNE86",
	"userId" : 2
},
{
	"userName" : "user2",
	"firstName" : "Will",
	"lastName" : "Smith",
	"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq",
	"userId" : 3
}]);

db.allocations.insert([{
	{ "userId" : 2, "stocks" : 40, "funds" : 9, "bonds" : 51 },
	{ "userId" : 3, "stocks" : 22, "funds" : 12, "bonds" : 66 },
	{ "userId" : 1, "stocks" : 23, "funds" : 22, "bonds" : 55 }
]);