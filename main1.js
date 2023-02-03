// let arr = [4, 3, 10,{ content: "same", id: 1 }, 2, 1];
// console.log(arr)
// // filter:
// let arrWithout10 = arr.filter((item) => item !== 10);
// console.log("filter: no 10", arrWithout10);

// // map:
// let arrX2 = arr.map((item) => item * 2);
// console.log("map: X 2=", arrX2);

// // find:################
// let find10 = arr.find((item) => item === 10);
// console.log("find 10", find10);

// // change primitive doesnt work because only the value is changed:
// find10 = 99;
// // 10 didnt change
// console.log("try change primitiv", arr);

// change objects works because they copied by reference:
// let findContent = arr.find((item) =>  item.id === 1);
// findContent.content = "changed";
// console.log("try change object", arr);
