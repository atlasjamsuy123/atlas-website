import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-white" style={{background: "linear-gradient(135deg, #0a0010 0%, #0d0018 40%, #0a000f 70%, #060008 100%)"}}>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">← Back to Home</Link>

        <h1 className="text-4xl font-light text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: September 2026</p>

        <div className="space-y-10 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">1. Information We Collect</h2>
            <p>When you purchase through Tokopedia or Shopee, those platforms handle your personal information according to their own privacy policies. Atlas Game Shop only receives your order information necessary to fulfill your purchase.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">2. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Process and fulfill your order</li>
              <li>Provide customer support</li>
              <li>Send important service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">3. Data Storage</h2>
            <p>We do not store your payment information. All payment processing is handled by Tokopedia and Shopee. We only retain the minimum information required to support your account.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">4. Data Sharing</h2>
            <p>We do not sell, trade, or transfer your personal information to third parties. Your data is only used to provide and improve our service.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">5. Atlas Tools Application</h2>
            <p>The Atlas Tools desktop application requires an internet connection to verify your license. The app only communicates with our servers to authenticate your activation code — no personal browsing or gaming data is collected.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">6. Contact</h2>
            <p>For privacy concerns, contact us via <a href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" className="text-purple-400 hover:text-purple-300">WhatsApp</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
