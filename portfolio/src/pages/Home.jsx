import ImageZoom from '../components/ImageZoom'
import canyon from '../assets/Canyon.png'
import donut from '../assets/Donut.png'

export default function Home() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-12">
      <p>
        Hello, welcome to my website! My name is Christian and I am an engineering student studying
        at Binghamton University. I am currently a senior computer engineering major and am on track
        to graduate with my masters in May of 2026.
        <br />
        <br />
        Balancing academics with hands-on experience, I&apos;m actively involved in clubs such as the
        Society of Automotive Engineers and Watson Combat Robotics League. These clubs have honed my
        teamwork and project management skills. This past summer, I had the opportunity to intern at
        New York State&apos;s ITS department, where I collaborated with experienced developers on
        server maintenance and system automation projects.
      </p>

      <section className="grid items-center gap-6 md:grid-cols-[10rem_1fr]">
        <ImageZoom src={canyon} alt="canyon" className="w-full" />
        <p>
          When I&apos;m not coding or building robots, I enjoy exploring the world with my family. In
          the summer of 2023, we went out west to visit national parks and to see amazing natural
          creations, like the Grand Canyon.
        </p>
      </section>

      <section className="grid items-center gap-6 md:grid-cols-[1fr_10rem]">
        {/*
          On mobile the image should still come first, matching the section
          above, so it is ordered ahead of the text until the md breakpoint.
        */}
        <ImageZoom src={donut} alt="sad" className="w-full md:order-2" />
        <p className="md:order-1">
          I love learning about anything technology related. Current news about recent tech
          developments, how different computer parts work, or even learning different programs to try
          them out. I had a lot of fun using the 3D modeling software Blender at one point, and this
          is a rendering of a scene I created from scratch following a tutorial.
        </p>
      </section>
    </div>
  )
}
