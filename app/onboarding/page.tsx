"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OnboardingStep from "@/components/onboarding/OnboardingStep";
import NameStep from "@/components/onboarding/NameStep";
import AgeStep from "@/components/onboarding/AgeStep";
import ClassStep from "@/components/onboarding/ClassStep";
import InterestStep from "@/components/onboarding/InterestStep";
import WelcomeStep from "@/components/onboarding/WelcomeStep";

export type OnboardingData = {
  name:     string;
  age:      number | null;
  grade:    string;
  interest: string;
};

const TOTAL_STEPS = 4; // name, age, class, interest (welcome is final)

export default function OnboardingPage() {
  const { user } = useUser();
  const router   = useRouter();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name:     user?.firstName ?? "",
    age:      null,
    grade:    "",
    interest: "",
  });

  function next() { setStep((s) => s + 1); }
  function back() { setStep((s) => s - 1); }

  function update<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function finish() {
    setSaving(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId:  user?.id,
          name:     data.name,
          age:      data.age,
          grade:    data.grade,
          interest: data.interest,
        }),
      });
      if (!res.ok) throw new Error("Failed to save onboarding");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12">

      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange
                        flex items-center justify-center">
          <span className="font-display font-extrabold text-white text-lg leading-none">P</span>
        </div>
        <span className="font-display font-extrabold text-lg text-ink">
          Politica<span className="text-brand-blue">Learn</span>
        </span>
      </div>

      {/* Progress bar — only shown on steps 1–4 */}
      {step <= TOTAL_STEPS && (
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between text-xs text-mid font-medium mb-2">
            <span>Setting up your profile</span>
            <span>{step} of {TOTAL_STEPS}</span>
          </div>
          <div className="h-2 bg-brand-blue/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-orange rounded-full
                         transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step container */}
      <div className="w-full max-w-md">
        {step === 1 && (
          <OnboardingStep>
            <NameStep
              value={data.name}
              onChange={(v) => update("name", v)}
              onNext={next}
            />
          </OnboardingStep>
        )}
        {step === 2 && (
          <OnboardingStep>
            <AgeStep
              value={data.age}
              onChange={(v) => update("age", v)}
              onNext={next}
              onBack={back}
            />
          </OnboardingStep>
        )}
        {step === 3 && (
          <OnboardingStep>
            <ClassStep
              value={data.grade}
              onChange={(v) => update("grade", v)}
              onNext={next}
              onBack={back}
            />
          </OnboardingStep>
        )}
        {step === 4 && (
          <OnboardingStep>
            <InterestStep
              value={data.interest}
              onChange={(v) => update("interest", v)}
              onNext={next}
              onBack={back}
            />
          </OnboardingStep>
        )}
        {step === 5 && (
          <WelcomeStep
            name={data.name}
            onFinish={finish}
            saving={saving}
          />
        )}
      </div>
    </main>
  );
}


