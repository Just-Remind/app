/* eslint-disable max-len */
import { useRef } from "react";

import { MailIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

import { Button } from "components/ui";
import emailImage from "public/email.svg";

const Landing = (): JSX.Element => {
  // REF
  const videoRef = useRef(null);

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-between py-4"
        style={{
          height: "calc(100vh - env(safe-area-inset-bottom))",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          paddingLeft: "max(12px, env(safe-area-inset-left))",
          paddingRight: "max(12px, env(safe-area-inset-right))",
        }}
      >
        <header className="w-full p-4">
          <div className="flex items-center justify-between text-white">
            <p className="text-2xl">Just Remind 📚</p>
            <Link href="/sign_in">
              <a>Sign in</a>
            </Link>
          </div>
        </header>

        <div className="z-10 flex flex-col items-center justify-center flex-1 pb-4 space-y-6">
          <h1 className="text-5xl leading-snug text-center text-white">
            You&lsquo;ll never forget about a book again.
          </h1>
          <h2 className="text-2xl leading-snug text-center text-grey-200">
            Import your Kindle highlights and receive them daily by email.
          </h2>
          <Link href="/sign_up">
            <a>
              <Button
                className="mx-auto font-bold uppercase bg-green-600 md:text-2xl hover:bg-green-700"
                size="xxl"
                color="green"
              >
                Start now
              </Button>
            </a>
          </Link>
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 -z-10" />
        <video
          ref={videoRef}
          preload="metadata"
          loop
          autoPlay
          playsInline
          muted
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            left: "0px",
            right: "0",
            top: "0",
            bottom: "0",
            objectPosition: "50%",
            zIndex: "-20",
          }}
        >
          <source
            src="https://res.cloudinary.com/dkekughgs/video/upload/c_scale,q_auto:eco,w_994/v1667290624/Coffee_-_27230_hzl7t8.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Alternating Feature Sections */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
        />
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-green-500 to-green-600">
                    <MailIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Stay inspired every day.
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Get a daily email customised to your needs, filled with inspirational quotes
                    from the books you read.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm bg-origin-border hover:bg-green-700"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <Image
                  className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={emailImage}
                  alt="email with random books highlights"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
