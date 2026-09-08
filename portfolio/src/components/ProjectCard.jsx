import { Link } from 'react-router-dom'
import MoreLessText from './MoreLessText'

export default function ProjectCard({ blurb, link, moreInfo, children }) {
  return (
    <article className="card w-full max-w-3xl bg-primary text-primary-content shadow-md transition duration-300 hover:shadow-2xl">
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
