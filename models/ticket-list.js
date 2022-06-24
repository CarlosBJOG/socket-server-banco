
const dataTime = require('./data/dataTime');
const Ticket = require('./ticket');


class TicketList {

    constructor() {
        this.ultimoNumero = 0;

        this.pendientes = [];
        this.asignados  = [];

        this.time = [];
    }

    get siguienteNumero() {
        this.ultimoNumero ++;
        return this.ultimoNumero;
    }

    //retornar ultimos 3 tickets en tarjetas y 10 historial
    get ultimos13(){
        return this.asignados.slice(0, 13);
    }

    crearTicket(){
        const nuevoTicket = new Ticket( this.siguienteNumero );
        this.pendientes.push( nuevoTicket );

        return nuevoTicket;
    }

    asignarTicket( agente, escritorio ){

        if( this.pendientes.length === 0 ){
            return null;
        }

        const siguienteTicket = this.pendientes.shift();
        const numero = random(1, 32);
        const val = dataTime.find( v => v.no === numero);

        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;
        siguienteTicket.time = val.time

        this.asignados.unshift( siguienteTicket );

        return siguienteTicket;
    }


}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

module.exports = TicketList;
