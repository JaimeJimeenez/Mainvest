'use strict';
require('dotenv').config();
const router = require('express').Router();
const { spawn } = require('child_process');

router.get('/financial_assets/:asset/:start/:end', (request, response) => {
    const { asset, start, end } = request.params;

    const pythonProcess = spawn('python3', ['financial.py', asset, start, end]);

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        console.log('Datos financieros obtenidos:');
        console.log(result);

        // Envía la respuesta al cliente
        response.json(JSON.parse(result));
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error de Python: ${data}`);
        response.status(500).json({ error: 'Error en la obtención de datos financieros' });
    });

    pythonProcess.on('close', (code) => {
        console.log(`Proceso de Python cerrado con código de salida ${code}`);
    });
});

module.exports = router;
