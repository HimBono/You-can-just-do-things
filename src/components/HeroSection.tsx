export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
        <span className="gradient-text">You can just</span>
        <br />
        <span className="text-terminal-green">do things</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        Transform your ambitious goals into actionable roadmaps. 
        Get AI-powered breakdowns with mini-goals and clear tasks to achieve anything.
      </p>
    </div>
  );
};