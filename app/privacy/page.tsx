import LegalPage, { WaLink, type LegalContent } from "../components/LegalPage";
import { getLang } from "../lib/getLang";

const CONTENT: Record<"en" | "id", LegalContent> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 2026",
    back: "Back to Home",
    sections: [
      { heading: "1. Information We Collect", body: "When you purchase through Tokopedia or Shopee, those platforms handle your personal information according to their own privacy policies. Atlas Game Shop only receives your order information necessary to fulfill your purchase." },
      {
        heading: "2. How We Use Your Information",
        body: "We use your information solely to:",
        list: ["Process and fulfill your order", "Provide customer support", "Send important service updates"],
      },
      { heading: "3. Data Storage", body: "We do not store your payment information. All payment processing is handled by Tokopedia and Shopee. We only retain the minimum information required to support your account." },
      { heading: "4. Data Sharing", body: "We do not sell, trade, or transfer your personal information to third parties. Your data is only used to provide and improve our service." },
      { heading: "5. Atlas Tools Application", body: "The Atlas Tools desktop application requires an internet connection to verify your license. The app only communicates with our servers to authenticate your activation code. No personal browsing or gaming data is collected." },
      { heading: "6. Contact", body: <>For privacy concerns, contact us via <WaLink />.</> },
    ],
  },
  id: {
    title: "Kebijakan Privasi",
    updated: "Terakhir diperbarui: September 2026",
    back: "Kembali ke Beranda",
    sections: [
      { heading: "1. Informasi yang Kami Kumpulkan", body: "Saat kamu membeli lewat Tokopedia atau Shopee, platform tersebut mengelola data pribadi kamu sesuai kebijakan privasi mereka masing-masing. Atlas Game Shop hanya menerima informasi order yang diperlukan untuk memproses pembelian kamu." },
      {
        heading: "2. Cara Kami Menggunakan Informasi Kamu",
        body: "Kami menggunakan informasi kamu hanya untuk:",
        list: ["Memproses dan menyelesaikan order kamu", "Memberikan bantuan pelanggan", "Mengirim informasi penting tentang layanan"],
      },
      { heading: "3. Penyimpanan Data", body: "Kami tidak menyimpan informasi pembayaran kamu. Semua pembayaran diproses oleh Tokopedia dan Shopee. Kami hanya menyimpan informasi seminimal mungkin yang diperlukan untuk mendukung akun kamu." },
      { heading: "4. Berbagi Data", body: "Kami tidak menjual, menukar, atau memindahkan data pribadi kamu ke pihak ketiga. Data kamu hanya digunakan untuk menyediakan dan meningkatkan layanan kami." },
      { heading: "5. Aplikasi Atlas Tools", body: "Aplikasi desktop Atlas Tools membutuhkan koneksi internet untuk memverifikasi lisensi kamu. Aplikasi hanya berkomunikasi dengan server kami untuk mengautentikasi kode aktivasi kamu. Tidak ada data browsing atau data game pribadi yang dikumpulkan." },
      { heading: "6. Kontak", body: <>Untuk pertanyaan soal privasi, hubungi kami lewat <WaLink />.</> },
    ],
  },
};

export default async function PrivacyPolicy() {
  const { lang } = await getLang();
  return <LegalPage content={CONTENT[lang]} />;
}
