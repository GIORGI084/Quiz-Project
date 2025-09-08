import React from "react";
import { EditPageContent } from "@/features/editPage/ui/EditPageContent";
import { EditPageContextProvider } from "@/widgets/editPage/model/EditPageContextProvider";

const EditPage = () => {
  return (
    <EditPageContextProvider>
      <EditPageContent />
    </EditPageContextProvider>
  );
};

export { EditPage };
