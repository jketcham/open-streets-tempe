import { ThemeProvider, ThemeColor } from "./ThemeProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  theme: ThemeColor;
}

export function PageLayout({ children, theme }: PageLayoutProps) {
  return (
    <ThemeProvider defaultColor={theme}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
