"use client";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from 'react';
import Jwt from "jsonwebtoken"
import { useDispatch } from "react-redux";
import { setUserId } from "./redux/slices/authSlice";
import extractIdFromToken from "./token";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    const JwtToken = localStorage.getItem('jwtToken')
    if (JwtToken) {
      dispatch(setUserId(extractIdFromToken(JwtToken)))
    }

  }, []);


  return (
    <NextUIProvider navigate={router.push}  >
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
