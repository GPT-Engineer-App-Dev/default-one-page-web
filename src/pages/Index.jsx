import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();

  const handleAddPost = () => {
    addPostMutation.mutate({ name: "New Post", body: "This is a new post." });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Our Website</Heading>
        <Text fontSize="lg">This is a default one-page web app using the first-generation template.</Text>
        <Button colorScheme="teal" size="lg" onClick={handleAddPost}>Add Post</Button>
        {posts && posts.map(post => (
          <Text key={post.id}>{post.name}: {post.body}</Text>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;