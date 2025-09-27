import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Footer } from "../../components/Footer";

export const PrivacyPage = (): JSX.Element => {
  return (
    <div className="bg-[#3d3d3d] min-h-screen flex flex-col items-center w-full">
      {/* Header */}
      <header className="flex flex-col w-full items-center gap-6 py-6 bg-[#2c2c2c] border-b border-[#545454]">
        <div className="flex w-full max-w-[1440px] items-center gap-4 relative px-4 sm:px-8 lg:px-20">
          <Link to="/">
            <img
              className="relative w-[108px] h-[48px] sm:w-[140px] sm:h-[62px]"
              alt="Opinion Market Logo"
              src="/OMLogo.png"
            />
          </Link>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="h-9 rounded-[5.6px] text-white font-medium">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[800px] px-4 sm:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-[#c7c7c7]">
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share your information when you use Opinion Market.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email Address:</strong> Collected when you register or contact us.</li>
                <li><strong>Usage Data:</strong> Information on how you use the Website (e.g., IP address, browser type).</li>
                <li><strong>Payment Data:</strong> You provide your payment details directly to our payment processing partners; we do not store or have access to this information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide and improve the Website.</li>
                <li>Communicate with you about your account or services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing of Information</h2>
              <p>We share your data only with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Payment Processing Partners:</strong> For handling your payments securely.</li>
                <li><strong>Service Providers:</strong> For hosting, analytics, and customer support.</li>
                <li><strong>Legal Authorities:</strong> If required by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
              <p>We use cookies to improve user experience and analyze traffic. You can manage cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
              <p>We take reasonable measures to protect your data but cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have rights to access, correct, or delete your data. Contact us at <a href="mailto:info@opinionmarket.com" className="text-[#b2d33a] hover:underline">info@opinionmarket.com</a> for requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes are effective when posted on the Website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
              <p>Email: <a href="mailto:info@opinionmarket.com" className="text-[#b2d33a] hover:underline">info@opinionmarket.com</a></p>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
