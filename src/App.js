import './App.css';

const navData = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Welcome", url: "/about" },
  { id: 3, label: "About Me", url: "/services" },
  { id: 4, label: "Why have counselling", url: "/contact" },
  { id: 5, label: "My Services", url: "/contact" },
  { id: 6, label: "I can help with", url: "/contact" },
  { id: 7, label: "Contact me", url: "/contact" },
];

function App() {
  return (
    <div className='h-screen'>
      <header className="bg-white ">
        <div className="py-2 flex justify-center my-10">
          <div className="w-4/6">
            {/* Logo */}
            <div className="text-3xl text-gray-800 w-40">NEW DAWN COUNSELLING</div>
          </div>
        </div>
        <div className="bg-gray-200 flex justify-center py-1.5">
          <div className='w-4/6'>
            {/* Navigation */}
            <nav className="flex space-x-8">
              {navData.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="text-sm text-gray-600 hover:text-blue-500"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

        </div>
      </header>
      <div className="bg-cover  object-cover flex flex-col justify-center items-center h-[600px]">
        <div className=" w-full h-1/2 bg-white bg-opacity-50 flex justify-center items-center"
        >
          <div className='h-full w-1/4 flex justify-center items-center'>
            <h1 className="text-7xl font-extralight text-black text-center">
              NEW DAWN COUNSELLING
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
