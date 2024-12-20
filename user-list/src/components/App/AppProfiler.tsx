import React, { useState, Profiler, ReactNode } from "react";

interface ProfilerComponentProps {
  users: [];
  hasError: boolean;
  profileLoaded: boolean;
  children: ReactNode;
}

const ProfilerComponent: React.FC<ProfilerComponentProps> = ({
  users,
  hasError,
  profileLoaded,
  children,
}) => {
  const [hasSavedProfilerData, setHasSavedProfilerData] = useState(false);

  const onRenderCallback = (
    id: string,
    phase: "mount" | "update" | "commit",
    actualDuration: number
  ) => {
    if (hasSavedProfilerData) return;

    const profilerData = {
      id,
      phase,
      actualDuration,
      users,
      hasError,
    };

    // Convert the profiler data to JSON and save it
    const dataStr = JSON.stringify(profilerData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "react-profiler-results.json";
    document.body.appendChild(a);
    a.click();

    setHasSavedProfilerData(true);
  };

  return (
    profileLoaded && (
      <Profiler id="App" onRender={onRenderCallback}>
        {children}
      </Profiler>
    )
  );
};

export default ProfilerComponent;
