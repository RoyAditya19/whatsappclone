import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({type,image,setImage}) {
  const [hover, setHover] = useState(false)
  const [isContentMenuVisible, setIsContentMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x:0, y:0,
  });
  const [grabPhoto, setGrabphoto] = useState(false)
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false)
  const [showCapturePhoto, setShowCapturePhoto] = useState(false)

  const showContextMenu = (e)=>{
    e.preventDefault()
    setContextMenuCordinates({x:e.pageX, y:e.pageY});
    setIsContentMenuVisible(true)
  }
  useEffect(() => {
    if(grabPhoto)
    {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e)=>{
        setTimeout(() => {
          setGrabphoto(false)
        }, 1000);
      }
    }
  }, [grabPhoto])
  

  const contextMenuOptions = [
    {name: "Take Photo", callback: () => {
      setShowCapturePhoto(true)
    } },
    {name: "Choose From Library", callback: () => {
      setShowPhotoLibrary(true)
    } },
    {name: "Upload Photo", callback: () => {
      setGrabphoto(true);
    } },
    {name: "Remove Photo", callback: () => {
      setImage("/default_avatar.png")
    } },
  ];

  //the below code in photopickerchange is actually storing the image file as base64. it's not the best way to store the images but it is also a 
  // way to store the image. generally we should upload the image in our servers and not in this way. it's just for learning purpose.
  const photoPickerChange = async (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img")
    reader.onload=function(event){
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result)
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src)
    }, 100);
  };
  return <>
  <div className="flex items-center justify-center">
    { type === "sm" && (
    <div className="relative h-10 w-10">
      <Image src={image} alt="avatar" className="rounded-full" fill/>
    </div>
      )}

    { type === "lg" && (
    <div className="relative h-14 w-14">
      <Image src={image} alt="avatar" className="rounded-full" fill/>
    </div>
      )}
      {
          /*
          When the user clicks on "Change Profile Photo" in the `Avatar` component, the `isContentMenuVisible` state is updated to `true`. 
          This change triggers the rendering of the `ContextMenu` component, which displays a context menu with various options. The options are dynamically generated and passed as props to the `ContextMenu`. 
          Each option in the menu is linked to a specific callback function. When the user selects an option from the context menu, the `handleClick` function within the `ContextMenu` component is executed. 
          This function first stops the propagation of the click event to prevent it from affecting other elements. It then sets the `isContentMenuVisible` state to `false`, thereby hiding the context menu. 
          After closing the menu, the function calls the callback associated with the selected option, which handles the specific action chosen by the user.
          For instance, if the user selects the "Upload Photo" option, the callback function sets `setGrabphoto(true)`. This action updates the `grabPhoto` state in the `Avatar` component. 
          The `useEffect` hook within the `Avatar` component is configured to monitor changes to the `grabPhoto` state. When it detects that `grabPhoto` has been set to `true`, it programmatically triggers a click event on a hidden file input element. 
          This file input element is managed by the `PhotoPicker` component, which is responsible for rendering the file input field within the DOM. This hidden input allows the user to select an image file from their device.
          When a user selects a file, the `onChange` event of the file input is triggered, invoking the `photoPickerChange` function. This function is responsible for processing the selected file. 
          It uses the `FileReader` API to read the file's content and convert it into a base64-encoded data URL. The `FileReader` asynchronously reads the file as a data URL, 
          which is a string representation of the file's binary data encoded in base64 format. Once the file is successfully read, the `photoPickerChange` function updates the `image` state in the `Avatar` component with this base64 data URL, allowing the `Avatar` component to display the newly selected image.
          */
      }
    { type === "xl" && (
    <div className="relative cursor-pointer z-0"
    onMouseEnter={()=>setHover(true)}
    onMouseLeave={()=>setHover(false)}
    >
      <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 ${hover?"visible":"hidden"}`} onClick={e=>showContextMenu(e)} id="context-opener" >
        <FaCamera className="text-2xl" id="context-opener" onClick={(e)=> showContextMenu(e)} />
        <span onClick={(e)=> showContextMenu(e)} id="context-opener">Change <br/> Profile <br/> Photo</span>
      </div>
      <div className="flex items-center justify-center h-60 w-60">
        <Image src={image} alt="avatar" className="rounded-full" fill/>
      </div>
    </div>
      )}
  </div>
  {
    isContentMenuVisible && (<ContextMenu
     options={contextMenuOptions}
     cordinates={contextMenuCordinates}
     ContextMenu={isContentMenuVisible}
     setContextMenu={setIsContentMenuVisible}
     />
  )}
  {showCapturePhoto && <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />}
  {showPhotoLibrary && <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />}
  {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
  </>;
}

export default Avatar;
