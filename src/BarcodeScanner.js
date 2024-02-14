import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
    const [barcode, setBarcode] = useState('No barcode detected');

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#barcode-scanner'), // Pass the ID of the div
                constraints: {
                    facingMode: "environment",
                },
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader",
                ],
            },
            locate: true,
        }, (err) => {
            if (err) {
                console.error(err);
                alert('Error starting QuaggaJS');
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            setBarcode(data.codeResult.code);
        });

        return () => {
            Quagga.offDetected();
            Quagga.stop();
        };
    }, []);

    return (
        <div id="barcode-scanner">
            <p>Scanned Barcode: {barcode}</p>
        </div>
    );
};

export default BarcodeScanner;
