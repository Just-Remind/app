export const EMAIL_REGEX =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// atlest 1 lower, atleast 1 upper, atleast 1 digit OR 1 symbol and min length
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|\W)).{8,}/;
// explaination:
// (?=.*[a-z]) use positive look ahead to see if at least one lower case letter exists
// (?=.*[A-Z]) use positive look ahead to see if at least one upper case letter exists
// (?=.*(\d|\W)) use positive look ahead to see if at least one digit exists
// {8,} at least 8 length

export const MESSAGES = {
  onlyChromeSupport: (
    <p>
      To upload your books via Amazon, you need to be on a compuser using{" "}
      <a
        href="https://www.google.com/chrome/"
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 hover:text-blue-900"
      >
        Google Chrome.
      </a>
    </p>
  ),
};
