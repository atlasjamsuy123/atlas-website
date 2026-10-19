/**
 * Fixed, full-screen backdrop shared by every page: the dark base with one still violet light at the
 * top (see .lg-backdrop in globals.css).
 */
export default function LiquidBackdrop() {
  return <div className="lg-backdrop" aria-hidden="true" />;
}
