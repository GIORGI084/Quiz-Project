import { useParams } from "next/navigation";
import React from "react";

const SingleQuiz = () => {
  const { id } = useParams();

  return <div>SingleQuiz {id}</div>;
};

export { SingleQuiz };
