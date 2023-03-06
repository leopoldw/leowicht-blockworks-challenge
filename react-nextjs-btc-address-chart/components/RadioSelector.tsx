const RadioSelector = ({ values, value, onChange }) => (
    <div className="grid justify-items-center">
  <div className="bg-slate-200 rounded-md inline-block p-2 mt-7">
    <div className="flex">
      {values.map((unitValue) => (
        <div
          onClick={() => onChange(unitValue)}
          className={`${
            value === unitValue
              ? "bg-slate-600 text-white"
              : "cursor-pointer hover:bg-slate-300"
          } rounded-md py-2 px-3 mr-2 last-of-type:mr-0`}
        >
          {unitValue}
        </div>
      ))}
    </div>
  </div>
  </div>
);

export default RadioSelector;