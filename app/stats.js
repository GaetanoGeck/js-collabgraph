function standardDeviationRater(fixedValues) {
	const m = mean(fixedValues);
	const v = variance(fixedValues, m);
	const sd = Math.sqrt(v);

	return function(x) {
		if (x < m - sd) {
			return 1;
		}
		else if (x < m + sd) {
			return 2;
		}
		else {
			return 3;
		}
	}
}

function mean(values) {
	return sum(values) / values.length;
}

function variance(values, mean) {
	return sum(values.map(x => square(x - mean))) / values.length;
}

function square(x) {
	return x * x;
}

function sum(values) {
	return values.reduce((a,b) => a+b);
}
