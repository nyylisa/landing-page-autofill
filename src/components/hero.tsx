import { Button } from "@/components/ui/button";
import { Chrome, Play } from "lucide-react";
import { BrowserMockup } from "./browser-mockup";

export function HeroSection() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 mx-10 mb-10">
      {/* Left Column - Hero Content */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="heading-1">
            Instantly Fill Forms with{" "}
            <span className="text-primary">Dummy Data</span>
          </h1>

          <p className="after-heading-1">
            Testing a website or demoing a form? Auto Filler Extension lets you
            fill any form with realistic dummy data — in just one click.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Add to Chrome
          </Button>

        </div>
      </div>

      {/* Right Column - Browser Mockup */}
      <div className="flex justify-center lg:justify-end">
        <BrowserMockup />
      </div>
    </div>
  );
}
