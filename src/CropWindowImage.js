import React from "react";
import ReactImageCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
class CropImage extends React.Component {
  handleOnCropChange = crop => {
    this.setState({ crop });
  };
  handleOnComplete = (crop, percentCrop) => {
    console.log(percentCrop)
     
  };

  calculateGCD = (a, b) => {
    return b === 0 ? a : this.calculateGCD(b, a % b);
  };
  calculateAspectRatio = (height, width) => {
    const ratio = this.calculateGCD(width, height);
    return width / ratio / (height / ratio);
  };
  constructor(props) {
    super(props);
    this.imageCanvasRef = React.createRef()
    this.state = {
      crop: {
        aspect: this.calculateAspectRatio(
          this.props.dimensions.HEIGHT,
          this.props.dimensions.WIDTH
        ),
        width: 160,
        x: 0,
        y: 0
      }
    };
  }

  handleDownload = (event)=>{
      event.preventDefault()
     
      
  }
  render() {
    return (
      <div style={{ display: "inline-block", margin: "1rem" }}>
        <ReactImageCrop
          src={this.props.imageFile.src}
          crop={this.state.crop}
          imageStyle={{ width: "10rem" }}
          onComplete={this.handleOnComplete}
          onChange={this.handleOnCropChange}
          locked={true}
        ></ReactImageCrop>
        <div>
          <h5>Width: {this.props.dimensions.WIDTH}</h5>
          <h5>Height: {this.props.dimensions.HEIGHT}</h5>
          <h5>
            Aspect Ratio:{" "}
            {this.props.dimensions.WIDTH /
              this.calculateGCD(
                this.props.dimensions.WIDTH,
                this.props.dimensions.HEIGHT
              )}
            /
            {this.props.dimensions.HEIGHT /
              this.calculateGCD(
                this.props.dimensions.WIDTH,
                this.props.dimensions.HEIGHT
              )}
          </h5>
        </div>
        
      </div>
    );
  }
}
export default CropImage;
