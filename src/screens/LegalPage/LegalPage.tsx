import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Footer } from "../../components/Footer";

export const LegalPage = (): JSX.Element => {
  return (
    <div className="bg-[#3d3d3d] min-h-screen flex flex-col items-center w-full">
      {/* Header */}
      <header className="flex flex-col w-full items-center gap-6 py-6 bg-[#2c2c2c] border-b border-[#545454]">
        <div className="flex w-full max-w-[1440px] items-center gap-4 relative px-4 sm:px-8 lg:px-20">
          <Link to="/">
            <img
              className="relative w-[90px] h-[40px] sm:w-[117px] sm:h-[52px]"
              alt="Opinion Market Logo"
              src="/logo.svg"
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
          <h1 className="text-4xl font-bold text-white mb-4">Legal Notice</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-[#c7c7c7]">
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Website Ownership</h2>
              <p>The website Opinion Market (the "Website") is owned and operated by us. All rights, including copyrights, trademarks, and other intellectual property rights in and to the Website and its content, are reserved and belong to us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Use of Website</h2>
              <p>By accessing and using this Website, you agree to comply with and be bound by our Terms of Service. You may only use this Website within the scope permitted by the Terms of Service. Any unauthorized use, including but not limited to reproduction, distribution, or modification of the Website's content, is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Copyright Infringement & DMCA Policy</h2>
              <p>We respect the intellectual property rights of others. If you are a rights holder and believe that your copyrighted material has been posted on the Website without authorization, you may submit a notice in accordance with the Digital Millennium Copyright Act (DMCA). Upon receipt of a valid DMCA notice, we will promptly remove or disable access to the allegedly infringing content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">DMCA Notice Requirements</h2>
              <p>Please email <a href="mailto:info@opinionmarket.com" className="text-[#b2d33a] hover:underline">info@opinionmarket.com</a> with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>Identification of the allegedly infringing material (link or specific location).</li>
                <li>Your contact details (name, address, phone, email).</li>
                <li>Statement of good-faith belief that use is unauthorized.</li>
                <li>Statement under penalty of perjury that the information is accurate and you are authorized to act.</li>
                <li>Your physical or electronic signature.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <p>Email: <a href="mailto:info@opinionmarket.com" className="text-[#b2d33a] hover:underline">info@opinionmarket.com</a></p>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
