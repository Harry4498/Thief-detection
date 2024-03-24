"use client";

import React, { useEffect, useState, useRef } from "react";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/renderPrediction";

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runCoco = async () => {
      setIsLoading(true);
      const model = await cocoSSDLoad();
      setIsLoading(false);

      const detectObjects = async () => {
        if (
          canvasRef.current &&
          webcamRef.current !== null &&
          webcamRef.current.video?.readyState === 4
        ) {
          canvasRef.current.width = webcamRef.current.video.videoWidth;
          canvasRef.current.height = webcamRef.current.video.videoHeight;

          const detectedObjects = await model.detect(
            webcamRef.current.video,
            undefined,
            0.6
          );
          console.log(detectedObjects);
          const context = canvasRef.current.getContext("2d");
          renderPredictions(detectedObjects, context);
        }
      };

      detectObjects();
      const detectInterval = setInterval(detectObjects, 500);

      return () => clearInterval(detectInterval);
    };

    runCoco();
  }, []);

  return (
    <div className="mt-8 h-full w-full ">
      {isLoading ? (
        <div className=" gradient-title">Loading AI Model.... </div>
      ) : (
        <div className="  flex justify-center items-center gradient p-1.5 rounded-md h-full w-full m-10 ">
          <Webcam
            className=" relative rounded-md h-full w-full"
            muted
            ref={webcamRef}
          />
          <canvas
            ref={canvasRef}
            className=" absolute flex flex-col top-0 left-0 z-999 "
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
