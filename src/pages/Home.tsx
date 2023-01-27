import React, {useEffect, useState} from 'react';
import {QrCodePix} from "qrcode-pix";

const Home = (): JSX.Element => {
    const [qrCode, setQrCode] = useState<string>('');
    const [rawPix, setRawPix] = useState<string>('');

    useEffect(() => {
        async function generateDynamicPix() {
            /*
                version: '01' //versão do pix (não altere)
                key: chave pix
                name: seu nome/empresa
                city: sua cidade
                transactionId: é o identificador que aparecerá no momento do pix (max: 25 caracteres)
                message: mensagem que aparecerá no momento do pix (opcional)
                value: valor que você quer cobrar (opcional)
            */
            const qrCodePix = QrCodePix({
                version: '01',
                key: 'a23b8801-3c9c-4a1a-8a03-a75dc62d8365',
                name: 'Abner Rodrigues',
                city: 'São Paulo',
                transactionId: 'rodriguesabner_',
                message: 'Recebidos da semana??? 😂',
                value: 1500.00,
            })

            const rawPixStr = qrCodePix.payload()
            const qrCodeBase64 = await qrCodePix.base64()

            setRawPix(rawPixStr)
            setQrCode(qrCodeBase64)
        }

        void generateDynamicPix();
    }, [])

    const copyCodeClipboard = (): void => {
        void navigator.clipboard.writeText(rawPix)
        alert('Código copiado com sucesso!')
    }

    return (
        <div>
            <div className={'home__wrapper'}>
                <h1>
                    Pague o que deve com PIX
                </h1>
                <small>
                    Sr. Caloteiro, para você pagar o que deve, basta escanear o QR Code abaixo ou copiar o código e
                    enviar para o meu PIX.
                </small>
            </div>

            <div className={'home__qrcode_wrapper'} >
                <img src={qrCode} alt={'QR Code PIX'}/>
                <p>
                    {rawPix}
                </p>

                <button onClick={() => copyCodeClipboard()}>
                    Copiar código
                </button>
            </div>
        </div>
    )
};

export default Home;
