import "./globals.css";
import Provider from "@/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        {" "}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
