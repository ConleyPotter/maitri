function priceify(num) {
	if(num < 1000) {
		return num.toString();
	} else if (1000 < num && num < 1000000) {
		num = num.toString();
		return num.substring(0,num.length-3) + "," + num.substring(num.length-3,num.length);
	} else {
		num = num.toString();
		return num.substring(0,num.length-6) + "," + num.substring(num.length-6,num.length-3) + "," 
			+ num.substring(num.length-3,num.length);
	}
}

console.log(priceify(400000000));