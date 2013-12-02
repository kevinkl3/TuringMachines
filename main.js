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

	q1 = $("#T_from").val();
	q2 = $("#T_moveTo").val();
	inp = $("#T_with").val();
	out = $("#T_write").val();
	dir = $("#direccion").val();

	trans = new Transition(q2,out,dir);
	transicionesFunction.addTransition(q1,inp,trans);

	ts = "("+q1+"," + inp+")->("+q2+","+out+","+(dir == 1 ? 'R' : 'L')+")";
	var opt=new Option(ts,nTrans);
	transO.append(opt);
	nTrans++;
}

function quitarTransicion(){
	var value=$("#S_transi").val();
	if(value!=-1){
		$("#S_transi option[value='"+value+"']").remove();
	}
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
  var T_from=$("#T_from");
  var T_moveTo=$("#T_moveTo");
  Sq0.empty();
  SqA.empty();
  SqR.empty();
  T_from.empty();
  T_moveTo.empty();
  var Q=separar($("#Q_estados").val());
  for (var i = 0; i<Q.length; i++) {
  	valor = ""+Q[i];
  	Sq0.append(new Option(valor,valor));
  	SqA.append(new Option(valor,valor));
  	SqR.append(new Option(valor,valor));
  	T_from.append(new Option(valor,valor));
  	T_moveTo.append(new Option(valor,valor));
  };
  SqA.val("1");
  SqR.val("2");
});

$("#E_alfabeto").change(function(){
	Cinta();
});

function Cinta(){

	var T=$("#T_cinta_alf");
	var E=separar($("#E_alfabeto").val());
	for (var i =0; i < E.length; i++) {
		if(T.val().indexOf(","+E[i]+",")==-1 && T.val().indexOf(","+E[i])==-1 ){
			T.val(T.val()+","+E[i]);
		}
	};

	var T_cinta_alf=$("#T_write");
	var T_with=$('#T_with');
	T_with.empty();
	T_cinta_alf.empty();
	var T=separar($("#T_cinta_alf").val());

	for (var i =0; i<T.length; i++) {
		T_cinta_alf.append(new Option(""+T[i],""+T[i]));
		T_with.append(new Option(""+T[i],""+T[i]));
	};
}


$("#T_cinta_alf").change(function() {
	Cinta();
});