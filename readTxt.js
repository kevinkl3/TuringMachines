

	var Q="", T="", E="", S="";
	var q0="",qA="",qR="",contentStr="";
	var tupla={};
            $("#Eww").click(function() {
            	//$("#txtPal").attr("src","ww.txt");
            	$(loadJS("ww","ww.txt"));

            	setTimeout(function(){
            	//$("#modoGUI:hidden").slideToggle();
            	tupla=readFromEditor(contentEditor);
            	addAllTrans(tupla["Transiciones:"]);
            	$('#inputEstados').change();
            	$('#inputCintaAlphabet').change();
            	//ChargeInput();
            	$("#editor").val(contentEditor);},100);
       });
            $("#02").click(function(){
            	$(loadJS("pow02","pow02.txt"));
            	setTimeout(function(){
            	//$("#modoGUI:hidden").slideToggle();
            	tupla=readFromEditor(pow02);
            	addAllTrans(tupla["Transiciones:"]);
            	$('#inputEstados').change();
            	$('#inputCintaAlphabet').change();
            	//ChargeInput();
            	$("#editor").val(pow02);},100);


            });

    
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
		s=s.replace(/\(/g,"");
		s=s.replace(/\)/g,"");
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
		$("#inputEstados").val(tupla['Estados:']);
		$("#inputCintaAlphabet").val(tupla["Cinta:"]);
		$("#inputAlphabet").val(tupla['Alfabeto:']);
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
		transO = $("#listaTransiciones");
		transO.empty();
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

			ts = "("+from[0]+"," + from[1]+")->("+to[0]+","+to[1]+","+(to[2])+")";
			var opt=new Option(ts,from[0]+','+from[1]);
			transO.append(opt);
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


