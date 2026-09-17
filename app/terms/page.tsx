import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen text-white" style={{background: "linear-gradient(135deg, #0a0010 0%, #0d0018 40%, #0a000f 70%, #060008 100%)"}}>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">← Back to Home</Link>

        <h1 className="text-4xl font-light text-white mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: September 2026</p>

        <div className="space-y-10 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">1. Acceptance of Terms</h2>
            <p>By purchasing or using Atlas Tools from Atlas Game Shop through Tokopedia or Shopee, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">2. Description of Service</h2>
            <p>Atlas Game Shop provides Atlas Tools, a desktop application for Windows that enables game activation for Steam, EA, Ubisoft, and Denuvo-protected titles. The software is provided as a portable application — no installation required.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">3. License & Usage</h2>
            <p>Upon purchase, you are granted a personal, non-transferable license to use Atlas Tools on your own device. You may not redistribute, resell, or share the software or your activation credentials with others.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">4. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Reverse engineer, decompile, or modify the software</li>
              <li>Share your account credentials or activation codes</li>
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to circumvent any security measures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">5. Service Availability</h2>
            <p>We strive to maintain continuous service availability. However, we do not guarantee uninterrupted access. Maintenance, updates, or circumstances beyond our control may temporarily affect service availability.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">6. Limitation of Liability</h2>
            <p>Atlas Game Shop is not responsible for any indirect, incidental, or consequential damages arising from the use or inability to use our service. Our total liability shall not exceed the amount paid for the service.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">8. Contact</h2>
            <p>For any questions regarding these terms, please contact us via <a href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" className="text-purple-400 hover:text-purple-300">WhatsApp</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
