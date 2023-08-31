import { Inter } from 'next/font/google'
import * as React from "react";
import {Input} from "@nextui-org/react";

import { useSnackbar } from 'react-simple-snackbar'

const inter = Inter({ subsets: ['latin'] })

export default function AddCode() {
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const [email, setEmail] = React.useState('')
    const [codigo, setCodigo] = React.useState('')
    const [monto, setMonto] = React.useState('')
    const [tipo, setTipo] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo,
                monto,
                codigo,
                email,
            }),
        })

        const data = await response.json();

        if (response.status === 201) {
            openSnackbar("Codigo creado"); // 'Código agregado'
        } else if (response.status === 409) {
            openSnackbar(data.error); // 'El mail ya existe'
        } else {
            openSnackbar(`Ocurrió un error: ${response.status}`);
        }

    

    }

    


    return (
        <>
            <main
                className={`flex min-h-screen dark flex-col items-center justify-between ${inter.className}`}
            >
                <div class="">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col flex-wrap w-full gap-4 gap-5 md:flex-nowrap">
                            <Input 
                                type="email" 
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            
                            <Input
                                type="text"
                                label="Código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />

                            <Input
                                type="text"
                                label="Monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                            />

                            <Input
                                type="text"
                                label="Tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />


                            
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}