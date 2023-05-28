const initialBound = [
	100.0, 95.0, 90.0, 85.0, 80.0, 75.0, 70.0, 65.0, 60.0, 55.0, 50.0, 0.0,
];
const displayArr = [
	"A+",
	"A",
	"A-",
	"B+",
	"B",
	"B-",
	"C+",
	"C",
	"C-",
	"D",
	"F",
];
var grades = [];

const Enterbtn = document.getElementById("newgrade");
Enterbtn.addEventListener("keypress", (event) => {
	const newGrade = document.getElementById("newgrade").value;

	if (event.key == "Enter") {
		if (newGrade < 0 || newGrade > 100.0) {
			// Check if is invalid
			window.alert("Please input invalid Number");
			return;
		} else {
			grades.push(Number(newGrade));
			displayHistogram(newGrade);
		}
	}
});

const checkBound = (element, index) => {
	var value = element.value;
	const allInputBound = document.querySelectorAll("#formBound div input");
	if (index == 0) {
		if (value > 100.0) {
			window.alert("Value cannot be higher than 100");
			element.value = initialBound[index];
			value = element.value;
		}
		if (allInputBound[index + 1].value >= Number(value)) {
			alert("Cannot be the same or lower than the value below");
			element.value = initialBound[index];
			value = element.value;
		} else {
			initialBound[index] = value;
			updateHistogram();
		}
	} else if (index == 11) {
		// 50 <= 0
		if (value < 0.0) {
			alert("Value cannot be negative");
			element.value = initialBound[index];
			value = element.value;
		} else if (allInputBound[index - 1].value <= Number(value)) {
			alert("Cannot be the same or higher than as the valu above");
			element.value = initialBound[index];
			value = element.value;
		} else {
			initialBound[index] = value;
			updateHistogram();
		}
	} else {
		if (
			allInputBound[index + 1].value >= Number(value) ||
			allInputBound[index - 1].value <= Number(value)
		) {
			alert(
				"Value cannot be higher than the value above or lower than the value below"
			);
			element.value = initialBound[index];
			value = element.value;
		} else {
			initialBound[index] = value;
			updateHistogram();
		}
	}
};

const updateHistogram = () => {
	const addDisplay = document.querySelectorAll(".histogramDiv div span");
	for (let i = 0; i < 11; i++) {
		addDisplay[i].innerHTML = "";
	}
	for (let i = 0; i < grades.length; i++) {
		displayHistogram(grades[i]);
	}
};

const displayHistogram = (num) => {
	for (let i = 0; i < 12; i++) {
		if (num < initialBound[i - 1] && num >= initialBound[i]) {
			document.getElementsByClassName(displayArr[i - 1])[0].innerHTML += "O";
		}
	}
};
