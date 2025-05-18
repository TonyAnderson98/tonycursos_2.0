import "@/fonts/fonts";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
