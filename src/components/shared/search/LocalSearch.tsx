"use client";

import { Input } from "@/components/ui/input";
import { formURLQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

function LocalSearch({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formURLQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newURL, { scroll: false });
      } else {
        if (pathname === route) {
          const newURL = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [pathname, route, router, search, searchParams]);

  return (
    <div
      className={`background-light800_darkgradient text-dark500_light700 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="Search icon"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="Search icon"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}

export default LocalSearch;
