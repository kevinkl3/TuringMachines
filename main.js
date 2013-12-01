/* -----------------------------------------------------\
| 		  Turing Machines Computation Simulator			|
|	Authors:  		 									|
|	Kevin Leonel Lopez 	- kevinlopez@unitec.edu			|
|	Oseas Andres Torrez - andrews_torres@hotmail.com 	|
\------------------------------------------------------*/

/*function dividir(){
	var s=$("#Q_estados").val();
	var Q=separar(s);
	s=$("#E_alfabeto").val();
	var E=separar(s);
	s=$("#T_cinta_alf").val();
	var T=separar(s);
	T.push(" ");
	//Agrega los elementos del alfabeto
	for (var i = 0; i<E.length; i++) {
		if(E[i]!=""){
			T.push(E[i]);
		}
	}	
	s=$("#S_transi").val();
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
	var Sq0=$("#q0_inicial").val();
  	var SqA=$("#qA_accept").val();
  	var SqR=$("#qR_reject").val();
	turingMachine = new TuringMachine(Q,E,T,transicionesFunction,Sq0,SqA,SqR);
}

function agregarTransicion(){
	transO = $("#S_transi");

	q1 = $("#qs").val();
	q2 = $("#qs1").val();
	inp = $("#S_alf").val();
	out = $("#talf").val();
	dir = $("#direccion").val();

	trans = new Transition(q2,out,dir);
	transicionesFunction.addTransition(q1,inp,trans);

	ts = "("+q1+"," + inp+")->("+q2+","+out+","+(dir == 1 ? 'R' : 'L')+")";
	transO.append(new Option(ts,nTrans));
	nTrans++;
}

$(document).ready(function(){
	transicionesFunction = new TransitionFunction();
	nTrans = 0;
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

$( "#Q_estados" ).change(function() {
  var Sq0=$("#q0_inicial");
  var SqA=$("#qA_accept");
  var SqR=$("#qR_reject");
  var qs=$("#qs");
  var qs1=$("#qs1");
  Sq0.empty();
  SqA.empty();
  SqR.empty();
  qs.empty();
  qs1.empty();
  var Q=separar($("#Q_estados").val());
  for (var i = 0; i<Q.length; i++) {
  	valor = ""+Q[i];
  	Sq0.append(new Option(valor,valor));
  	SqA.append(new Option(valor,valor));
  	SqR.append(new Option(valor,valor));
  	qs.append(new Option(valor,valor));
  	qs1.append(new Option(valor,valor));
  };
  SqA.val("1");
  SqR.val("2");
});

$("#E_alfabeto").change(function(){
	var S_alf=$('#S_alf');
	S_alf.empty();
	var S=separar($("#E_alfabeto").val());
	var T_cinta_alf=$("#talf");
	T_cinta_alf.empty();
	for (var i = 0; i<S.length; i++) {
		valor = ""+S[i];
		S_alf.append(new Option(valor,valor));
		T_cinta_alf.append(new Option(valor,valor));
	};

});

$("#T_cinta_alf").change(function() {
	var T_cinta_alf=$("#talf");
	var S_alf=$('#S_alf');
	S_alf.empty();
	T_cinta_alf.empty();
	var T=separar($("#T_cinta_alf").val());
	for (var i =0; i<T.length; i++) {
		T_cinta_alf.append(new Option(""+T[i],""+T[i]));
		S_alf.append(new Option(""+T[i],""+T[i]));
	};
	return;
	var S=separar($("#E_alfabeto").val());	
	for (var i = 0; i<S.length; i++) {
		T_cinta_alf.append(new Option(""+S[i],""+S[i]));
	};
});