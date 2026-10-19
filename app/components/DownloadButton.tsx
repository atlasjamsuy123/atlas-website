const SETUP_URL =
  "https://github.com/atlasjamsuy123/Atlas-tools-Update/releases/latest/download/AtlasTools-win-Setup.exe";

export default function DownloadButton() {
  return (
    <a href={SETUP_URL} download="AtlasTools-win-Setup.exe" className="glass-pill glass-pill-accent w-full !py-3 !text-base">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download Atlas Tools
    </a>
  );
}
