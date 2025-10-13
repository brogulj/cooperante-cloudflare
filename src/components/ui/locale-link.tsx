import { fallbackLng } from "@/app/i18n/settings";
import Link from "next/link";

export const LinkBase = ({
  lng,
  href = "",
  children,
  className,
  onClick,
}: {
  lng: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  if (lng === fallbackLng || lng === undefined || lng === "") {
    return (
      <Link href={`${href}`} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={`/${lng}${href}`} className={className}>
      {children}
    </Link>
  );
};
