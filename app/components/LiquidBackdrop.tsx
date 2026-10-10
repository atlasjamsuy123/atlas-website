/**
 * Fixed, full-screen backdrop shared by every page: a deep violet gradient with four slowly drifting
 * colour orbs (pure CSS, see .lg-* in globals.css). The frosted .glass surfaces on top pick up its
 * colour through backdrop-filter, which is what gives them the "liquid glass" look.
 */
export default function LiquidBackdrop() {
  return (
    <div className="lg-backdrop" aria-hidden="true">
      <div className="lg-orb lg-orb-violet" />
      <div className="lg-orb lg-orb-blue" />
      <div className="lg-orb lg-orb-pink" />
      <div className="lg-orb lg-orb-cyan" />
    </div>
  );
}
