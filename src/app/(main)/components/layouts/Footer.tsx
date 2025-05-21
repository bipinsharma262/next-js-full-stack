import Container from '@/app/components/ui/Container';
import { footerItems } from '@/constants';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-4 mt-auto">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient-blue-purple">ProductHub</h3>
            <p className="text-gray-600">Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            {footerItems.map((link, index) => (
              <ul className="space-y-2" key={index}>
                <Link
                  href={link.path}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              </ul>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: hello@tutorialhub.com</li>
              <li className="text-gray-600">Follow us on Twitter</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} ProductHub. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
