import { Link } from 'react-router-dom'
import MoreLessText from './MoreLessText'

export default function ProjectCard({ blurb, link, moreInfo, children }) {
  return (
    <article className="card w-full max-w-3xl bg-primary text-primary-content shadow-sm shadow-black/10 transition duration-500 hover:scale-[1.005] hover:shadow-xl hover:shadow-black/25 dark:shadow-black/20 dark:hover:shadow-black/45">
      <div className="card-body gap-4">
        <MoreLessText>
          {blurb}
          {link && (
            <>
              {' '}
              <a
                href={link.href}
                target="_blank"
                rel="noopener"
                className="link link-hover font-medium"
              >
                {link.label}
              </a>
            </>
          )}
        </MoreLessText>
        {children}
        {moreInfo && (
          <Link to={moreInfo} className="btn btn-sm btn-outline self-end text-primary-content">
            Learn More
          </Link>
        )}
      </div>
    </article>
  )
}
