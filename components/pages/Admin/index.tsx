import StarterHighlights from "./parts/StarterHighlights";

const Admin = (): JSX.Element => {
  console.log();

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">Admin view</h3>
      <StarterHighlights />
    </div>
  );
};

export default Admin;
