import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const isAdminUser = user?.role === "admin";
      if (isAdminUser) {
        setIsAdmin(true);
      } else {
        // If user is not admin, redirect to /admin page
        router.push("/");
      }
    } else {
      // If no user is logged in, redirect to login page
      router.push("/");
    }
  }, [user, router]);

  if (isAdmin === null) {
    return null; // You can return a loading spinner or message here if needed
  }

  return isAdmin ? <>{children}</> : null;
}
