
const GeneralLoader = ({ size = 40 }) => {
  return (
    <div className="fixed top-0 left-0 z-900 flex items-center justify-center" style={{backgroundColor:"#000000ad",width:"100%",height:"100vh"}}>
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default GeneralLoader;