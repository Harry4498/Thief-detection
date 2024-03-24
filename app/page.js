import ObjectDetection from "../component/object-detection.js";
export default function Home() {
  return (
    <div className=" relative flex w-full h-full justify-center flex-col  items-center ">
      <div className="">
        <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
          Thief Detection Alarm 
        </h1>
      </div>
      <div className="m-5">
        <ObjectDetection />
      </div>
    </div>
  );
}
