import React from "react";
import "./App.css";
import { ACCEPTED_FILE_TYPES,REQUIRED_IMAGE_HEIGHT,REQUIRED_IMAGE_WIDTH,SIZES_REQUIRED } from "./constants";
import CropImage from "./CropWindowImage";


class ImageApp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedFile : null,
    }
  }
  verifyImage = file => {
    const fileType = file.type;
    if (!ACCEPTED_FILE_TYPES.includes(fileType)) {
      alert("You can not upload file other than image");
      return false;
    }
    return true;
  };

  handleOnFileChange = event => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile && this.verifyImage(imageFile)) {
      const imageObject = new window.Image();
      imageObject.src = URL.createObjectURL(imageFile);
      imageObject.onload = () => {
        imageFile.naturalWidth = imageObject.naturalWidth;
        imageFile.naturalHeight = imageObject.naturalHeight;
        if (imageFile.naturalWidth === REQUIRED_IMAGE_WIDTH && imageFile.naturalHeight === REQUIRED_IMAGE_HEIGHT) {
          const reader = new FileReader()
          reader.onload = (file)=>{
            imageFile.src = file.target.result
            this.setState({
              selectedFile: imageFile
            })
          }
          reader.readAsDataURL(imageFile)
        } else {
          alert(`Image size should be exactly ${REQUIRED_IMAGE_WIDTH}*${REQUIRED_IMAGE_HEIGHT}`);
        }
      };
    }
  };


  
  render() {
    return (
      <div>
        <input
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(",")}
          multiple={false}
          onChange={this.handleOnFileChange}
        ></input>
        {this.state.selectedFile &&<div> 
          <img src={this.state.selectedFile.src} style={{width: '10rem'}} alt={this.state.selectedFile.name}></img>
          <div>{Object.keys(SIZES_REQUIRED).map((key,index)=>{
            return <CropImage imageFile={this.state.selectedFile} dimensions={SIZES_REQUIRED[key]} property={key} key={key}/>
          })}</div>
          </div>
          }
      </div>
    );
  }
}

export default ImageApp;
