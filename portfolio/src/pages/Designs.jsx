import ProjectCard from '../components/ProjectCard'
import ImageSlider from '../components/ImageSlider'
import { designProjects } from '../data/projects'

export default function Designs() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <p>
        These are some projects I have worked on that involved design and creation. I really enjoy
        creating and working on all types of projects, ranging from 3D printed battle bot, to hands
        on work, to this very website. I have always had a passion for learning new things,
        especially if it allows me to express my creativity.
      </p>

      {designProjects.map((project) => (
        <ProjectCard key={project.id} blurb={project.blurb} link={project.link}>
          <ImageSlider media={project.media} aspect={project.aspect} />
        </ProjectCard>
      ))}
    </div>
  )
}
