import portrait from '../assets/Portrait.jpg'

const LINKEDIN = 'https://www.linkedin.com/in/christian-otty/'
const GITHUB = 'https://github.com/cotty52'

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-4 px-4 py-8">
      <div className="avatar">
        <div className="w-32 rounded-full shadow-lg md:w-48">
          {/*
            The 400s rotation is registered as --animate-slow-spin in index.css,
            so it stays a Tailwind utility rather than an inline style block.
          */}
          <img
            src={portrait}
            alt="Portrait of Christian Otty"
            className="hover:animate-slow-spin"
          />
        </div>
      </div>

      <h1 className="text-center text-lg font-medium md:text-xl">
        Christian Otty | Computer Engineer
      </h1>

      <nav className="flex gap-2">
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener"
          title="Visit my LinkedIn"
          className="btn btn-primary btn-sm border-none"
        >
          LinkedIn
        </a>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener"
          title="Visit my GitHub"
          className="btn btn-primary btn-sm border-none"
        >
          GitHub
        </a>
      </nav>
    </header>
  )
}
