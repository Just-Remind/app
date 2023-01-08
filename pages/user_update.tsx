import { useEffect } from "react";

import CryptoJS from "crypto-js";
import Link from "next/link";
import { parse } from "query-string";

import { Switch } from "components/ui";
import { useEditHighlightEnabled, useGetHighlight } from "services/highlights";
import { useToast } from "utils/hooks";

type Error = {
  response: {
    data: string;
  };
};

const UserUpdate = (): JSX.Element => {
  // QUERY PARAMS
  const decode = decodeURIComponent(location.search.slice(1));
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  let decrypted;
  if (key) decrypted = CryptoJS.AES.decrypt(decode, key);

  let result;
  if (decrypted) result = decrypted.toString(CryptoJS.enc.Utf8);

  if (!result) location.href = "/";

  const parsed = parse(result as string) as {
    user: string;
    id: string;
  };
  const { user, id } = parsed;

  // RQ
  const { data: highlight, isLoading } = useGetHighlight(Number(id));
  const { mutate: editHighlightEnabled, isSuccess, error } = useEditHighlightEnabled();

  // HOOK
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    editHighlightEnabled({ id: Number(id), enabled: false, user });
  }, [editHighlightEnabled, id, user]);

  useEffect(() => {
    if (isSuccess) {
      setToast({
        message: `Your highlight has been ${highlight?.enabled ? "activated" : "deactivated"}`,
      });
    }
  }, [highlight, isSuccess, setToast, clearToast]);

  // METHODS
  const handleEditHighlightEnabled = (checked: boolean): void => {
    clearToast();
    editHighlightEnabled({ id: Number(id), enabled: checked });
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <h1 className="text-3xl">Just Remind 📚</h1>
              </a>
            </Link>
          </div>
        </div>
      </header>
      {toast}
      <div>
        <div className="w-4/5 px-6 pt-6 pb-2 mx-auto mt-6 border rounded shadow border-gray-50">
          {isLoading && <p>Loading...</p>}
          {!isLoading && error && <p className="text-red-700">{(error as Error).response.data}</p>}
          {!isLoading && highlight && (
            <>
              <p className="text-gray-700">{highlight.content}</p>
              <div className="flex justify-between pt-2 mt-4 space-x-2 border-t">
                <Switch
                  label="Include in daily email"
                  labelClassName="mr-2 text-gray-500"
                  checked={highlight.enabled}
                  onChange={handleEditHighlightEnabled}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
