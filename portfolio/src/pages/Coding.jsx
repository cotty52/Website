import ProjectCard from '../components/ProjectCard'
import ImageSlider from '../components/ImageSlider'
import { codingProjects } from '../data/projects'

export default function Coding() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <p>
        Here are some coding projects I have done. Most of them are in python, but I have made small
        scale school projects in other languages such as Java and C. I built this website from
        scratch using HTML, CSS, and JavaScript. Larning new languages is fun for me. Getting
        familiar with how they work and what makes them different or similar to other ones I&apos;ve
        used is an enjoyable process.
        <br />
        <br />
        During my internship of summer 2024, I got a variety of programming experience. Most of my
        tasks revolved around using SQL to collect data from the server and creating automation
        scripts for others to use. I utilized PowerShell to create most of the scripts, and I would
        sometimes implement them into a website for easy access. This website used .NET 6 Razor Pages
        as its building blocks, which gave me experience with real world applications of C#, HTML,
        and CSS.
      </p>

      {codingProjects.map((project) => (
        <ProjectCard key={project.id} blurb={project.blurb} link={project.link}>
          <ImageSlider media={project.media} aspect={project.aspect} />
        </ProjectCard>
      ))}
    </div>
  )
}
