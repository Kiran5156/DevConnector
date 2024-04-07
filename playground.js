const user = [
  {
    name: "kiran",
    age: "24",
    location: "Kochi",
    status: "developer",
  },
  {
    name: "rahul",
    age: "32",
    location: "TVM",
    status: "developer",
  },
];
// const { name: firstname, location, ...rest } = user;
// console.log(firstname, location, rest);
let newUser = user.filter((u) => u.name !== "kiran");
console.log(newUser);
