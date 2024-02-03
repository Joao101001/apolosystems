const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8765');

class SensorPosicion {
    constructor() {
        this.activo;
    }

    async iniciarConexionModulos() {
        socket.on('open', () => {
            console.log('Conectado al servidor.');
        });
    }

    async sensorPosicion() {
        this.activo = !this.activo;
        socket.send(`Posicion:${this.activo ? ' Activo' : ' Inactivo'}`);
        console.log(`Posicion${this.activo ? ' Activo' : ' Inactivo'}`);
    }

    async sensorRFID() {
        socket.send(`Detectado:${this.activo ? ' Activo' : ' Inactivo'}`);
        console.log(`Detectado${this.activo ? ' Activo' : ' Inactivo'}`);
    }

    async sensorVelocidad() {
        const velocidad = Math.random() * (200 - 0) + 0;
        socket.send(`Velocidad: ${velocidad}`);
        console.log(`Velocidad ${velocidad} `);
    }

    async enviarMensajes() {
        setInterval(() => {
            this.sensorPosicion();
            this.sensorRFID();
            this.sensorVelocidad();
        }, 1000);
    }
}

const sensorPosicion = new SensorPosicion();

sensorPosicion.iniciarConexionModulos();
sensorPosicion.enviarMensajes();
