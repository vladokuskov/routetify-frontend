'use client';

import { getUser } from '@/lib/api/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserStatus = async () => {
    const isLogged = await getUser();

    if (isLogged) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserStatus();
  }, []);

  if (isLoading) {
    return <p>Loading ..</p>;
  }

  return <main>{children}</main>;
}
