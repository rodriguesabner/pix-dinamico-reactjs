import {useState} from 'react'
import './App.css'
import Home from "./pages/Home";
import DynamicPix from "./pages/DynamicPix";

function App(): JSX.Element {
    const [step, setStep] = useState(0);

    const renderStep = () => {
        switch (step) {
            case 0:
                return <Home />
            case 1:
                return <DynamicPix />
            default:
                return <Home />
        }
    }

    const handleChangeStep = (step: number): void => {
        setStep(step)
    }

    return (
        <div className="App">
            <header>
                <button
                    style={{marginRight: 10}}
                    onClick={() => handleChangeStep(0)}
                >
                    Home
                </button>

                <button onClick={() => handleChangeStep(1)}>
                    Dynamic Pix
                </button>
            </header>

            <div>
                {renderStep()}
            </div>
        </div>
    )
}

export default App
