import linkedInIcon from '../assets/LinkedIn_2.png'
import gitHubIcon from '../assets/GitHub_2.png'

const EMAIL = 'christianjotty@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/christian-otty/'
const GITHUB = 'https://github.com/cotty52'

/*
  The PDF lives in public/, which Vite copies to the site root untouched. The
  production build is served under /Website/ (see vite.config.js), so the URL
  is prefixed with BASE_URL rather than hard-coded as "/Christian_Otty_...".
*/
const RESUME = `${import.meta.env.BASE_URL}Christian_Otty_Resume.pdf`

// Shared outline-icon shell; strokes use currentColor so the icons follow the theme text color.
function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="size-full"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
)

const DocumentIcon = () => (
  <Icon>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Icon>
)

/*
  Link row: icon on the left, link text on the right, no box. The icon slot
  has a fixed size so the text lines up in one column whatever the icon is; the
  whole row is the link, so the click target stays large on touch screens.
*/
function LinkRow({ href, external, label, children }) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener' })}
      className="group flex items-center gap-4 transition duration-200 hover:text-primary"
    >
      <span className="flex size-8 shrink-0 items-center justify-center">{children}</span>
      <span className="break-all font-medium group-hover:underline">{label}</span>
    </a>
  )
}

export default function Contact() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <p>
        Feel free to reach out to me! I've recently completed my bachelor's and master's degrees in
        computer engineering at Binghamton University and I'm <b>available now for full-time roles</b>. I'm
        open to relocating, and I'm always interested in discussing new opportunities, collaborating
        on projects, or just connecting with fellow engineers and developers.
      </p>

      <section className="flex w-fit max-w-full flex-col items-start gap-4">
        <LinkRow href={`mailto:${EMAIL}`} label={EMAIL}>
          <MailIcon />
        </LinkRow>
        <LinkRow href={RESUME} external label="Resume (PDF)">
          <DocumentIcon />
        </LinkRow>
        <LinkRow href={LINKEDIN} external label="linkedin.com/in/christian-otty">
          <img src={linkedInIcon} alt="" className="size-full object-contain" />
        </LinkRow>
        <LinkRow href={GITHUB} external label="github.com/cotty52">
          <img src={gitHubIcon} alt="" className="size-full object-contain" />
        </LinkRow>
      </section>
    </div>
  )
}
