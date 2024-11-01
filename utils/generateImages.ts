import html2canvas from "html2canvas";

const downloadImage = (blob: string) => {
  const fakeLink = window.document.createElement("a");
  //@ts-ignore
  fakeLink.style = "display:none;";
  fakeLink.download = "qrcodes.png";

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export const exportAsImage = async (element: any) => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png", 2);
  downloadImage(image);
};
