export default function Loader({
  width = 20,
  height = 20,
  stroke = 3,
}: {
  width?: number;
  height?: number;
  stroke?: number;
  borderColor?: string;
}) {
  return (
    <div
      className={` rounded-full  border-solid border-t-transparent animate-spin border-white`}
      style={{
        width: width,
        height: height,
        borderWidth: stroke,
      }}
    ></div>
  );
}
