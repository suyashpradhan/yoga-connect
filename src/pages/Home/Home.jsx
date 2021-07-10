import { Heading } from "@chakra-ui/react";
import { AddPost } from "../../features/";
import { AllPosts } from "../../features/";

export const Home = () => {
  return (
    <div>
      <AddPost />
      <AllPosts />
    </div>
  );
};
