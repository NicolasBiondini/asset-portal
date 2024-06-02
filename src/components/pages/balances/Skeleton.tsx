// Loader
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4 gap-2">
      {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => {
        return (
          <div
            key={`${item}-skeleton`}
            className="h-11 bg-colors-grey-line rounded-lg w-full px-4 py-2"
          ></div>
        );
      })}
    </div>
  );
}

export default Skeleton;
