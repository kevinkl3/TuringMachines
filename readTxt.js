var Q="", T="", E="", S="";
var q0="",qA="",qR="",contentStr="";
$(document).ready(function() {
            $("#palindromo").click(function() {
            	//$("#txtPal").attr("src","palindromo.txt");
            	$(loadJS("pal","palindromo.txt"))
            	setTimeout(function(){
            	$("#TD:hidden").slideToggle();
            	contentStr=content;
            	ChargeInput();},100);
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
});

