import { useState, useEffect } from "react";

import { Link } from "@tanstack/react-location";
import { Auth } from "aws-amplify";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  // STATE
  const [userId, setUserId] = useState<number>(-1);

  // NEXT ROUTER
  const router = useRouter();

  // HOOKS
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const id = Number(localStorage.getItem("userId"));
      setUserId(id);
    }
  }, []);

  // METHODS
  const handleLogout = (): void => {
    Auth.signOut()
      .then(() => router.push("/landing"))
      .catch((error) => alert(error));
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b-2 border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <h1 className="text-3xl">Just Remind 📚</h1>
          </Link>
        </div>
        <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          {userId ? (
            <button
              onClick={handleLogout}
              className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
            >
              Log out
            </button>
          ) : (
            <>
              <NextLink href="/login">
                <a className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
                  Sign in
                </a>
              </NextLink>
              <NextLink href="/signup">
                {/* eslint-disable-next-line max-len */}
                <a className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
                  Sign up
                </a>
              </NextLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
