import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import { type ReactNode } from "react"
import { Providers } from "./providers"
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
    title: "NftMarketplace",
    description: "A non-custodial marketplace for NFTs",
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/nft-marketplace.png" sizes="any" />
            </head>
            <body className="bg-zinc-50">
                <Providers>
                    <Header />
                    {props.children}
                    <Toaster position="top-left" />
                </Providers>
            </body>
        </html>
    )
}