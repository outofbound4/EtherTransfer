import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AiOutlineDown } from 'react-icons/ai';
import { RiSettings3Fill } from 'react-icons/ri'
import ethLogo from '../assets/eth.png';
import { TransactionContext } from '../context/TransactionContext';
import { useContext } from 'react';


const Main = () => {
    const { formData, handleChange, sendTransaction } = useContext(TransactionContext)

    const handleSubmit = async (e) => {
        const { addressTo, amount } = formData
        e.preventDefault()

        if(!addressTo || !amount)
            return
        sendTransaction()
    }
    return (
        <div className=''>
            <div className=''>
                <div className=''>
                    <div>Swap</div>
                    <div>
                        <RiSettings3Fill />
                    </div>
                </div>
                <div className=''>
                    <input
                        type='text'
                        className=''
                        placeholder='0.0'
                        pattern='^[0-9]*[.,]?[0-9]$'
                        onChange={(e) => handleChange(e, 'amount')}
                    />
                    <div className=''>
                        <div className=''>
                            <div className=''>
                                <Image src={ethLogo} alt='eth logo' height={20} width={20} />
                            </div>
                            <div className=''>ETH</div>
                            <AiOutlineDown className='' />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <input
                        type='text'
                        className=''
                        placeholder='0x...'
                        onChange={(e) => handleChange(e, 'addressTo')}
                    />
                    <div className=''></div>
                </div>
                <div onClick={(e) => handleSubmit(e)} className=''>
                    Confirm
                </div>
            </div>
        </div>
    )
}

export default Main
