import linkedInIcon from '../assets/LinkedIn_2.png'
import gitHubIcon from '../assets/GitHub_2.png'
import ThemeToggle from './ThemeToggle'

const LINKEDIN = 'https://www.linkedin.com/in/christian-otty/'
const GITHUB = 'https://github.com/cotty52'

/*
  A plain flex row, not daisyUI's `footer`: that class is display:grid with
  grid-auto-flow:column, which turns each child into its own equal column —
  spreading the icons out — and leaves `flex-1` on the accent line inert, so
  the line collapsed to zero width. Flex gives the original's layout: name and
  icons grouped at the left, line filling whatever is left.
*/
export default function Footer() {
  return (
    <footer className="flex items-center gap-3 bg-base-200 px-6 py-4 text-sm shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_14px_rgba(0,0,0,0.55)]">
      <span>2026 | Christian Otty</span>

      <a href={LINKEDIN} target="_blank" rel="noopener" title="Visit my LinkedIn">
        <img src={linkedInIcon} alt="LinkedIn" className="w-5 transition hover:opacity-70" />
      </a>
      <a href={GITHUB} target="_blank" rel="noopener" title="Visit my GitHub">
        <img src={gitHubIcon} alt="GitHub" className="w-5 transition hover:opacity-70" />
      </a>

      <div className="h-1 flex-1 rounded-l-full rounded-r-full bg-brand" />

      <ThemeToggle />
    </footer>
  )
}
