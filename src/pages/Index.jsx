import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';
import { useState } from 'react';

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const { session, logout } = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);

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
        {!session ? (
          showLogin ? (
            <SupabaseAuthUI />
          ) : (
            <Button colorScheme="teal" size="lg" onClick={() => setShowLogin(true)}>Login</Button>
          )
        ) : (
          <>
            <Button colorScheme="teal" size="lg" onClick={() => { setShowLogin(false); logout(); }}>Logout {session.user.email}</Button>
            <Button colorScheme="teal" size="lg" onClick={handleAddPost}>Add Post</Button>
            {posts && posts.map(post => (
              <Text key={post.id}>{post.name}: {post.body}</Text>
            ))}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;