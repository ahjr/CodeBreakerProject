let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' || attempt.value === '') {
    	setHiddenFields();
    }
    if(validateInput(input.value)) {
    	attempt.value++;
    } else {
    	return false;
    }

    if(getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else if (attempt.value >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    } else {
    	setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields () {
	answer.value = Math.floor(Math.random() * 1000);
	answer.value = answer.value.toString();
	while(answer.value.length < 4) {
		answer.value = '0' + answer.value;
	}
	attempt.value = 0;
}

function setMessage(msg) {
	document.getElementById('message').innerHTML = msg;
}

function validateInput(res) {
	if(res.length === 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	correct = 0;
	resultDiv = '<div class="row"><span class="col-md-6">' + input + '</span><span class="col-md-6">';
	for (var i = 0; i < input.length; i++) {
		if (input.charAt(i) == answer.value.charAt(i)) {
			correct++;
			resultDiv += '<span class="glyphicon glyphicon-ok"></span>';
		} else if (answer.value.indexOf(input.charAt(i)) >= 0) {
			resultDiv += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			resultDiv += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	resultDiv += '</span></div>';
	document.getElementById('results').innerHTML += resultDiv;

	if(correct == 4) {
		return true;
	} else {
		return false;
	}

}

function showAnswer(won) {
	let code = document.getElementById("code");
	code.innerHTML = answer.value;
	if(won) {
		code.className = code.className + " success";
	} else {
		code.className = code.className + " failure";
	}
}

function showReplay() {
	document.getElementById("guessing-div").style.display = "none";
	document.getElementById("replay-div").style.display = "block";
}