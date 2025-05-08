// components/Layout.tsx
import { Appbar } from "./Appbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
      return (
            <>
                  <Appbar />
                  <main className="pt-0">{children}</main> {/* Add padding if needed */}
            </>
      );
};
