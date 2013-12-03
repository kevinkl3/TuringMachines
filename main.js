/* -----------------------------------------------------\
| 		  Turing Machines Computation Simulator			|
|	Authors:  		 									|
|	Kevin Leonel Lopez 	- kevinlopez@unitec.edu			|
|	Oseas Andres Torrez - andrews_torres@hotmail.com 	|
\------------------------------------------------------*/

/*function dividir(){
	var s=$("#inputEstados").val();
	var Q=separar(s);
	s=$("#inputAlphabet").val();
	var E=separar(s);
	s=$("#inputCintaAlphabet").val();
	var T=separar(s);
	T.push(" ");
	//Agrega los elementos del alfabeto
	for (var i = 0; i<E.length; i++) {
		if(E[i]!=""){
			T.push(E[i]);
		}
	}	
	s=$("#listaTransiciones").val();
	var S=separar(s);

	s=$("#q0_inicial").val();
	var q0=s;

	s=$('#qA_accept').val();
	var qA=s;
	s=$('#qR_reject').val();
	var qR=s;
	console.log(Q);
	console.log(E);
	console.log(T);
	console.log(S);
	console.log(q0);
	console.log(qA);
	console.log(qR);

}*/

var transicionesFunction;
var nTrans;
var turingMachine;

function crearTuringMachine(){
	Q = [];E= []; T=[];
	$("#writeString").attr("style","background-color:white;");
	Q = separar($("#inputEstados").val());
	E = separar($("#inputAlphabet").val());
	T = separar($("#inputCintaAlphabet").val());
	var Sq0=$("#q0_inicial").val();
  	var SqA=$("#qA_accept").val();
  	var SqR=$("#qR_reject").val();
	turingMachine = new TuringMachine(Q,E,T,transicionesFunction,Sq0,SqA,SqR);
}

function agregarTransicion(){
	transO = $("#listaTransiciones");

	q1 = $("#T_from").val();
	q2 = $("#T_moveTo").val();
	inp = $("#T_with").val();
	out = $("#T_write").val();
	dir = $("#direccion").val();

	trans = new Transition(q2,out,dir);
	transicionesFunction.addTransition(q1,inp,trans);

	ts = "("+q1+"," + inp+")->("+q2+","+out+","+(dir == 1 ? 'R' : 'L')+")";
	var opt=new Option(ts,q1+','+inp);
	transO.append(opt);
}

function quitarTransicion(){
	var value=$("#listaTransiciones").val();
	if(value!=-1){
		$("#listaTransiciones option[value='"+value+"']").remove();
	}
	delete transicionesFunction.transiciones[value];
}

function compute () {
	console.log(turingMachine!=null);
	if(turingMachine!=null){
		var s=$("#writeString");
		turingMachine.computeString(s.val());
		if(turingMachine.currentState==turingMachine.acceptState){
			s.attr("style","background-color:lightgreen;");
		}else{
			s.attr("style","background-color:lightcoral;");
		}
	}
}



$(document).ready(function(){
	transicionesFunction = new TransitionFunction();
});

function validate(A,s){
	for (var i = 0; i < A.length; i++) {
		if(A[i]==s){
			return true;
		}
	}
	return false;
}

function separar(s){
	var s=s.replace(/ /g,"");
	var A=s.split(",");
	return A;
}

$( "#inputEstados" ).change(function() {
  var Sq0=$("#q0_inicial");
  var SqA=$("#qA_accept");
  var SqR=$("#qR_reject");
  var T_from=$("#T_from");
  var T_moveTo=$("#T_moveTo");
  Sq0.empty();
  SqA.empty();
  SqR.empty();
  T_from.empty();
  T_moveTo.empty();
  var Q=separar($("#inputEstados").val());
  for (var i = 0; i<Q.length; i++) {
  	valor = ""+Q[i];
  	Sq0.append(new Option(valor,valor));
  	SqA.append(new Option(valor,valor));
  	SqR.append(new Option(valor,valor));
  	T_from.append(new Option(valor,valor));
  	T_moveTo.append(new Option(valor,valor));
  };
  SqA.val(""+Q[1]);
  SqR.val(""+Q[2]);
});

$("#inputAlphabet").change(function(){
	Cinta();
});

function Cinta(){

	var T=$("#inputCintaAlphabet");
	var E=separar($("#inputAlphabet").val());
	if(E[0]!=""){
		for (var i =0; i < E.length; i++) {
			if(T.val().indexOf(","+E[i]+",")==-1 && T.val().indexOf(","+E[i])==-1 ){
				T.val(T.val()+","+E[i]);
			}
		};
	}
	var inputCintaAlphabet=$("#T_write");
	var T_with=$('#T_with');
	T_with.empty();
	inputCintaAlphabet.empty();
	var T=separar($("#inputCintaAlphabet").val());

	for (var i =0; i<T.length; i++) {
		valor = ""+T[i];
		inputCintaAlphabet.append(new Option(valor,valor));
		T_with.append(new Option(valor,valor));
	};
}


$("#inputCintaAlphabet").change(function() {
	Cinta();
});

$("#writeString").keyup(function() {
	$("#writeString").attr("style","background-color:white;");
})