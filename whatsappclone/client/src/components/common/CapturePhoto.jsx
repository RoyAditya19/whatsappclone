import React, { useRef, useEffect } from "react";
import {IoClose} from "react-icons/io5"

function CapturePhoto({hide, setImage}) {

     /* When the component loads, the useEffect hook initiates the process of starting the camera. 
      The function `navigator.mediaDevices.getUserMedia` is responsible for accessing the user's camera. 
      It requests video access (without audio), and once granted, the camera stream is assigned to the `srcObject` of the `videoRef` reference.
      This binds the live camera feed to the video tag(below) in the DOM, allowing the user to see the camera preview.
      The `stream` object holds the media tracks (video stream), and these tracks are stopped when the component is unmounted to release the camera.

      The `capturePhoto` function is triggered when the user clicks the button below the video feed.
      It creates a canvas element, captures the current video frame by drawing it onto the canvas using `drawImage`.
      The canvas image is then converted to a base64 URL using `canvas.toDataURL("image/jpg")`, which is passed to `setImage` to store the captured photo.
      After the image is captured, the `hide(false)` function is called to close the camera modal.
      */

  useEffect(() => {
    let stream;
    const startCamera = async()=>{
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
    };
    startCamera();
    return ()=> {
      stream?.getTracks().forEach((track)=> track.stop());
    };
  }, []);
  
  const videoRef = useRef(null);

  const capturePhoto = ()=>{
    const canvas = document.createElement("canvas")
    canvas.getContext("2d").drawImage(videoRef.current,0,0,300,150);
    setImage(canvas.toDataURL("image/jpg"))
    hide(false)
  }
  return <>
  <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <div className="pt-2 pr-2 cursor-pointer flex items-end justify-end" onClick={()=>hide(false)}>
        <IoClose className="h-10 w-10 cursor-pointer"  />
      </div>
      <div className="flex justify-center">
        <video id="video" width="400" autoPlay ref={videoRef}></video>
      </div>
      <button className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10" onClick={capturePhoto}>

      </button>
    </div>
  </div>;
  </>
}

export default CapturePhoto;
