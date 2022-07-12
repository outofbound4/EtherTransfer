import React, {useState, useEffect} from 'react';
import Image  from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AiOutlineDown } from 'react-icons/ai';
import ethLogo from '../assets/eth.png';
import uniswapLogo from '../assets/uniswap.png';

const style = {}

const Header = () => {
    const [selectedNav, setSelectedNav] = useState('swap')
    return (
        <div className= { style.wrapper}>
            <div className= { style.wrapper}>
                <Image src={ uniswapLogo } alt="uniswap" height={40} width={40}/>
            </div>
        </div>
    )
}

export default Header;
