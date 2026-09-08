import { Link } from 'react-router-dom'
import ImageZoom from '../../components/ImageZoom'
import formulaCar from '../../assets/Formula_Car_Full.jpg'

export default function Formula() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-8">
      <Link to="/projects" className="link link-hover self-start text-sm">
        &larr; Back to Projects
      </Link>

      <h1 className="text-2xl font-semibold md:text-3xl">Binghamton Motorsports Formula SAE</h1>

      <ImageZoom src={formulaCar} alt="Formula SAE car" className="mx-auto w-full max-w-2xl" />

      <p>
        The Society of Automotive Engineers (SAE) club at Binghamton is a student-run organization
        dedicated to designing and building high-performance vehicles. The Formula team has created
        several Formula-1 inspired vehicles over the years. This subset of the organization got its
        start with internal combustion engines, but has since made the switch to electric drive. As
        a member of the Formula team, I have gained a lot of hands-on experience in engineering
        design and teamwork.
      </p>
    </div>
  )
}
