const Landing = (): JSX.Element => {
  console.log();

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1 className="text-3xl">Remind 📚</h1>
          </div>
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <button className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
              Sign in
            </button>
          </div>
        </div>
      </header>
      <section>
        <h2 className="text-xl">
          Your daily dose of <span className="text-red-400">re</span>
          <span className="text-green-400">inspiration</span>.
        </h2>
      </section>
    </>
  );
};

export default Landing;
