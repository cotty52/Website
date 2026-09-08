import ProjectCard from '../components/ProjectCard'
import ImageSlider from '../components/ImageSlider'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <p>
        These are some of the projects I&apos;ve worked on, ranging from hands-on design and
        fabrication to software development. I really enjoy creating and building all types of
        projects, from a 3D printed battle bot to this very website, which I originally built from
        scratch using HTML, CSS, and JavaScript. I have always had a passion for learning new
        things, especially when it lets me express my creativity.
        <br />
        <br />
        On the software side, most of my projects are in Python, with some smaller school projects
        in Java and C. Learning new languages is fun for me &mdash; getting familiar with how they
        work and what makes them different or similar to ones I&apos;ve used is an enjoyable
        process.
        <br />
        <br />
        During my internship in the summer of 2024, I got a variety of programming experience. Most
        of my tasks revolved around using SQL to collect data from the server and creating
        automation scripts for others to use. I utilized PowerShell to create most of the scripts,
        and would sometimes implement them into a website for easy access. This website used .NET 6
        Razor Pages as its building blocks, which gave me experience with real world applications of
        C#, HTML, and CSS.
      </p>

      {projects.map((project) => (
        <ProjectCard key={project.id} blurb={project.blurb} link={project.link}>
          <ImageSlider media={project.media} aspect={project.aspect} />
        </ProjectCard>
      ))}
    </div>
  )
}
