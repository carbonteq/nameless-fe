"use client";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserId } from "./redux/slices/authSlice";
import extractIdFromToken from "./token";
import { JWT_TOKEN } from "@/components/primitives";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    const JwtToken = localStorage.getItem(JWT_TOKEN)
    if (JwtToken) {
      dispatch(setUserId(extractIdFromToken(JwtToken)))
    }

  }, [dispatch]);


  return (
    <NextUIProvider navigate={router.push}  >
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
