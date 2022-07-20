import type { NextPage } from 'next'
import { useState, ChangeEvent, MouseEvent } from 'react'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')
    const [executable, setExecutable] = useState('')

    const addressSubmittedHandler = (address: string) => {
        try {
            setAddress(address)
            const key = new Web3.PublicKey(address)
            const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
            connection.getBalance(key).then(balance => {
                setBalance(balance / Web3.LAMPORTS_PER_SOL)
            })
            connection.getAccountInfo(key).then(info =>
                setExecutable(info?.executable ? "Yes" : "Nope")
            )
        } catch (error) {
            setAddress('')
            setBalance(0)
            setExecutable('')
            alert(error)
        }
    }

    const onChange = (e : ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const onSubmit = (e : MouseEvent<HTMLButtonElement>) => {
        addressSubmittedHandler(address)
    }


    return (
        <div className="flex flex-col w-100 min-h-screen bg-gray-400">
            <p className="text-3xl">Check Balance</p>
            <input type="text" onChange={(e) => onChange(e)} />
            <button onClick={(e) => onSubmit(e)}>Click to check address</button>
            <p className="text-3xl">Address: {address}</p>
            <p className="text-3xl">Balance: {balance} SOL</p>
            <p className="text-3xl">Executable: {executable}</p>
        </div>
    )
}

export default Home
