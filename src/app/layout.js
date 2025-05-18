import "@/fonts/fonts";
import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
