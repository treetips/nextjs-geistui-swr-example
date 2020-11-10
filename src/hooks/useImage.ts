/**
 * Custom Hooks for Image Utility
 * @author treetips
 */
export const useImage = () => {
  type ImageWidthHeightType = { width: number; height: number };

  const getImageWidthHeight = (src: string): Promise<ImageWidthHeightType> =>
    new Promise(
      (resolve, reject): ImageWidthHeightType => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
        return {
          width: img.width,
          height: img.height,
        };
      }
    );

  return {
    getImageWidthHeight,
  } as const;
};
