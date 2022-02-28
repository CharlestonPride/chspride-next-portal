import { Image, Transformation } from "cloudinary-react";

type ImageProps = {
  imageId: string;
  className?: string;
  children?: Transformation;
  width?: string;
};

const CloudImage = ({
  imageId,
  className,
  children,
  width = "auto",
}: ImageProps) => {
  return (
    <Image
      className={className}
      cloudName="charlestonpride-org"
      publicId={imageId}
      dpr="auto"
      responsive
      width={width}
      crop="scale"
      responsiveUseBreakpoints="true"
      secure="true"
    >
      {children}
    </Image>
  );
};

export default CloudImage;
