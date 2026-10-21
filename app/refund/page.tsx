import LegalPage, { WaLink, type LegalContent } from "../components/LegalPage";
import { getLang } from "../lib/getLang";

const CONTENT: Record<"en" | "id", LegalContent> = {
  en: {
    title: "Refund Policy",
    updated: "Last updated: September 2026",
    back: "Back to Home",
    sections: [
      { heading: "Our Refund Guarantee", body: "At Atlas Game Shop, we stand behind the quality of our service. If Atlas Tools does not work as described after following our support guide, we will issue a full refund." },
      {
        heading: "Eligible Refund Conditions",
        body: "You are eligible for a full refund if:",
        list: [
          "Atlas Tools fails to activate your games after following the official tutorial",
          "The software does not function on your compatible Windows device",
          "You have contacted our support and the issue could not be resolved",
        ],
      },
      {
        heading: "Non-Eligible Conditions",
        body: "Refunds will not be issued if:",
        list: [
          "You have not followed the setup tutorial",
          "The issue is caused by your hardware or operating system incompatibility",
          "You simply changed your mind after a successful activation",
          "Your device does not meet the minimum system requirements",
        ],
      },
      {
        heading: "How to Request a Refund",
        body: "To request a refund:",
        ordered: true,
        list: [
          <>Contact us via <WaLink /></>,
          "Provide your order number from Tokopedia or Shopee",
          "Describe the issue you encountered",
          "Our team will review and respond within 24 hours",
        ],
      },
      { heading: "Processing Time", body: "Approved refunds are processed through Tokopedia or Shopee buyer protection. Processing time depends on the respective platform's refund timeline, typically 3 to 7 business days." },
      { heading: "Contact", body: <>For refund requests or questions, contact us via <WaLink />.</> },
    ],
  },
  id: {
    title: "Kebijakan Refund",
    updated: "Terakhir diperbarui: September 2026",
    back: "Kembali ke Beranda",
    sections: [
      { heading: "Jaminan Refund Kami", body: "Di Atlas Game Shop, kami menjamin kualitas layanan kami. Kalau Atlas Tools tidak berfungsi seperti yang dijelaskan setelah kamu mengikuti panduan support kami, uang kamu kami kembalikan penuh." },
      {
        heading: "Syarat Refund",
        body: "Kamu berhak mendapat refund penuh jika:",
        list: [
          "Atlas Tools gagal mengaktifkan game kamu setelah mengikuti tutorial resmi",
          "Software tidak berfungsi di perangkat Windows kamu yang kompatibel",
          "Kamu sudah menghubungi support kami dan masalahnya tidak bisa diselesaikan",
        ],
      },
      {
        heading: "Kondisi yang Tidak Bisa Refund",
        body: "Refund tidak diberikan jika:",
        list: [
          "Kamu tidak mengikuti tutorial pemasangan",
          "Masalah disebabkan oleh hardware atau sistem operasi kamu yang tidak kompatibel",
          "Kamu berubah pikiran setelah aktivasi berhasil",
          "Perangkat kamu tidak memenuhi spesifikasi minimum",
        ],
      },
      {
        heading: "Cara Mengajukan Refund",
        body: "Untuk mengajukan refund:",
        ordered: true,
        list: [
          <>Hubungi kami lewat <WaLink /></>,
          "Kirim nomor order kamu dari Tokopedia atau Shopee",
          "Jelaskan masalah yang kamu alami",
          "Tim kami akan meninjau dan membalas dalam 24 jam",
        ],
      },
      { heading: "Waktu Proses", body: "Refund yang disetujui diproses lewat perlindungan pembeli Tokopedia atau Shopee. Lama prosesnya tergantung platform masing-masing, biasanya 3 sampai 7 hari kerja." },
      { heading: "Kontak", body: <>Untuk pengajuan refund atau pertanyaan, hubungi kami lewat <WaLink />.</> },
    ],
  },
};

export default async function RefundPolicy() {
  const { lang } = await getLang();
  return <LegalPage content={CONTENT[lang]} />;
}
