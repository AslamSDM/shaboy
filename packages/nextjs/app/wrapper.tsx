"use client"

import { useAccount } from '@starknet-react/core';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function WalletConnect({ children }: { children: React.ReactNode }){
    const {status} = useAccount()
    const [currentUrl, setCurrentUrl] = useState('');
    console.log(currentUrl)
    console.log(status)
    useEffect(() => {
        const url = window;
        console.log(url)
    }, [])
    return (
        <>
            {children}
        </>

    );
    }

