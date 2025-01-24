import './App.css';
import { useState, useEffect, useRef } from "react";
import Contact from "./Contact"; // Import the Contact component

const navData = [
  { id: 1, label: "Home", url: "#home" },
  { id: 2, label: "Welcome", url: "#welcome" },
  { id: 3, label: "About Me", url: "#about-me" },
  { id: 4, label: "Why have counselling", url: "#why" },
  { id: 5, label: "My Services", url: "#services" },
  { id: 6, label: "I can help with", url: "#help" },
  { id: 7, label: "Contact me", url: "#contact" },
];

const areas_of_support = [
  "Abuse",
  "Addiction",
  "ADHD",
  "Anxiety",
  "Attachment Disorder",
  "Hoarding Disorder",
  "Bereavement",
  "OCD/Rumination",
  "Loneliness",
  "Low Self-Confidence",
  "Low Self-Esteem",
  "Work Related Issues",
  "Panic Attacks",
  "Physical Abuse",
  "Bullying",
  "Depression",
  "Disabilities",
  "Emotional Abuse",
  "Family Issues",
  "Feeling Sad",
  "Generalised Anxiety Disorder",
  "Burnout",
  "Communication",
  "Redundancy",
  "Sexual Abuse",
  "Stress",
  "Suicidal Thoughts",
  "Trauma",
]


function App() {
  const [isMobile, setIsMobile] = useState(false);
  const mobileNavRef = useRef<any>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint for mobile (e.g., 768px for mobile)
    };

    // Check on initial load
    checkIfMobile();

    // Re-check on window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  const handleNavigation = (url: string): void => {
    // Get the element corresponding to the provided URL selector
    const element = document.querySelector<HTMLElement>(url);

    if (element) {
      // Check if it's mobile and whether the navigation menu is open
      const mobileNavHeight = (mobileNavRef.current && isMobile) ? mobileNavRef.current.offsetHeight : 0;

      // For mobile, scroll accounting for mobileNavHeight, otherwise just scroll to the element
      window.scrollTo({
        top: element.offsetTop - mobileNavHeight, // Adjust scroll for mobile, no adjustment for desktop
        behavior: 'smooth',
      });

      // Close the mobile navigation menu after scroll
      if (isMobile) {
        setIsDropdownOpen(false);
      }
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    console.log("Button clicked");
    setIsDropdownOpen((prevState) => !prevState);
  };


  return (
    <div>
      <header className="bg-white ">
        <div className="flex md:justify-center justify-start ml-10 md:ml-0 py-5 md:py-10">
          <div className="w-full md:w-11/12 lg:w-5/6 xl:w-4/6 flex items-center justify-between  md:p-0 p-4 ">
            <div className="text-4xl text-gray-800 w-full md:w-64 font-trirong_reg">NEW DAWN COUNSELLING</div>
            <section className="flex mobile-nav-icon justify-end mr-3">
              <button
                onClick={toggleDropdown}
                className="flex justify-center items-center w-12 h-12 bg-transparent border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5em"
                  height="2.5em"
                  className=" stroke-gray-400  fill-gray-100 opacity-80"
                  viewBox="0 0 24 24"
                >
                  {isDropdownOpen ? (
                    // Close (X) icon
                    <path
                      fill="currentColor"
                      d="M6 6L18 18M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    // Hamburger menu icon
                    <path
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 17h14M5 12h14M5 7h14"
                    />
                  )}
                </svg>
              </button>
            </section>
          </div>
        </div>
        <div className="bg-gray-100 desktop-navbar flex justify-center py-2">
          <div className='sm:w-11/12 lg:w-5/6 xl:w-4/6'>
            {/* Desktop Navigation */}
            <nav className="flex space-x-8">
              {navData.map((item) => (
                <li
                  key={item.id}
                  className="lg:text-sm md:text-xs text-gray-600 hover:text-lime-700 list-none"
                >
                  <button
                    className="p-1 font-trirong_reg"
                    onClick={() => handleNavigation(item.url)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </nav>
          </div>

        </div>
      </header>
      {/* Mobile  Navigation */}
      {isDropdownOpen && (
        <div ref={mobileNavRef} className="mobile-menu w-full z-10">
          <nav className=" bg-gray-100 flex flex-col items-center p-2 rounded-2xl divide-y divide-gray-400">
            <ul className="flex flex-col w-full space-y-4 text-white p-4">
              {navData.map((item) => (
                <li
                  key={item.id}
                  className="text-sm text-gray-600 hover:text-lime-700 list-none font-trirong_reg"
                >
                  <button className='w-full text-left py-1 px-1'
                    onClick={() => handleNavigation(item.url)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <div id="home" className="bg-cover object-cover flex flex-col justify-center items-center h-[300px] md:h-[700px] relative">
        {/* Semi-Transparent Overlay */}
        <div className="w-full h-1/2 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="h-full w-11/12 md:w-1/4 flex justify-center items-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-trirong_reg font-extralight text-black text-center leading-snug">
              NEW DAWN COUNSELLING
            </h1>
          </div>
        </div>
      </div>
      <div id="welcome" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl  font-trirong_reg">Welcome...</h1>
          <p className="text-sm leading-relaxed font-trirong_light">
            Welcome to New Dawn Counselling, my name is Jane. I am a humanistic therapist, which means that emphasis is given to the development of self-awareness and personal growth. Whether you are having trouble with general life problems, loneliness, or trauma, I can offer adaptive, person-centred counselling to explore the best way forward for you.
          </p>
          <p className="text-sm leading-relaxed font-trirong_light">
            We can look at managing the symptoms of depression, anxiety, or overwhelm, whilst unpacking the thoughts and emotions that could be driving these reactions. You might choose to attend to family conflict or relationship difficulties, perhaps looking at past experiences. My job is to reflect different ways of looking at things, affecting a fresh outlook and change.
          </p>
          <p className="text-sm leading-relaxed font-trirong_light">
            Taking this first step can be daunting. I am sensitive to keep to your pace and the depth to which you would like to go, providing short-term focused counselling or a deeper journey to self-understanding.
          </p>
        </div>
      </div>
      <div id="about-me" className="flex flex-col items-center h-auto  p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl'>
          <h1 className='text-3xl text-center  font-trirong_reg'>About me...</h1>
          <div className='flex md:flex-row sm:flex-col sm:justify-center sm:items-center'>
            <img className='w-1/2' src='https://fsn1.your-objectstorage.com/nev/new-dawn/jane.jpg' alt="about-me"></img>
            <div className='md:w-1/2 p-4 space-y-4  font-trirong_light'>
              <p>I have always had an interest in human health in a general sense, and an appetite for anything of a psychological nature.  Since qualifying with Middlesex University, I have gained my experience working for charities specialising in trauma and abuse.  I have also undertaken research into burnout and overwhelm.  I have a particular interest in relationship challenges, and have extensive experience around attachment therapy, abusive or otherwise.
              </p>
              <p>
                I am constantly developing my knowledge with continuous study and am a member of the Hampshire Association for Counselling and Psychotherapy (HACP).
              </p>
              <p>
                I am a registered member of the British Association for Counselling and Psychotherapy (BACP), engaging with supervision of my client work that is compliant with their code of ethics.
              </p>

              <p>
                I hold an enhanced DBS, and am registered with the ICO, complying with the Data Protection Act.</p>
            </div>
          </div>
        </div>

      </div>
      <div id="why" className="flex flex-col items-center h-auto bg-[#d6deb4] p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl'>
          <h1 className='text-3xl  font-trirong_reg'>Why have counselling?...</h1>
          <p className='font-trirong_light'>When we have a problem, we can become stuck in it and caught up in repetitive ways of thinking, coming to the same conclusions each time.  I am trained to go beneath the surface of the problem, helping you to gain a different response.
          </p>
          <p className='font-trirong_light'>
            This new perspective can be hard to reach with anyone that has an emotional connection to us.  This could be due to the holding of your distress.  They might also give unwanted advice and answers drawn out of their own life experience, or bias.  Often we just keep our emotions a secret due to feelings of being faulty.  A non-judgemental environment aids the removal of shame, providing a safe space to explore yourself. </p>
        </div>

      </div>
      <div id="services" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl'>
          <h1 className='text-3xl text-center  font-trirong_reg'>My services...</h1>
          <div className='text-center'>
            <p className='text-sm font-trirong_light'>I am able to work from central Southampton, Dibden or Lymington, depending on availability.</p>
            <p className='text-sm font-trirong_light'>Monday - Friday</p>

            <p className='text-sm font-trirong_light'>Saturday mornings</p>
            <p className='text-sm font-trirong_light'>Evening appointments available</p>
          </div>
          <div className='flex w-full md:flex-row sm:flex-col space-x-0 md:space-x-8 space-y-8 md:space-y-0'>
            <div className='basis-1/3 space-y-4 flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://fsn1.your-objectstorage.com/nev/new-dawn/Image-by-Arnaud-Mesureu.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center font-trirong_reg'>Consultation</h1>
              <p className='text-sm font-trirong_light'>We will have a chat over the phone initially.  This will take about 20 minutes and will help you to decide if I am the right fit for you. There is no charge for this.</p>
            </div>
            <div className='basis-1/3 space-y-4 flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://fsn1.your-objectstorage.com/nev/new-dawn/Forest-Tree.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center font-trirong_reg'>Individual counselling</h1>
              <p className='text-sm font-trirong_light'>Sessions will then take place, face-to-face, on a weekly basis initially. You might then choose to progress to fortnightly or monthly sessions, at a later date. Each session is 50 minutes long, at a cost of £50.</p>
              <p className='text-sm font-trirong_light'>I can offer single-session counselling for £60 for 60 minutes.</p>
            </div>
            <div className='basis-1/3 space-y-4  flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://fsn1.your-objectstorage.com/nev/new-dawn/Trees.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center font-trirong_reg'>Couples counselling</h1>
              <p className='text-sm font-trirong_light'>Couples counselling will also take place on a weekly basis, at a cost of £60 for 60 minutes. This will need to take place in Southampton.</p>
            </div>
          </div>
        </div>

      </div>
      <div id="help" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className="w-full max-w-[100rem] flex justify-center bg-[#ededed] p-6 rounded-lg">
          <div className="text-center space-y-4 max-w-6xl">
            <h1 className='text-3xl font-trirong_reg'>I can help with...</h1>
            <div className='flex sm:flex-col space-y-8 lg:flex-row'>
              <img className='w-[500px]' src='https://fsn1.your-objectstorage.com/nev/new-dawn/bcad7d3a-f0a3-4977-bf18-720dcf4a73f6.jpg' alt='help'></img>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {areas_of_support.map((item) => (
                  <p className='text-left font-trirong_light'
                    key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      <Contact />
      <div className="flex flex-col items-center h-60 p-6 md:p-10 justify-center">
        <div className='flex flex-col text-center space-y-4'>
          <h1 className='text-xl  font-trirong_reg'>New Dawn Counselling</h1>
          <span className='font-trirong_light'>newdawncounselling.info@gmail.com</span>
        </div>

      </div>
    </div>
  );
}

export default App;
