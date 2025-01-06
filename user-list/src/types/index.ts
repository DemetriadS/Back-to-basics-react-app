import React, { ReactNode } from "react";

export interface ProfilerComponentProps {
  users: [];
  hasError: boolean;
  profileLoaded: boolean;
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface FilterProps {
  filters: { [key: string]: string };
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface User {
  name: {
    first: string;
    last: string;
  };
}

export interface UserListProps {
  hasError: boolean;
  users: User[];
}
