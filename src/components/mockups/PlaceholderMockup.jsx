/**
 * Blueprint-style placeholder used until real project visuals are provided.
 * To replace: drop an image in /public and render <img> here, or build a
 * custom mockup component and reference it from src/data/projects.js.
 */
export default function PlaceholderMockup() {
  return (
    <div className="mock mock--placeholder" aria-hidden="true">
      <span className="ph-corner ph-tl" />
      <span className="ph-corner ph-tr" />
      <span className="ph-corner ph-bl" />
      <span className="ph-corner ph-br" />
      <span className="ph-dim ph-dim--x mono">
        <i />
        <b>Preview</b>
        <i />
      </span>
      <div className="ph-center">
        <span className="ph-word display">EventVerse</span>
        <span className="mono ph-note">[ Project visuals coming soon ]</span>
      </div>
      <span className="ph-tag mono">Placeholder · Fig. 03</span>
    </div>
  )
}
