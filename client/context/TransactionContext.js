import React, { useState, useEffect } from 'react'

export const TransactionContext = React.createContext()

let eth

if(typeof window != 'undefined') {
    eth = window.ethereum
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()

    useEffect(() => {
        checkIfWalletIsConncted()
    }, [])

    const connectWallet = async (metamask = eth) => {
        try {
            if(!metamask)
                return alert('Please install metamask')
            const accounts = await metamask.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        }
        catch (error) {
            console.error(error)
            throw new Error('No ethereum Object')
        }
    }

    const checkIfWalletIsConncted = async (metamask = eth) => {
        try {
            if(!metamask) return alert('Please install metamask.')

            const accounts = await metamask.request({ method: 'eth_accounts' })
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
            }
            else if(accounts[0] != null) {
                setCurrentAccount(accounts[0])
                console.log('wallet is alrady connected.')
            }
        } catch (error) {
            console.error(error)
            throw new Error('No ethereum Object')
        }
    }

    return (
        <TransactionContext.Provider
            value = {{
                currentAccount,
                connectWallet,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

