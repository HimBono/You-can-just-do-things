import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SettingsData {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  streamResponse: boolean;
}

const defaultSettings: SettingsData = {
  apiKey: "",
  model: "gpt-4o",
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: "You are a helpful AI assistant that creates detailed roadmaps to achieve user goals. Break down complex goals into manageable mini-goals with specific tasks.",
  streamResponse: true,
};

const models = [
  { value: "gpt-4o", label: "GPT-4o (Latest)" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini (Faster)" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (Cheapest)" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
];

export const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("aiRoadmapSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
  }, []);

  const saveSettings = () => {
    try {
      localStorage.setItem("aiRoadmapSettings", JSON.stringify(settings));
      toast.success("Settings saved successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Failed to save settings:", error);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("aiRoadmapSettings");
    toast.success("Settings reset to defaults");
  };

  const handleInputChange = (field: keyof SettingsData, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-4 z-50 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your OpenAI or Anthropic API key"
              value={settings.apiKey}
              onChange={(e) => handleInputChange("apiKey", e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally for testing purposes only
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <Select 
              value={settings.model} 
              onValueChange={(value) => handleInputChange("model", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <Label htmlFor="temperature">
              Temperature: {settings.temperature}
            </Label>
            <input
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => handleInputChange("temperature", parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Higher values make output more creative, lower values more focused
            </p>
          </div>

          {/* Max Tokens */}
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Input
              id="maxTokens"
              type="number"
              min="100"
              max="8000"
              value={settings.maxTokens}
              onChange={(e) => handleInputChange("maxTokens", parseInt(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of tokens in the response
            </p>
          </div>

          {/* System Prompt */}
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              rows={4}
              value={settings.systemPrompt}
              onChange={(e) => handleInputChange("systemPrompt", e.target.value)}
              placeholder="Enter system prompt to guide AI behavior..."
            />
          </div>

          {/* Stream Response */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="streamResponse">Stream Response</Label>
              <p className="text-xs text-muted-foreground">
                Enable real-time streaming of AI responses
              </p>
            </div>
            <Switch
              id="streamResponse"
              checked={settings.streamResponse}
              onCheckedChange={(checked) => handleInputChange("streamResponse", checked)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={resetSettings}
            className="text-destructive hover:text-destructive"
          >
            Reset to Defaults
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSettings}>
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Export function to get current settings
export const getStoredSettings = (): SettingsData => {
  try {
    const saved = localStorage.getItem("aiRoadmapSettings");
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
  return defaultSettings;
};