import {CiImageOn} from "react-icons/ci";

const BottomKeyboardBar = ({
                             onImageChange,
                             // onLocationChange,
                           }: {
  onImageChange: (file: File) => void;
  // onLocationChange?: (location: { lat: number; lng: number }) => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 text-2xl shadow-inner px-2">
      <div className="flex justify-between items-center border-t dark:border-gray-800 py-1.5 border-gray-100">
        <div className="flex items-center justify-start gap-5">
          <div>
            <input
              type="file"
              id="upload"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onImageChange(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="upload" className="text-black dark:text-white cursor-pointer">
              <CiImageOn/>
            </label>
          </div>
          {/*<button*/}
          {/*  className="cursor-pointer text-black dark:text-white"*/}
          {/*  type='button'*/}
          {/*  onClick={() => {*/}
          {/*    if (!navigator.geolocation) {*/}
          {/*      alert("위치 정보 사용이 불가능한 브라우저입니다.");*/}
          {/*      return;*/}
          {/*    }*/}

          {/*    navigator.geolocation.getCurrentPosition(*/}
          {/*      (position) => {*/}
          {/*        const {latitude, longitude} = position.coords;*/}
          {/*        console.log("위치 정보:", latitude, longitude);*/}
          {/*        onLocationChange?.({lat: latitude, lng: longitude});*/}
          {/*      },*/}
          {/*      (error) => {*/}
          {/*        alert("위치 정보를 가져오지 못했습니다: " + error.message);*/}
          {/*      }*/}
          {/*    );*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <CiLocationOn/>*/}
          {/*</button>*/}

        </div>
      </div>
    </div>
  );
};

export default BottomKeyboardBar;