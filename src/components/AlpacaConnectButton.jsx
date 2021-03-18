import { useContext } from 'react';
import { FirebaseContext } from '../config/Firebase/FirebaseContext';
import { randomBytes } from 'crypto';

const client_id = process.env.REACT_APP_ALPACA_CLIENT;
const redirect_uri = encodeURIComponent('http://localhost:3000/');

export const AlpacaConnectButton = () => {
    const firebase = useContext(FirebaseContext);
    
    const connectToAlpaca = async (e) => {
        e.preventDefault();

        const random_string = randomBytes(20).toString('hex');
        const codeURI =
            `https://app.alpaca.markets/oauth/authorize?` +
            `response_type=code&` +
            `client_id=${client_id}&` +
            `redirect_uri=${redirect_uri}&` +
            `state=${random_string}&` +
            `scope=data`
        
            try {
                const { code, state } = await openAlpacaPopup(codeURI)
                if (!requestIsValid(random_string, state)) {
                    throw new Error('Alpaca Authentication Invalid')
                }
                console.log(code);
                console.log(state);
            } catch (e) {
                const error = {};
                error.message = e.message;
                console.log(error);
            }
    }

    const requestIsValid = (init_state, returned_state) => (init_state === returned_state);

    const openAlpacaPopup = (uri) => {
        return new Promise((resolve, reject) => {
            const authWindow = window.open(uri);
            let snippet = uri | null;

            const interval = setInterval(async () => {
                try {
                    snippet = authWindow && authWindow.location && authWindow.location.search
                } catch (e) {
                    if (snippet) {
                        const rawCode = snippet.substring(1);
                        const parsedCode = JSON.parse('{"' + rawCode.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                            function (key, value) {
                                return key === "" ? value : decodeURIComponent(value)
                            });
                        authWindow.close();
                        resolve(parsedCode);
                        clearInterval(interval)
                    }
                }
            }, 100);
        })
    }

    return (
        <button onClick={connectToAlpaca}>
            Connect To Alpaca
        </button>
    )
}