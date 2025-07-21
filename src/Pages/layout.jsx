import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Rwafi - Logistics Solutions",
  description: "Your trusted partner for seamless business entry into the Saudi Arabian market",
}

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>
}
