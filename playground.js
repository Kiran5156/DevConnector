const user = {
  name: "kiran",
  age: "24",
  location: "Kochi",
  status: "developer",
};
const { name: firstname, location, ...rest } = user;
console.log(firstname, location, rest);
