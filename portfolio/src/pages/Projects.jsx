import ProjectCard from '../components/ProjectCard'
import ImageSlider from '../components/ImageSlider'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <p>
        These are some of the projects I've worked on, ranging from hands-on design and
        fabrication to software development. I really enjoy creating and building all types of
        projects, from a 3D printed battle bot to this very website, which I originally built from
        scratch using HTML, CSS, and JavaScript. I have always had a passion for learning new
        things, especially when it lets me express my creativity.
      </p>

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          blurb={project.blurb}
          link={project.link}
          moreInfo={project.moreInfo}
        >
          <ImageSlider media={project.media} aspect={project.aspect} />
        </ProjectCard>
      ))}
    </div>
  )
}
