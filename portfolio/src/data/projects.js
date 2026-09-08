import idleBounceVideo from '../assets/Idle_Bounce.mp4'
import displayImg from '../assets/Display_img.png'
import bottyFront from '../assets/BOTTY_front.png'
import bottyBack from '../assets/BOTTY_back.png'
import bottySide from '../assets/BOTTY_side.png'
import carSide from '../assets/Car_Side.png'
import carBack from '../assets/Car_Back.png'
import carFront from '../assets/Car_Front.png'
import welding from '../assets/Welding.png'
import angle1 from '../assets/Angle-1.png'
import angle2 from '../assets/Angle-2.png'
import top from '../assets/Top.png'
import poster from '../assets/Poster.png'
import arduinoVideo from '../assets/Arduino_Video.mp4'

/*
  The project cards are structurally identical — a blurb plus one or more
  media items — so they live as data and the page just maps over them.
  Assets are imported (not referenced by path) so Vite verifies them at build
  time and content-hashes the output filenames.
*/

export const projects = [
    {
    id: 'senior-project',
    blurb:
      'For my senior project, I worked with a group of four to create a portable solar power station. One aspect of the project I worked on was the external display. Shown below, it allows users to view statistics about the battery like the state of charge, battery voltage, overall wattage, etc. We used an ESP32 microcontroller to run the code for the SPI display.',
    aspect: 'aspect-square',
    media: [{ type: 'image', src: displayImg, alt: 'external-display' }],
  },
  {
    id: 'formula',
    blurb:
    "I am part of Binghamton's Formula SAE club, where many students work in teams to design and bring to life a Formula-1 inspired race car. In my junior year, I was part of the Frame subteam. I was able to do a lot of CAD design and hands on work. I also learned how to weld from industry professionals. In my senior year, I was part of the Accumulator subteam, where I worked on the battery pack for the car.",
    link: { href: 'https://binghamtonmotorsports.com/', label: 'Binghamton Motorsports' },
    aspect: 'aspect-square',
    media: [
      { type: 'image', src: carSide, alt: 'car-side' },
      { type: 'image', src: carBack, alt: 'car-back' },
      { type: 'image', src: carFront, alt: 'car-front' },
      { type: 'image', src: welding, alt: 'welding' },
    ],
  },
  {
    id: 'botty',
    blurb:
      "This is BOTTY, a 3D printed battlebot created to compete in Binghamton's Watson Combat Robotics League (WCRL)",
    aspect: 'aspect-square',
    media: [
      { type: 'image', src: bottyFront, alt: 'botty-front' },
      { type: 'image', src: bottyBack, alt: 'botty-back' },
      { type: 'image', src: bottySide, alt: "botty-side :'(" },
    ],
  },
  {
    id: 'arduino',
    blurb:
      'This is a group project for an engineering class where we created a simple Simon Says game using Arduino. The project had to include a theme. Our theme centered around aliens, and we were conspiracy theorists who built an alien comunication device in a garage, hence why it looks dishevelled.',
    aspect: 'aspect-square',
    media: [
      { type: 'image', src: angle1, alt: 'angle-1' },
      { type: 'image', src: angle2, alt: 'angle-2' },
      { type: 'image', src: top, alt: 'Top' },
      { type: 'image', src: poster, alt: 'poster' },
      { type: 'video', src: arduinoVideo, alt: 'arduino simon says demo' },
    ],
  },
  {
    id: 'idle-screen',
    blurb:
      'This is a python script that allows you to input an image and it creates a bouncing idle screen from it, like the classic DVD logo.',
    aspect: 'aspect-video',
    media: [{ type: 'video', src: idleBounceVideo, alt: 'idle bounce screen demo' }],
  },
]
