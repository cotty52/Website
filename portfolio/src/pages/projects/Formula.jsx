import { Link } from 'react-router-dom'
import ImageZoom from '../../components/ImageZoom'
import formulaCar from '../../assets/Formula_Car_Full.jpg'
import accumulatorTop from '../../assets/accumulator_top.jpg'
import welding from '../../assets/Welding.png'

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
        a member of the Formula team, I have gained a lot of hands-on experience in engineering,
        design, and teamwork.
      </p>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">2025 Formula SAE Electric &mdash; Michigan</h2>
        <p>
          In June 2025, our team traveled to Michigan International Speedway in Brooklyn, MI to
          compete in Formula SAE Electric, a week-long collegiate engineering competition with up
          to 100 teams. We qualified for the event, and I made the trip with the team. Industry
          professionals evaluated every part of the car against strict technical guidelines,
          starting with a multi-stage technical inspection that a car must clear before it can run 
          on track. We didn&apos;t pass every inspection, but the week was a great experience. 
          We learned a lot about designing to a rulebook, and we came home with a clear list of 
          what to improve next season.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Accumulator Sub-team (2024&ndash;25)</h2>
        <div className="grid items-start gap-6 md:grid-cols-[14rem_1fr]">
          <ImageZoom
            src={accumulatorTop}
            alt="Top view of the accumulator's battery modules and wiring"
            className="mx-auto w-full max-w-xs md:max-w-none"
          />
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              I helped assemble, wire, and maintain the high-voltage battery system for our
              electric formula car: 8 series modules of 21700 Li-ion cells (12S4P each, 43.2V,
              16Ah), for a total of 345.6V.
            </li>
            <li>
              I designed a PCB fuse board in Fusion360 for the individual battery modules, routing
              sense wires to the battery management system.
            </li>
            <li>
              I programmed C++ diagnostic firmware for an STM32 microcontroller to demonstrate
              flash memory manipulation and data communication with technician systems.
            </li>
            <li>
              I made sure the system met FSAE safety regulations, and documented data logs and
              schematics so future members can update the PCB and firmware.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Frame Sub-team (2023&ndash;24)</h2>
        <div className="grid items-start gap-6 md:grid-cols-[1fr_14rem]">
          <ul className="flex list-disc flex-col gap-2 pl-6">
            <li>
              I worked with a team of six to engineer and fabricate the vehicle frame, using
              welding and machining to ensure precision and structural integrity.
            </li>
            <li>
              I modeled frame components in SOLIDWORKS to make sure they fit with the other
              subsystems.
            </li>
            <li>
              I coordinated with other sub-teams to stay within budget, and we completed the frame
              ahead of the competition deadline.
            </li>
          </ul>
          <ImageZoom
            src={welding}
            alt="Team members welding the formula car frame"
            className="mx-auto w-full max-w-xs md:max-w-none"
          />
        </div>
      </section>
    </div>
  )
}
