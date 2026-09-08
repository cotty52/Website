import { Link } from 'react-router-dom'
import ImageZoom from '../../components/ImageZoom'
import displayImg from '../../assets/Display_img.png'
import highLevelDiagram from '../../assets/High_Level_Diagram.png'
import systemSchematic from '../../assets/System_Schematic.png'

export default function SeniorProject() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-10">
      <Link to="/projects" className="link link-hover self-start text-sm">
        &larr; Back to Projects
      </Link>

      <h1 className="text-2xl font-semibold md:text-3xl">Portable Solar Power Station</h1>

      <p>
        For my senior capstone project, I collaborated with a team to develop a Portable Solar
        Power Station. This system was designed to provide reliable, off-grid power for various
        applications such as camping and emergency backup. It features both solar and wall
        charging inputs with multiple power outputs.
      </p>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">External Display</h2>
        <div className="grid items-start gap-6 md:grid-cols-[14rem_1fr]">
          <ImageZoom src={displayImg} alt="External display" className="w-full" />
          <p>
            A key component of the system was the custom external display. Built around a
            3.2-inch TFT LCD touchscreen and an ESP32 microcontroller, this display provides
            users with real-time statistics directly from the Battery Management System (BMS).
            Key metrics include the state of charge (%), total battery voltage (V), overall
            system current (A), battery temperature (&deg;F), and wattage (W).
            <br />
            <br />
            During development, we prioritized rapid data updates over full touchscreen
            functionality, as critical information was accessible on the main screen. Integrating
            the BMS&apos;s UART communication directly into our code significantly improved
            performance and update speeds.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Battery System</h2>
        <p>
          The core of our power station is a 12.8V battery pack composed of four 3.2V, 230Ah
          LiFePO4 prismatic cells. We chose LiFePO4 chemistry for its high power density and
          inherent safety and stability, especially crucial for a portable device exposed to
          varying environments. Prismatic cells offered an easier, more reliable setup compared
          to cylindrical alternatives. A significant advantage of using individual cells was the
          ability to integrate an external BMS, which provides detailed, real-time data that
          would have been inaccessible with all-in-one battery solutions.
          <br />
          <br />
          During assembly, we encountered a critical issue where the cell&apos;s thin blue rubber
          coating could rub off, exposing live bare metal. This highlighted the absolute
          necessity of properly protecting the cells with electrically insulated materials to
          prevent short circuits.
        </p>
      </section>

      <section className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl font-semibold">System Diagrams</h2>
        <p>
          These diagrams illustrate the intricate wiring of the system and show the flow of power
          between components.
        </p>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center">
          <ImageZoom src={highLevelDiagram} alt="High level diagram" className="w-full max-w-md" />
          <ImageZoom src={systemSchematic} alt="System schematic" className="w-full max-w-md" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Project Exposition</h2>
        <p>
          The project culminated in a presentation at our department&apos;s senior design
          exposition, where we demonstrated the completed power station to faculty, industry
          advisors, and representatives from partner companies. This experience taught me how to
          effectively communicate complex technical concepts to diverse audiences and receive
          valuable feedback from practicing engineers.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Future Improvements &amp; Key Learnings</h3>
        <p>
          Throughout the project, we identified several areas for future enhancements, such as
          implementing a global system switch, potentially controlled by the ESP32 to manage
          power draw, and refining the touchscreen functionality for smoother updates.
          <br />
          <br />
          This senior project was an invaluable experience that taught me the complexities of
          integrating diverse electrical and software components. I learned critical lessons in
          problem-solving, like diagnosing and resolving the inverter&apos;s grounding issue, and
          the importance of thorough component research and safety considerations, especially
          concerning exposed live metal on battery cells.
        </p>
      </section>
    </div>
  )
}
