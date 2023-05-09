import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from '@/redux/provider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'cycroute',
  description:
    'Web application to create bike routes and export them in GPX/KML format. ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
