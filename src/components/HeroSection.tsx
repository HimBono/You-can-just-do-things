import heroPixelArt from "@/assets/hero-pixel-art.png";

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="pixel-art terminal-glow mb-8">
        <img 
          src={heroPixelArt} 
          alt="You can just do things - Pixel art logo" 
          className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl"
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
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