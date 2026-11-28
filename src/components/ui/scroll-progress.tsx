/** A hairline reading-progress bar driven entirely by CSS scroll-driven
 *  animation: no JavaScript, no layout work, hidden when the browser or the
 *  user's motion preference says no. */
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden />;
}
