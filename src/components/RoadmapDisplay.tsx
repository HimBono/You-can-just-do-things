import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, MapPin, Target, Zap } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface MiniGoal {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  timeframe?: string;
}

interface RoadmapData {
  goal: string;
  overview: string;
  miniGoals: MiniGoal[];
  estimatedTimeframe?: string;
}

interface RoadmapDisplayProps {
  roadmap: RoadmapData;
}

export const RoadmapDisplay = ({ roadmap }: RoadmapDisplayProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Goal Overview */}
      <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
        <div className="flex items-start gap-3 mb-4">
          <Target className="w-6 h-6 text-terminal-green mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{roadmap.goal}</h2>
            <p className="text-muted-foreground leading-relaxed">{roadmap.overview}</p>
            {roadmap.estimatedTimeframe && (
              <Badge variant="secondary" className="mt-3">
                <Zap className="w-3 h-3 mr-1" />
                {roadmap.estimatedTimeframe}
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Mini Goals */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-terminal-cyan flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Your Roadmap
        </h3>
        
        {roadmap.miniGoals.map((miniGoal, index) => (
          <Card key={miniGoal.id} className="p-6 bg-gradient-card border-border/50 shadow-card">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-foreground">{miniGoal.title}</h4>
                {miniGoal.timeframe && (
                  <Badge variant="outline" className="ml-auto">
                    {miniGoal.timeframe}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground ml-11">{miniGoal.description}</p>
            </div>

            {/* Tasks */}
            <div className="ml-11 space-y-3">
              {miniGoal.tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-terminal-green mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground">{task.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};