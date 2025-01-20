import './App.css';
import { useState, useEffect, useRef } from "react";

const navData = [
  { id: 1, label: "Home", url: "/" },
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
  "Trauma"
]


function App() {
  const [isMobile, setIsMobile] = useState(false);
  const mobileNavRef = useRef(null);

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
  const handleNavigation = (url) => {
    const element = document.querySelector(url);
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
    <div className='bg-gray-50'>
      <header className="bg-white ">
        <div className="flex md:justify-center justify-start ml-10 md:ml-0 py-5 md:py-10">
          <div className="w-full sm:w-11/12 lg:w-5/6 xl:w-4/6 flex items-center justify-between  md:p-0 p-4 ">
            <div className="text-4xl text-gray-800 w-full md:w-64">NEW DAWN COUNSELLING</div>
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
                    className="p-1"
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
                  className="text-sm text-gray-600 hover:text-lime-700 list-none"
                >
                  <button
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
      <div className="bg-cover object-cover flex flex-col justify-center items-center h-[300px] md:h-[700px] relative">
        {/* Semi-Transparent Overlay */}
        <div className="w-full h-1/2 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="h-full w-11/12 md:w-1/4 flex justify-center items-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-kohstante_reg font-extralight text-black text-center leading-snug">
              NEW DAWN COUNSELLING
            </h1>
          </div>
        </div>
      </div>
      <div id="welcome" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl">Welcome...</h1>
          <p className="text-sm leading-relaxed">
            Welcome to New Dawn Counselling, my name is Jane. I am a humanistic therapist, which means that emphasis is given to the development of self-awareness and personal growth. Whether you are having trouble with general life problems, loneliness, or trauma, I can offer adaptive, person-centred counselling to explore the best way forward for you.
          </p>
          <p className="text-sm leading-relaxed">
            We can look at managing the symptoms of depression, anxiety, or overwhelm, whilst unpacking the thoughts and emotions that could be driving these reactions. You might choose to attend to family conflict or relationship difficulties, perhaps looking at past experiences. My job is to reflect different ways of looking at things, affecting a fresh outlook and change.
          </p>
          <p className="text-sm leading-relaxed">
            Taking this first step can be daunting. I am sensitive to keep to your pace and the depth to which you would like to go, providing short-term focused counselling or a deeper journey to self-understanding.
          </p>
        </div>
      </div>
      <div id="about-me" className="flex flex-col items-center h-auto  p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl'>
          <h1 className='text-3xl text-center'>About me...</h1>
          <div className='flex md:flex-row sm:flex-col sm:justify-center sm:items-center'>
            <img className='w-1/2' src='https://static.wixstatic.com/media/2e60ad_df1e086947284c3d9124c73f13f41c6a~mv2.jpg/v1/fill/w_848,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_6960_JPG.jpg' alt="about-me"></img>
            <div className='md:w-1/2 p-4 space-y-4'>
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
          <h1 className='text-3xl'>Why have counselling?...</h1>
          <p className=''>When we have a problem, we can become stuck in it and caught up in repetitive ways of thinking, coming to the same conclusions each time.  I am trained to go beneath the surface of the problem, helping you to gain a different response.
          </p>
          <p>
            This new perspective can be hard to reach with anyone that has an emotional connection to us.  This could be due to the holding of your distress.  They might also give unwanted advice and answers drawn out of their own life experience, or bias.  Often we just keep our emotions a secret due to feelings of being faulty.  A non-judgemental environment aids the removal of shame, providing a safe space to explore yourself. </p>
        </div>

      </div>
      <div id="services" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl'>
          <h1 className='text-3xl text-center'>My services...</h1>
          <div className='text-center space-y-2'>
            <p className='text-sm'>I am able to work from central Southampton, Dibden or Lymington, depending on availability.</p>
            <p className='text-sm'>Monday - Friday</p>

            <p className='text-sm'>Saturday mornings</p>
            <p className='text-sm'>Evening appointments available</p>
          </div>
          <div className='flex w-full md:flex-row sm:flex-col space-x-0 md:space-x-8 space-y-8 md:space-y-0'>
            <div className='basis-1/3 space-y-4 flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://static.wixstatic.com/media/nsplsh_ff6405ea500e44af91b5a26a495c51c9~mv2.jpg/v1/crop/x_912,y_0,w_3648,h_3648/fill/w_242,h_242,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20Arnaud%20Mesureur.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center'>Consultation</h1>
              <p className='text-sm'>We will have a chat over the phone initially.  This will take about 20 minutes and will help you to decide if I am the right fit for you. There is no charge for this.</p>
            </div>
            <div className='basis-1/3 space-y-4 flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://static.wixstatic.com/media/29cc911599d44d2b80a1f9177af7302f.jpg/v1/crop/x_318,y_0,w_1285,h_1285/fill/w_242,h_242,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Forest%20Trees.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center'>Individual counselling</h1>
              <p className='text-sm'>Sessions will then take place, face-to-face, on a weekly basis initially. You might then choose to progress to fortnightly or monthly sessions, at a later date. Each session is 50 minutes long, at a cost of £50.</p>
              <p className='text-sm'>I can offer single-session counselling for £60 for 60 minutes.</p>
            </div>
            <div className='basis-1/3 space-y-4  flex flex-col items-center'>
              <img className='w-32 h-32 rounded-full' src='https://static.wixstatic.com/media/11062b_02b5fed7a53c430fb3d5c1c233690a86~mv2.jpg/v1/crop/x_704,y_0,w_2584,h_2584/fill/w_242,h_242,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Trees.jpg' alt='forest-tree'></img>
              <h1 className='text-2xl text-center'>Couples counselling</h1>
              <p className='text-sm'>Couples counselling will also take place on a weekly basis, at a cost of £60 for 60 minutes. This will need to take place in Southampton.</p>
            </div>
          </div>
        </div>

      </div>
      <div id="help" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className="w-full max-w-[90rem] flex justify-center bg-[#ededed] p-6 rounded-lg">
          <div className="text-center space-y-6 max-w-4xl">
            <h1 className='text-3xl'>I can help with...</h1>
            <div className='flex sm:flex-col sm:space-y-8 lg:flex-row'>
              <img className='w-[500px]' src='https://static.wixstatic.com/media/2e60ad_38b3ce9f40574ab68070770a0178769c~mv2.jpg/v1/fill/w_692,h_586,al_c,lg_1,q_85,enc_avif,quality_auto/bcad7d3a-f0a3-4977-bf18-720dcf4a73f6%202.jpg' alt='help'></img>
              <div className='grid grid-cols-2'>
                {areas_of_support.map((item) => (
                  <p className='text-lg text-left'
                    key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      <div id="contact" className="flex flex-col items-center h-auto bg-[#f5f9e5] p-6 md:p-10 justify-center">
        <div className='text-center space-y-6 max-w-4xl md:w-full'>
          <h1 className='text-3xl'>Please do get in touch...</h1>
          <p className='text-left text-sm'>I will get back to you as soon as possible.</p>
          <form  className='text-left '>
            <div className="mb-5 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="first-name" className="block mb-2 text-sm text-black">First Name</label>
                  <input type="text" id="first-name" className="p-1 w-full border border-black" required />
                </div>
                <div className="flex-1">
                  <label htmlFor="last-name" className="block mb-2 text-sm text-black">Last Name</label>
                  <input type="text" id="last-name" className="p-1 w-full border border-black" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-black">Email</label>
                <input type="email" id="email" className="p-1 w-full border border-black" required />
              </div>
              <div className="flex justify-center items-center mt-4">
                <button className='py-2 px-8 bg-[#9db39f] text-center w-1/2'>Submit</button>
              </div>
            </div>

          </form>

        </div>

      </div>
      <div className="flex flex-col items-center h-60 p-5 justify-center">
        <div className='flex flex-col text-center space-y-4'>
          <h1 className='text-xl'>New Dawn Counselling</h1>
          <span>info@mysite.com</span>
          <span>©2024 by New Dawn Counselling.</span>
        </div>

      </div>
    </div>
  );
}

export default App;
