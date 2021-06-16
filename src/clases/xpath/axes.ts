import Nodo from "../AST/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import informacion from "./informacion";

export default class axes implements Instruccion{

    public tipo:string;
    public exprecion:informacion;
    public sig;

    constructor(tipo:string,exprecion:informacion,sig){
        this.tipo=tipo;
        this.exprecion=exprecion;
        this.sig=sig;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        if(this.tipo=="child"){
            this.child(controlador,ts);
        }else{
            if(this.tipo==""){

            }
        }
    }


    child(controlador: Controlador, ts: TablaSimbolos){
        if(this.exprecion.exprecion!=null){
            this.isxprecion(controlador,ts);
       }else{
            if(this.sig!=null){
                for( let tssig of ts.sig){
                    if(this.exprecion.id==tssig.identificador){
                        this.sig.ejecutar(controlador,tssig.sig);
                    }
                }
            }else{
                for( let informacion of ts.tabla){
                    if(informacion.identificador==this.exprecion.id){
                        controlador.append(informacion.sim.objeto.gethtml(""));
                    }
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

    isNumero(controlador: Controlador, ts: TablaSimbolos,posicion:number){
        let cont=1;
        if(this.sig!=null){
            for( let tssig of ts.sig){
                if(this.exprecion.id==tssig.identificador){
                    if(cont==posicion){
                        this.sig.ejecutar(controlador,tssig.sig);
                    }
                    cont++;
                }
            }
       }else{
           for( let informacion of ts.tabla){
                if(informacion.identificador==this.exprecion.id){
                    if(cont==posicion){
                        controlador.append(informacion.sim.objeto.gethtml(""));
                    }
                    cont++;
               }
           }
       }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

} 
