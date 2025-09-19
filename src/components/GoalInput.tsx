import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  isLoading?: boolean;
}

export const GoalInput = ({ onSubmit, isLoading }: GoalInputProps) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal.trim());
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-gradient-card border-border/50 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="goal" className="text-sm font-medium text-terminal-cyan">
            <Sparkles className="inline w-4 h-4 mr-2" />
            What do you want to achieve?
          </label>
          <Textarea
            id="goal"
            placeholder="e.g., Launch a SaaS product, Learn machine learning, Get promoted to senior developer, Start a podcast..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="min-h-[120px] resize-none bg-input/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-terminal-green focus:border-terminal-green"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={!goal.trim() || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg transition-all duration-300 terminal-glow"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Generating roadmap...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Generate my roadmap
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};