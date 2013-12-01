/* Turing Machines Computation Simulator
|	kevilopez@unitec.edu
/*
var MoveDirection = {
	"Left" : 0,
	"Right" : 1
};

function State(Name){
	this.name = Name;
}

function Alphabet(sims){
	this.simbols = sims;
	this.has = function(x){
		return $.inArray(x, this.simbols) == -1 ? false : true;
	}
}

function Transition(q1,q2,i,o,d){
	this.originState = q1;
	this.destinationState = q2;
	this.input = i;
	this.output = o;
	this.moveDirection = d;
}

function Transition(q2,o,d){
	this.destinationState = q2;
	this.output = o;
	this.moveDirection = d;
}

function TransitionFunction(){
	this.transiciones = {};
	this.addTransition = function(q,i,trans){
		n = this.transiciones.lenth
		key = q + ',' + i;
		this.transiciones[key] = trans;
	}
	this.get = function(key){
		return this.transiciones[key];
	}
}

function Tape(str){
	this.str = str;
	this.values = [];
	for(i = 0; i < str.length; i++){
		this.values[i] = str.charAt(i);
	}
	this.read = function(x){
		return this.values[x];
	}
	this.write = function(x,v){
		this.values[x] = v;
	}
}

//TuringMachine Object Definition
// 7-tupla
function TuringMachine(Q,E,T,d,q0,qa,qr){
	this.states = Q;
	this.alphabet = E;
	this.tapeAlphabet = T;
	this.transitionFunction = d;
	this.initialState = q0;
	this.acceptState = qa;
	this.rejectState = qr;
	this.head = 0;
	this.currentState = q0;
	this.computeTape = function(tape){
		console.log("Trying to Compute Tape: " + tape.str);
		while(this.currentState != this.acceptState && this.currentState != this.rejectState){
			input = tape.read(this.head);
			transitionKey = this.currentState + ',' + input;
			transition = this.transitionFunction.get(transitionKey);
			console.log("currentState: " + this.currentState + " | input: " + input);
			if(transition !== undefined){
				this.currentState = transition.destinationState;
				console.log("Going to State: " + this.currentState);
				tape.write(this.head,transition.output);
				console.log("Wrote: " + transition.output);
				if(transition.moveDirection == 1){
					this.head++;
					console.log("Moved head to : Right");
				}else{
					this.head--;
					console.log("Moved head to : Left");
				}
			}else{
				console.log("No Transition defined for: " + transitionKey);
				alert('Not accepted');
				break;
			}
		}
		if(this.currentState == this.acceptState){
			alert('Acepted');
		}else{
			alert('Rejected');
		}
	}
	this.computeString = function(str){
		tape = new Tape(str);
		this.computeTape(tape);
	}
}