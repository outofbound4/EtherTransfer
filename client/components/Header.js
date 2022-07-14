import React, {useState, useEffect, useContext} from 'react';
import Image  from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AiOutlineDown } from 'react-icons/ai';
import ethLogo from '../assets/eth.png';
import uniswapLogo from '../assets/uniswap.png';
import {TransactionContext} from '../context/TransactionContext'

const Header = () => {
    const [selectedNav, setSelectedNav] = useState('swap')
    const { currentAccount, connectWallet } = useContext(TransactionContext)

    return (
        <div className= 'test'>
            <div className= 'Test'>
                <Image src={ uniswapLogo } alt="uniswap" height={40} width={40}/>
            </div>
            <div className='Test'>
                <div className='Test'>
                    <div
                        onClick={() => setSelectedNav('swap')}
                        className='Test'
                    >
                        Swap
                    </div>
                    <div
                        onClick={() => setSelectedNav('pool')}
                        className='Test'
                    >
                        Pool
                    </div>
                    <div
                        onClick={() => setSelectedNav('vote')}
                        className='Test'
                    >
                        Vote
                    </div>
                    <a
                        href='#'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <div className='Test'>
                            Charts <FiArrowUpRight />
                        </div>
                    </a>
                </div>
            </div>
            <div className='Test'>
                <div className='Test'>
                    <div className='Test'>
                        <Image src={ethLogo} alt='eth logo' height={20} width={20} />
                    </div>
                    <p>Ethereum</p>
                    <div className='Test'>
                        <AiOutlineDown />
                    </div>
                </div>
                <div 
                    onClick={() => connectWallet()}
                    className='Test'
                >
                    <div className='Test'>
                        Connect Wallet
                    </div>
                    <div className='Test'>
                        <div className='Test'>
                            <HiOutlineDotsVertical />
                        </div>                    
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header;
