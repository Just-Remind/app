import { useEffect } from "react";

const Service = (): JSX.Element => {
  // HOOKS
  useEffect(() => {
    // https://www.easycron.com/rest/[method]?token=[token]&name=value
  }, []);

  return (
    <div>
      <div>
        <label>
          Activate service
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default Service;
