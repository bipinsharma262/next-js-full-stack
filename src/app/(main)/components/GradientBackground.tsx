export default function BackgroundGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#0EA5E9]/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#9b87f5]/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />
    </div>
  );
}