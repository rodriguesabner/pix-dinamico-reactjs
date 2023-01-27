import {useEffect, useState} from 'react'
import {QrCodePix} from "qrcode-pix";
import './App.css'

function App(): JSX.Element {
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

    return (
        <div className="App">
            <div style={{
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
            }}>
                <h1
                    style={{
                        fontSize: '24px',
                        marginBottom: '5px'
                    }}
                >
                    Pague o que deve com PIX
                </h1>
                <small
                    style={{
                        lineHeight: '1',
                        marginBottom: '5px'
                    }}
                >
                    Sr. Caloteiro, para você pagar o que deve, basta escanear o QR Code abaixo ou copiar o código e
                    enviar para o meu PIX.
                </small>
            </div>

            <div
                style={{marginTop: 20}}
            >
                <img src={qrCode} alt={'QR Code PIX'}/>
                <p
                    style={{
                        maxWidth: '480px',
                        margin: '0 auto',
                        whiteSpace: 'nowrap',
                        overflow: 'auto'
                    }}
                >
                    {rawPix}
                </p>
            </div>
        </div>
    )
}

export default App
