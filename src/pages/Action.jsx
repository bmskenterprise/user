import {MdPayments} from 'react-icons/md'
import {FaMobileAlt,FaLayerGroup,FaWallet} from 'react-icons/fa'
import {RiBankFill,RiBillLine} from 'react-icons/ri'
import {GrTransaction} from 'react-icons/gr'
import {PiHandWithdrawBold} from 'react-icons/pi';

export default [
    {
        icon: <FaWallet/>,
        text: 'Balance',
        url:'/balance'
    },
    {
        icon: <GrTransaction/>,
        text: 'Deposit',
        url:'/deposit/transaction'
    },
    {
        icon: <MdPayments/>,
        text: 'Payment',
        url: '/deposit/payment'
    },
    {
        icon: <PiHandWithdrawBold />,
        text: 'Withdraw',
        url: '/withdraw'
    },
    {
        icon: <FaMobileAlt/>,
        text: 'Topup',
        url: '/topup'
    },
    {
        icon: <FaLayerGroup/>,
        text: 'Regular',
        url: '/regular'
    },
    {
        icon: <FaLayerGroup/>,
        text: 'Drive',
        url: '/drive'
    },
    {
        icon: <RiBankFill/>,
        text: 'Bank',
        url: '/bank'
    },
    {
        icon: <RiBillLine/>,
        text: 'Bill',
        url: '/bill'
    }
]