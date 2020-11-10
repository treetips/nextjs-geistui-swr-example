import { Spinner, Tooltip } from "@geist-ui/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useImage } from "../../hooks";
import { ExternalLink } from "./ExternalLink";

type Props = {
  src: string;
  title: string;
  href?: string;
  resizeOption: {
    type: "width" | "height";
    value: number;
  };
};

export const AutoResizeImage = (props: Props) => {
  const { src, title, href, resizeOption } = props;
  const { type, value } = resizeOption;
  const [resizedWidth, setResizedWidth] = useState<number>();
  const [resizedHeight, setResizedHeight] = useState<number>();
  const { getImageWidthHeight } = useImage();

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const { width, height } = await getImageWidthHeight(src);
      if (type === "width") {
        if (!unmounted) {
          setResizedWidth(value);
          setResizedHeight((height * value) / width);
        }
      } else {
        if (!unmounted) {
          setResizedWidth((width * value) / height);
          setResizedHeight(value);
        }
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [src, title, resizeOption]);

  if (!resizedWidth || !resizedHeight) {
    return <Spinner />;
  }

  const Component = () => (
    <Tooltip text={title}>
      <NextImage
        src={src}
        alt={title}
        width={resizedWidth}
        height={resizedHeight}
      />
    </Tooltip>
  );

  if (!href) {
    return <Component />;
  }
  return (
    <ExternalLink href={href}>
      <Component />
    </ExternalLink>
  );
};
