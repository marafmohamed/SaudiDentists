import { FC, ReactNode, useState, MouseEvent } from "react";

interface PopconfirmProps {
  title: string;
  onConfirm: () => void;
  children: ReactNode;
}

const Popconfirm: FC<PopconfirmProps> = ({ title, onConfirm, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = async () => {
    onConfirm();
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  return (
    <div className="inline-block ">
      <div onClick={() => setIsVisible(true)} className="inline-block cursor-pointer">
        {children}
      </div>
      {isVisible && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className=" bg-custom-greenPrimary text-white px-4 py-2 rounded-md hover:bg-custom-greenLight"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popconfirm;
