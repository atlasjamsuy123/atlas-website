import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen text-white" style={{background: "linear-gradient(135deg, #0a0010 0%, #0d0018 40%, #0a000f 70%, #060008 100%)"}}>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">← Back to Home</Link>

        <h1 className="text-4xl font-light text-white mb-2">Refund Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: September 2026</p>

        <div className="space-y-10 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">Our Refund Guarantee</h2>
            <p>At Atlas Game Shop, we stand behind the quality of our service. If Atlas Tools does not work as described after following our support guide, we will issue a full refund.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">Eligible Refund Conditions</h2>
            <p>You are eligible for a full refund if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Atlas Tools fails to activate your games after following the official tutorial</li>
              <li>The software does not function on your compatible Windows device</li>
              <li>You have contacted our support and the issue could not be resolved</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">Non-Eligible Conditions</h2>
            <p>Refunds will not be issued if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>You have not followed the setup tutorial</li>
              <li>The issue is caused by your hardware or operating system incompatibility</li>
              <li>You simply changed your mind after a successful activation</li>
              <li>Your device does not meet the minimum system requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">How to Request a Refund</h2>
            <p>To request a refund:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1 ml-4">
              <li>Contact us via <a href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" className="text-purple-400 hover:text-purple-300">WhatsApp</a></li>
              <li>Provide your order number from Tokopedia or Shopee</li>
              <li>Describe the issue you encountered</li>
              <li>Our team will review and respond within 24 hours</li>
            </ol>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">Processing Time</h2>
            <p>Approved refunds are processed through Tokopedia or Shopee buyer protection. Processing time depends on the respective platform's refund timeline, typically 3–7 business days.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-light mb-4 text-purple-300">Contact</h2>
            <p>For refund requests or questions, contact us via <a href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" className="text-purple-400 hover:text-purple-300">WhatsApp</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
