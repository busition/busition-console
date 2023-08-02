import { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
}

const SmallMenuModal = ({ isOpen, children }: PropsWithChildren<Props>) => {
  return (
    <>
      {isOpen && (
        <div className="w-[100px] absolute bottom-[-50px] right-[0px] bg-white flex z-0 rounded shadow-md">
          {children}
        </div>
      )}
    </>
  );
};

export default SmallMenuModal;
