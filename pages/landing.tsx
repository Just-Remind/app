import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Button, DropdownMenu, Input } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";

type LoginForm = {
  email: string;
  password: string;
};

const Landing = (): JSX.Element => {
  // NEXT ROUTER
  const router = useRouter();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // METHODS
  const handleSignIn = ({
    email,
    password,
  }: LoginForm): Promise<boolean | void> =>
    Auth.signIn(email, password)
      .then(() => router.push("/"))
      .catch((err) => alert(err));

  const openSignUpModal = (): void => {};

  return (
    <div className="w-5/6 mx-auto">
      <header className="bg-white border-gray-100">
        <div className="flex items-center justify-between px-6 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1 className="text-3xl">Remind 📚</h1>
          </div>
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <DropdownMenu button="Sign in">
              <div className="flex flex-col justify-center mt-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleSignIn)}
                  >
                    <Input
                      {...register("email", {
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "Please enter a valid email.",
                        },
                      })}
                      label="Email address"
                      placeholder="john.doe@example.com"
                      required
                      type="email"
                      error={errors.email?.message}
                    />
                    <Input
                      {...register("password", {
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters.",
                        },
                        pattern: {
                          value: PASSWORD_REGEX,
                          message:
                            "Requires at least one capital, one digit or one symbol.",
                        },
                      })}
                      required
                      label="Password"
                      type="password"
                      error={errors.password?.message}
                    />

                    <div className="flex flex-col items-center justify-between space-y-4">
                      <Button
                        type="submit"
                        className="w-full"
                        loading={isSubmitting}
                      >
                        Sign in
                      </Button>

                      <div className="text-sm">
                        <Link href="/reset-password">
                          <a className="px-6 font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap">
                            Forgot your password?
                          </a>
                        </Link>
                      </div>

                      <div className="text-sm">
                        <button
                          onClick={openSignUpModal}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <section className="text-center">
        <h2 className="pt-8 pb-2 pl-8 pr-8 text-5xl font-bold">
          Your daily dose of <span className="text-red-500">re</span>
          <span className="text-green-500">inspiration</span>
        </h2>
        <p className="text-xl">
          Get your Kindle highlights delivered by email everyday, for free! 👌
        </p>
      </section>
    </div>
  );
};

export default Landing;
