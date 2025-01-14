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

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface UserListProps {
  hasError: boolean;
  users: User[];
}
