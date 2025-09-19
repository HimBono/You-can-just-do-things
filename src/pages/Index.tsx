import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GoalInput } from "@/components/GoalInput";
import { RoadmapDisplay } from "@/components/RoadmapDisplay";
import { SettingsModal } from "@/components/SettingsModal";
import { toast } from "sonner";

// Mock AI response for demo - replace with actual AI API call
const generateMockRoadmap = (goal: string) => {
  return {
    goal,
    overview: `A comprehensive plan to achieve "${goal}" through strategic planning and consistent execution. This roadmap breaks down your ambitious goal into manageable mini-goals and actionable tasks.`,
    estimatedTimeframe: "3-6 months",
    miniGoals: [
      {
        id: "1",
        title: "Research & Planning",
        description: "Gather information, analyze requirements, and create a detailed plan of action.",
        timeframe: "Week 1-2",
        tasks: [
          {
            id: "1-1",
            title: "Market research and competitor analysis",
            description: "Study the landscape, identify opportunities and potential challenges."
          },
          {
            id: "1-2", 
            title: "Define success metrics and KPIs",
            description: "Establish clear, measurable goals to track your progress."
          },
          {
            id: "1-3",
            title: "Create timeline and resource allocation plan",
            description: "Map out when and how you'll tackle each phase of your goal."
          }
        ]
      },
      {
        id: "2",
        title: "Foundation Building",
        description: "Establish the core elements and infrastructure needed for success.",
        timeframe: "Week 3-6",
        tasks: [
          {
            id: "2-1",
            title: "Set up essential tools and systems",
            description: "Get the technical and organizational foundation in place."
          },
          {
            id: "2-2",
            title: "Build initial prototype or framework",
            description: "Create a working version to test and iterate upon."
          },
          {
            id: "2-3",
            title: "Establish daily routines and habits",
            description: "Create sustainable practices that support your goal achievement."
          }
        ]
      },
      {
        id: "3",
        title: "Implementation & Iteration",
        description: "Execute your plan while continuously improving based on feedback.",
        timeframe: "Week 7-16",
        tasks: [
          {
            id: "3-1",
            title: "Launch initial version or begin execution",
            description: "Start putting your plan into action with real-world testing."
          },
          {
            id: "3-2",
            title: "Gather feedback and analyze results",
            description: "Collect data on performance and user response to guide improvements."
          },
          {
            id: "3-3",
            title: "Refine and optimize based on learnings",
            description: "Make iterative improvements to increase effectiveness."
          }
        ]
      }
    ]
  };
};

const Index = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoalSubmit = async (goal: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, replace this with actual AI API call
      const generatedRoadmap = generateMockRoadmap(goal);
      setRoadmap(generatedRoadmap);
      
      toast.success("Roadmap generated successfully!");
    } catch (error) {
      toast.error("Failed to generate roadmap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SettingsModal />
      
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <div className="mb-12">
          <GoalInput onSubmit={handleGoalSubmit} isLoading={isLoading} />
        </div>
        
        {roadmap && (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
            <RoadmapDisplay roadmap={roadmap} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
