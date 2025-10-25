"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Globe, SlidersHorizontal } from "lucide-react";

interface Props {
  language: string;
  setLanguage: (lang: string) => void;
  mode: string;
  setMode: (mode: string) => void;
}

export default function LanguageAndModeSupport({
  language,
  setLanguage,
  mode,
  setMode,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 shadow-sm backdrop-blur-sm mb-10">
      {/* Language Select */}
      <div className="flex flex-col w-full sm:w-1/2">
        <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
          <Globe className="w-4 h-4 text-blue-500" />
          Language
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full bg-background text-foreground border-border">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground">
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="telugu">Telugu</SelectItem>
            <SelectItem value="tamil">Tamil</SelectItem>
            <SelectItem value="punjabi">Punjabi</SelectItem>
            <SelectItem value="marathi">Marathi</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Mode Select */}
      <div className="flex flex-col w-full sm:w-1/2">
        <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          Summary Mode
        </Label>
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger className="w-full bg-background text-foreground border-border">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground">
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="full">Full</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
