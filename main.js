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
	function validate(A,s){
		for (var i = 0; i <A.length; i++) {
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
  	Sq0.append(new Option(""+Q[i],i));
  	SqA.append(new Option(""+Q[i],i));
  	SqR.append(new Option(""+Q[i],i));
  	qs.append(new Option(""+Q[i],i));
  	qs1.append(new Option(""+Q[i],i));
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
		S_alf.append(new Option(""+S[i],i));
		T_cinta_alf.append(new Option(""+S[i],i));
	};

});
$("#T_cinta_alf").change(function() {
	var T_cinta_alf=$("#talf");
	T_cinta_alf.empty();
	var T=separar($("#T_cinta_alf").val());
	for (var i =0; i<T.length; i++) {
		T_cinta_alf.append(new Option(""+T[i],i));
	};

	var S=separar($("#E_alfabeto").val());	
	for (var i = 0; i<S.length; i++) {
		T_cinta_alf.append(new Option(""+S[i],i));
	};

});