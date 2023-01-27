import React, {useEffect, useState} from 'react';
import {QrCodePix} from "qrcode-pix";

const DynamicPix = (): JSX.Element => {
    const [qrCode, setQrCode] = useState<string>('');
    const [rawPix, setRawPix] = useState<string>('');

    const [key, setKey] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(0);

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
                key,
                name,
                city,
                transactionId: identifier,
                message: message,
            })

            if (value > 0) Object.assign(qrCodePix, {value})

            const rawPixStr = qrCodePix.payload()
            const qrCodeBase64 = await qrCodePix.base64()

            setRawPix(rawPixStr)
            setQrCode(qrCodeBase64)
        }

        void generateDynamicPix();
    }, [key, name, city, identifier, message, value])

    const onChangeIdentifier = (value: string): void => {
        if (value.length <= 25) setIdentifier(value);
    }

    const onChangeValue = (value: string): void => {
        if (!value) setValue(0)

        const valueNumber = Number(value.replace(/[^0-9]/g, ''));
        if (valueNumber > 0) setValue(valueNumber);
    }

    return (
        <div>
            <div className={'home__wrapper'}>
                <h1>
                    Tenha seu próprio QRCode
                </h1>
                <small>
                    Informe seus dados para gerar seu PIX QRCode <br/><b>(não armazenamos nenhum dado)</b>
                </small>
            </div>

            <div className={'home__qrcode_wrapper'}>
                <img src={qrCode} alt={'QR Code PIX'}/>
                <p>
                    {rawPix}
                </p>
            </div>

            <form>
                <input placeholder={'Chave PIX'}
                       value={key}
                       onChange={(e) => setKey(e.target.value)}
                />
                <input placeholder={'Nome'}
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />
                <input placeholder={'Cidade'}
                       value={city}
                       onChange={(e) => setCity(e.target.value)}
                />
                <input placeholder={'Identificador'}
                       value={identifier}
                       onChange={(e) => onChangeIdentifier(e.target.value)}
                />
                <input placeholder={'Mensagem'}
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                />

                <input placeholder={'Valor'}
                       value={value}
                       onChange={(e) => onChangeValue(e.target.value)}
                />
            </form>
        </div>
    )
};

export default DynamicPix;
