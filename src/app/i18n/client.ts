"use client";

import i18next from "./i18next";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const runsOnServerSide = typeof window === "undefined";

export function useT(ns?: string | string[], options?: any) {
  const namespace = ns ?? "common";
  const lng = useParams()?.locale;

  if (typeof lng !== "string")
    throw new Error("useT is only available inside /app/[lng]");

  // Ensure language is set correctly on client side
  useEffect(() => {
    if (i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  return useTranslation(namespace, options);
}
