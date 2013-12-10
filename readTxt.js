

	var Q="", T="", E="", S="";
	var q0="",qA="",qR="",contentStr="";
	var tupla={};
            $("#palindromo").click(function() {
            	//$("#txtPal").attr("src","palindromo.txt");
            	$(loadJS("pal","palindromo.txt"))
            	$(loadJS("ww","ww.txt"));
            	setTimeout(function(){
            	//$("#modoGUI:hidden").slideToggle();
            	contentStr=content;
            	tupla=readFromEditor(contentEditor);
            	ChargeInput();
            	$("#editor").val(contentEditor);},100);
       });

    function ChargeInput () {
            	var j=contentStr.indexOf("\n");
            	var inputs=$("#inputEstados");
            	Q=contentStr.substr(0,j);            	
            	inputs.val(Q.substr(3,Q.lenght));
            	inputs.change();
            	contentStr=contentStr.replace(Q+"\n","");

            	j=contentStr.indexOf("\n");
            	inputs=$("#inputCintaAlphabet");
            	T=contentStr.substr(0,j);
            	inputs.val(T.substr(3,T.lenght));
            	inputs.change();
            	contentStr=contentStr.replace(T+"\n","");

            	j=contentStr.indexOf("\n");
            	inputs=$("#inputAlphabet");
            	E=contentStr.substr(0,j);
            	inputs.val(E.substr(3,E.lenght));
            	inputs.change();
            	contentStr=contentStr.replace(E+"\n","");
            	agregarTransicions();
            }

    function agregarTransicions(){
		transO = $("#listaTransiciones");
		transO.empty();
		j=contentStr.indexOf("\n");
		S=contentStr.substr(0,j);
		S=S.replace("S: ","");
		S=S.replace(/\(/g,"");
		S=S.replace(/\)/g,"");
		S=S.split(", ");
		for (var i = 0; i < S.length; i++) {
			var split=S[i].split("-");
			var from=split[0].split(",");
			var to=split[1].split(",");
		    q1 = from[0]
			q2 = to[0]
			inp = from[1];
			out = to[1]
			dir = to[2];

			trans = new Transition(q2,out,dir);
			transicionesFunction.addTransition(q1,inp,trans);

			ts = "("+q1+"," + inp+")->("+q2+","+out+","+(dir == 1 ? 'R' : 'L')+")";
			var opt=new Option(ts,q1+','+inp);
			transO.append(opt);
			
		};		
	}
	function loadJS(id, src) {
	    if (document.getElementById(id) != null){ return;}
		    var js = document.createElement('script');
		    js.id = id; js.async = false; js.src = src;

		    document.getElementsByTagName('head')[0].appendChild(js);
	}
	
	function readFromEditor(string){
		var s=string.replace(/\n/g,"");
		s=s.replace(/ /g,"");
		s=s.replace(/->/g,"");
		var reservedWords=["Estados:","Cinta:","Alfabeto:","Transiciones:","q0:","qA:","qR:"];

		for (var i = 0; i < reservedWords.length; i++) {
			s=s.replace(reservedWords[i],"\n"+reservedWords[i]);
		};
		s=s.trim();
		s+="\n";
		//guarda cada string en la tupla
		for (var i = 0; i < reservedWords.length; i++) {
			var tmp=s.substr(s.indexOf(reservedWords[i]),s.length);
			tmp=tmp.replace(reservedWords[i],"");
			tupla[reservedWords[i]]=tmp.substr(0,tmp.indexOf("\n"));
		};
		//separar estados, cinta y alfabeto
		for (var i = 0; i < reservedWords.length-4; i++) {
			tupla[reservedWords[i]]=div(tupla[reservedWords[i]]);
		};
		//separar transiciones
		for (var i = 0; i < tupla["Estados:"].length; i++) {
			tupla["Transiciones:"]=tupla["Transiciones:"].replace(new RegExp(tupla["Estados:"][i],'g'),
				"\n"+tupla["Estados:"][i]);
		};

		tupla["Transiciones:"]=tupla["Transiciones:"].trim();
		return tupla;
	}

	function addAllTrans(stringTransitions){
		arrayTransitions=stringTransitions.split("\n");
		if(arrayTransitions.length%2!=0){
			console.log("Error al agregar transiciones");
			return -1;
		}
		for (var i = 0; i < arrayTransitions.length; i+=2) {
			from=arrayTransitions[i].split(",");
			to=arrayTransitions[i+1].split(",");
			trans = new Transition(to[0],to[1],to[2]);
			transicionesFunction.addTransition(from[0],from[1],trans);
		};
		
	}

	function createTM(){
		
		addAllTrans(tupla["Transiciones:"]);
		turingMachine = new TuringMachine(tupla["Estados:"],tupla["Cinta:"],tupla["Alfabeto:"],
			transicionesFunction,tupla["q0:"],tupla["qA:"],tupla["qR:"]);
	}       

	function div(s){
		var A=s.split(",");
		return A;
	}


