import { capitalizeFirstLetter } from "../../utils/functions";

interface InputBoxProps {
  id: string;
  type: string;
  setStateFunction: Function;
  state: string;
}

export default function InputBox({
  id,
  type,
  setStateFunction,
  state,
}: InputBoxProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {capitalizeFirstLetter(id)}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          onChange={(e) => setStateFunction(e.target.value)}
          value={state}
          className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        ></input>
      </div>
    </div>
  );
}
