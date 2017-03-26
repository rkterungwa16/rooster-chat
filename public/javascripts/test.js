var mine = {
	type: 'serverMessage',
	message: 'Welcome to the best chat room on earth'
}
var yours = JSON.stringify(mine);

console.log(yours);
console.log(JSON.parse(yours));