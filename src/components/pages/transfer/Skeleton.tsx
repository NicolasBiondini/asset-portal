function Skeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full max-w-[400px]  gap-2">
      <div className="flex flex-col gap-1">
        {" "}
        <div className="bg-colors-bg-secondary  rounded-md h-[182px] rounded-b-none"></div>
        <div className="h-[60px] bg-colors-bg-secondary rounded-md rounded-t-none"></div>
      </div>
      <div className="h-[52px] bg-colors-bg-secondary rounded-md "></div>
      <div className="h-[48px] bg-colors-bg-secondary rounded-md "></div>
    </div>
  );
}

export default Skeleton;
