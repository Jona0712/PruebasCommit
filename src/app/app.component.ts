import { Component } from '@angular/core';
import Controlador from 'src/clases/Controlador';
import Evaluar from 'src/clases/Evaluar';
import { TablaSimbolos } from 'src/clases/TablaSimbolos/TablaSimbolos';
import * as Analizador from '../clases/Analizar'
import * as xpath from "../Analizadores/gramatica"
import * as xml from "../Analizadores/XML";
import {graphviz} from 'd3-graphviz';
import {wasmFolder} from '@hpcc-js/wasm'
import Nodo from 'src/clases/AST/Nodo';
import * as ReXML from '../Analizadores/XmlReporteGramatica';
import * as RexPath from '../Analizadores/xPathReporteGramatica';

import * as vis from "vis";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  entradaxpath : string  = "";
  consola : string = "";
  entradaxml:string="";
  htmlts: string ="";
  htmlerrores: string ="";
  reporteGramatical: string = "";
  xpathRG: string = "";


  recorrer(): void{
    let ana = new Analizador.Analizador();
    if(this.entradaxml != ""){
      console.log("Vamos a graficar");
      let nodo_ast: Nodo= ana.recorrer(this.entradaxml);
      let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
      console.log(grafo);
      
      const container = document.getElementById("app");
      var parsedData = vis.network.convertDot(grafo);

      var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
      };

      var options = parsedData.options;

      options.layout = {
        "hierarchical": true
      }

      options.nodes = {
        color: "cyan"
      };

      var network = new vis.Network(container, data, options);
    }
  }

  ejecutar():void {
    let ana =new Analizador.Analizador();
    this.consola="";

    if(this.entradaxml !=""){
      let ejecutar =ana.ejecutar(this.entradaxml,this.entradaxpath);
      this.consola=ejecutar.consola;
      this.htmlts=ejecutar.ts;
     /* this.htmlerrores = ejecutar.errores;*/
    }
  }

    
  imprimirTabla() {
    
    let ana =new Analizador.Analizador();
    if(this.entradaxml != ""){
      let ast = ReXML.parse(this.entradaxml);
      this.reporteGramatical = ast;
    }
  }

  openPage(pageName,valor) {
    
  }

}
