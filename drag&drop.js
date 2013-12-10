var kintcsEstados=[],redo=[];
var width=660, height=400,cont=0;
var stage = new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height,      
      });
     
      var posX = 40;
      var posY = 40;
    

      $("#btnEstado").click(function(){
         var layer = new Kinetic.Layer();
          kintcsEstados.push(new Kinetic.Group({
              x: posX,
              y: posY,
              draggable: true,
              id:"gp"+0,
            }));
          var text = new Kinetic.Text({
            x:posX/1.0999,
            y:posY/1.4,
            fontSize: 26,
            fontFamily: 'Calibri',
            text: cont,
            fill: 'black',
            id:"mt"+cont,
            //padding: "0,0,80,89"
          });
          var circle=new Kinetic.Circle({
            x: posX,
            y: posY,
            radius: 30,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            });
          // add cursor styling
          kintcsEstados[kintcsEstados.length-1].add(circle);
          kintcsEstados[kintcsEstados.length-1].add(text);
          kintcsEstados[kintcsEstados.length-1].on('mouseover', function() {
            document.body.style.cursor = 'pointer';
          });
          kintcsEstados[kintcsEstados.length-1].on('mouseout', function() {
            document.body.style.cursor = 'default';
          });
          layer.add(kintcsEstados[kintcsEstados.length-1]);
          stage.add(layer);
          relative();
          cont++;
        });

      $("#btnTrans").click(function(){
        var layer = new Kinetic.Layer();

        var redLine = new Kinetic.Spline({
          points: [{x:70, y:140}, {x:140, y:130},{x:210,y:140}],
          stroke: 'black',
          strokeWidth: 5,
          lineCap: 'round',
          draggable: true
        });
        redLine.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
        });
        redLine.on('mouseout', function() {
          document.body.style.cursor = 'default';
        });
        layer.add(redLine);
        stage.add(layer);
      });

      $("#btnUndo").click(function(){
        var length=stage.getLayers().length;
          if(length!=0){
            redo.push(stage.getLayers()[length-1].remove());
          }
          cont--;
          posX-=15;
          posY-=15;
      });

      function relative(){
        if(posX<width-30 && posY<height-30){
          posX+=15;
          posY+=15;
        }else{
          posX=40;
          posY=40;
        }
      }