import React, { useState, useEffect } from 'react'

export const TransactionContext = React.createContext()

let eth

if(typeof window != 'undefined') {
    eth = window.ethereum
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [isLoadiing, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        addressTo: '',
        amount:  ''
    })

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

    const sendTransaction = async (
        metamask = eth,
        connectedAccount = currentAccount
    ) => {
        try {
            if(!metamask) return alert('Please install metamask.')
            const { addressTo, amount } = formData
            const transactionContract = getEthereumContract()
            
            const parsedAmount = ethers.utils.parseEther(amount)

            await metamask.request(
                {
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: connectedAccount,
                            to: addressTo,
                            gas: '0x7EF40', //52000gwei
                            value: parsedAmount._hex,
                        }
                    ]
                }
            )

            const transactonHash = await transactionContract.publishTansaction(
                addressTo,
                amount,
                `Transferring Eth ${ parsedAmount } to ${ addressTo }`,
                'Transfer',
            )
            
            setIsLoading(true)

            await transactonHash.wait()

            // DB Part
            // await saveTransaction(
            //     transactonHash.hash,
            //     amount,
            //     connectedAccount,
            //     addressTo
            // )

            setIsLoading(false)

        } catch(error) {
            console.log("Error: " + error)
        }
    }
    
    const handleChange = (e, name) => {
        setFormData(prevState => ({... prevState, [name]: e.target.value}))
    }

    return (
        <TransactionContext.Provider
            value = {{
                currentAccount,
                connectWallet,
                sendTransaction,
                handleChange
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

