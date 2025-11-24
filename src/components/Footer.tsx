import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">HetalShruti</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} HetalShruti Boutique. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.href}>
                <social.icon className="h-6 w-6 text-accent transition-colors hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
