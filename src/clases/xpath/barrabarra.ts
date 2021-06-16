import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import informacion from "./informacion";

export default class barrabarra implements Instruccion{

    public exprecion:informacion;
    public sig;

    constructor(exprecion:informacion,sig){
        this.exprecion=exprecion;
        this.sig=sig;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        if(this.exprecion.exprecion!=null){
            this.isxprecion(controlador,ts);
        }else{
            if(this.sig!=null){
                this.siguiente(controlador,ts);
            }else{
                this.obtenerall(controlador,ts);
            }
        }
    }
    
    obtenerall(controlador: Controlador, ts: TablaSimbolos) {
        if(ts!=null){
            for( let informacion of ts.tabla){
                if(this.exprecion.id == "*"){
                    if(informacion.sim.objeto != undefined){
                        controlador.append(informacion.sim.objeto.gethtml(""));
                    }
                }else{
                    if(informacion.identificador==this.exprecion.id){
                        controlador.append(informacion.sim.objeto.gethtml(""));
                    }
                }
                
            }
            for (let tssig of ts.sig ){
                this.obtenerall(controlador,tssig.sig);
            } 
        }
    }
    
    siguiente(controlador: Controlador, ts: TablaSimbolos) {
        if(ts!=null){
            for (let tssig of ts.sig ){
                if(this.exprecion.id==tssig.identificador){
                    console.log(this.exprecion.id);
                    this.sig.ejecutar(controlador,tssig.sig);
                }else{
                    this.siguiente(controlador,tssig.sig);
                }
            } 
        }
    }

    isxprecion(controlador: Controlador, ts: TablaSimbolos){
        controlador.idlast=this.exprecion.id;
        let valor=this.exprecion.exprecion.getValor(controlador,ts);
        if(typeof valor =='number'){
            this.isNumero(controlador,ts,valor);
        }
    }

    isNumero(controlador: Controlador, ts: TablaSimbolos,valor) {
        if(this.sig!=null){
            this.siguienteNumero(controlador,ts,valor);
        }else{
            this.obtenerallNumero(controlador,ts,valor);
        }
    }

    siguienteNumero(controlador: Controlador, ts: TablaSimbolos,valor) {
        let cont=1;
        if(ts!=null){
            for (let tssig of ts.sig ){
                    if(this.exprecion.id==tssig.identificador){
                        valor=this.exprecion.exprecion.getValor(controlador,ts);
                        if(cont==valor){
                            this.sig.ejecutar(controlador,tssig.sig);
                        }
                        cont++;
                    }else{
                        this.siguienteNumero(controlador,tssig.sig,valor);
                    }
            } 
        }
    }

    obtenerallNumero(controlador: Controlador, ts: TablaSimbolos,valor) {
        let cont=1;
        if(ts!=null){
            for( let informacion of ts.tabla){
                if(informacion.identificador==this.exprecion.id){
                    valor=this.exprecion.exprecion.getValor(controlador,ts);
                    if(cont==valor){
                        controlador.append(informacion.sim.objeto.gethtml(""));   
                    }
                    cont++;
                }
            }
            for (let tssig of ts.sig ){
                    this.obtenerallNumero(controlador,tssig.sig,valor);
            } 
        }
    }


    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}