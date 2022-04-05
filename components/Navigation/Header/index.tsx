import { useState, useEffect } from 'react';

const Header = (): JSX.Element => {
  // STATE
  const [userId, setUserId] = useState<number>(-1);

  // HOOKS
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      const id = Number(localStorage.getItem('userId'))
      setUserId(id);
    }
  }, []);

  return (
    <div className="relative px-4 bg-white sm:px-6">
      <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <h1 className="text-3xl">Remind 📚</h1>
          </a>
        </div>
        <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          {userId ? (
            <a
              href="#"
              className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
            >
              Log out
            </a>
          ) : (
            <>
              <a href="#" className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
                Sign in
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
