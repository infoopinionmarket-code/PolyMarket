import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const TermsPage = (): JSX.Element => {
  return (
    <div className="bg-[#3d3d3d] min-h-screen flex flex-col items-center w-full">
      {/* Header */}
      <header className="flex flex-col w-full items-center gap-6 py-6 bg-[#2c2c2c] border-b border-[#545454]">
        <div className="flex w-full max-w-[1440px] items-center gap-4 relative px-20">
          <Link to="/">
            <img
              className="relative w-[90.09px] h-10"
              alt="Logo"
              src="/image-5.png"
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
      <main className="w-full max-w-[800px] px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-[#c7c7c7]">Version 1.0 - 27.08.2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-[#c7c7c7]">
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the Website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use the Website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Website</h2>
              <p>You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the Website in any way that violates applicable laws or regulations.</li>
                <li>Infringe the intellectual property rights of others.</li>
                <li>Upload or distribute harmful code, malware, or disruptive materials.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
              <p>All content on the Website, including but not limited to text, graphics, logos, and software, is our property or licensed to us and is protected by copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Content</h2>
              <p>If you upload or submit any content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display it in connection with operating the Website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Payments</h2>
              <p>We do not directly process payments. All payments are handled by our third-party payment processors. You agree to comply with their terms and acknowledge that we are not responsible for their actions, data handling, or security measures.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The platform operates strictly on an "as is" and "as available" basis, without any warranties, express or implied.</li>
                <li>We do not guarantee any specific results, including but not limited to financial earnings, commercial success, or the outcome of real-world events.</li>
                <li>All activities and participation on the Website are undertaken at your own discretion and risk.</li>
                <li>You confirm that you have obtained all necessary legal permissions, licenses, or guardian consents (if applicable) before engaging in activities on the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
              <p>We may suspend or terminate your access to the Website at our discretion for violation of these Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p>The Website is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the Website, including but not limited to loss of profit, revenue, data, or goodwill.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Terms</h2>
              <p>We may update these Terms at any time, and your continued use of the Website constitutes acceptance of those changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
              <p>These Terms shall be governed by applicable international and local laws, without regard to conflict of law principles.</p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};
