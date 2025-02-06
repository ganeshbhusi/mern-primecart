import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Input,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLoginFormShown, setIsLoginFormShown] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const toggleForm = useCallback(() => {
    setIsLoginFormShown(!isLoginFormShown);
  }, [isLoginFormShown, setIsLoginFormShown]);

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      toaster.create({
        title: "Log In",
        description: res.success
          ? "You have successfully logged in."
          : res.message,
        type: res.success ? "success" : "error",
      });
      if (res.success) {
        navigate("/");
        setUsername("");
        setPassword("");
      }
    } catch (err: any) {
      toaster.create({
        title: "Try again!",
        description: err?.response?.data?.message ?? "Login Failed",
        type: "error",
      });
    }
  };

  const handleRegistration = async () => {
    try {
      const res = await register({ username, password });
      toaster.create({
        title: "Registration",
        description: res.success
          ? "You have successfully registered."
          : res.message,
        type: res.success ? "success" : "error",
      });
      toggleForm();
      setPassword("");
    } catch (err: any) {
      toaster.create({
        title: "Try again!",
        description: err?.response?.data?.message ?? "Registration Failed",
        type: "error",
      });
    }
  };
  return (
    <Container>
      <Center>
        {isLoginFormShown ? (
          <Card.Root>
            <CardBody>
              <Box paddingTop={"8"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} marginBottom={"4"}>
                  Try with registered account
                </Text>
                <Input
                  value={username}
                  placeholder="Username"
                  marginBottom={"2"}
                  onChange={(evt) => setUsername(evt.target.value)}
                  required
                />
                <Input
                  value={password}
                  placeholder="Password"
                  marginBottom={"4"}
                  type="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
                <Button title="Login" onClick={handleLogin}>
                  Login
                </Button>
                <Text marginTop={"4"}>
                  Don't have an account?{" "}
                  <Button
                    title="Sign Up"
                    variant="plain"
                    margin={0}
                    padding={0}
                    onClick={toggleForm}
                  >
                    Sign Up
                  </Button>{" "}
                  now.
                </Text>
              </Box>
            </CardBody>
          </Card.Root>
        ) : (
          <Card.Root>
            <CardBody>
              <Box paddingTop={"8"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} marginBottom={"4"}>
                  Give some unique username
                </Text>
                <Input
                  placeholder="Username"
                  marginBottom={"2"}
                  onChange={(evt) => setUsername(evt.target.value)}
                  required
                />
                <Input
                  placeholder="Password"
                  marginBottom={"4"}
                  type="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
                <Button title="Register" onClick={handleRegistration}>
                  Register
                </Button>
                <Text marginTop={"4"}>
                  Have an account already?{" "}
                  <Button
                    title="Sign Up"
                    variant="plain"
                    margin={0}
                    padding={0}
                    onClick={toggleForm}
                  >
                    Login
                  </Button>{" "}
                  now.
                </Text>
              </Box>
            </CardBody>
          </Card.Root>
        )}
      </Center>
    </Container>
  );
};

export default AuthPage;
