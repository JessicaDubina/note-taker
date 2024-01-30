const generateId = () => Math.floor(Math.random() * 100000).toString(6);


console.log(generateId());
module.exports = generateId();