import './globals.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'KMAI',
    description: 'Capitolato 1 - IS 2023/2024',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="it">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                  crossOrigin="anonymous" referrerPolicy="no-referrer"/>

        </head>
            <body>{children}</body>
        </html>
    )
}