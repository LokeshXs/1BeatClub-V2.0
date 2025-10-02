"use client";

import React, { createContext, useState } from "react";

type ContextType = {
  openCreateClubForm: boolean;
  setOpenCreateClubForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateClubActionContext = createContext<ContextType>({
  openCreateClubForm: false,
  setOpenCreateClubForm: () => {},
});

export default function CreateClubActionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openCreateClubForm, setOpenCreateClubForm] = useState(false);

  return (
    <CreateClubActionContext.Provider
      value={{ openCreateClubForm, setOpenCreateClubForm }}
    >
      {children}
    </CreateClubActionContext.Provider>
  );
}
