import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  HStack,
  Switch,
  Center,
  Text,
} from "@chakra-ui/react";

let DefaultNamesOnLoad = [
  { key: 0, name: " " },
  { key: 1, name: " " },
  { key: 2, name: " " },
];

let DefaultPairRestrictions = [{ key: 0, name1: " ", name2: " " }];
let CantPickText = "X";
let LinkText = 'interstellarYachtClub';

const SecretSanta3 = () => {
  const [names, setNames] = useState(DefaultNamesOnLoad);
  const [pairs, setPairs] = useState([]);
  const [pairRestrictMode, setPairRestrictMode] = useState(false);
  const [pairRestrictions, setPairRestrictions] = useState(
    DefaultPairRestrictions
  );
  const [magic, setMagic] = useState(false);
  const [error, setError] = useState({ state: false, message: "OK" });

  const AddNameHandler = () => {
    setNames((prevNames) => prevNames.concat({ key: names.length, name: "" }));
  };

  const CreatePairs = (newPairs) => {
    setPairs((prevPairs) => newPairs);
  };

  const EnterNameHandler = (event) => {
    event.preventDefault();
    let newName = event.target.value;
    let index = event.target.id.slice(9);
    let newArray = names;
    newArray.splice(index, 1, { key: index, name: newName });
    setNames(newArray);
  };

  const ReworkMagicHandler = () => {
    CreateSantasHandler();
  };

  const ResetMagicHandler = () => {
    setError({ state: false, message: "OK" });
    setMagic(false);
    setNames(DefaultNamesOnLoad);
    setPairs([""]);
  };

  let allSantas = [];
  const MatchNames = () => {
    allSantas = [];
    let roll = 0;
    let i = 0;

    while (i < names.length - 1) {
      roll = Math.floor(Math.random() * names.length);
      console.log("rolled " + roll);
      if (
        names[i].name !== names[roll].name &&
        allSantas.includes(names[roll]) !== true
      ) {
        console.log(`names[i].name ${names[i].name}`);
        console.log(`names[roll].name ${names[roll].name}`);
        console.log(
          `allSantas.includes(names[roll].name) ${names[roll].name} ${
            allSantas.includes(names[roll].name) !== true
          }`
        );
        allSantas.push(names[roll]);
        console.log(`pushed --> ${names[roll].name}`);
        i++;
        console.log("counter " + i);
      } else {
        console.log("else //skip");
      }
    }
    for (const name of names) {
      if (allSantas.includes(name)) {
        console.log(`nameslist ${name.name}`);
      } else {
        allSantas.push(name);
      }
    }
    return allSantas;
  };

  const CreateSantasHandler = () => {
    for(const name of names){
      if(name.name === ' '){
        setError({ state: true, message: "Do not use blank names!" })
        return null;
      } else{
        //names values are not blank!
      }
    }

    let badMatch = false;
    for (const name of names) {
      console.log(name);
    }
    MatchNames();
    for (const key of names) {
      if (key.key === allSantas[key.key].key) {
        badMatch = true;
      }
    }
    while (badMatch === true) {
      MatchNames();
      for (const key of names) {
        if (key.key === allSantas[key.key].key) {
          badMatch = true;
        } else {
          badMatch = false;
        }
      }
    }

    CreatePairs(allSantas);
    setMagic(true);
  };

  const PairRestrictHandler = (event) => {
    if (pairRestrictMode === false) {
      setPairRestrictMode(true);
    } else {
      setPairRestrictMode(false);
    }
    console.log(pairRestrictMode);
  };
  const ChoosePairRestrictHandlerL = (event) => {
    let nameSelected = event.target.value.split("-")[2];
    console.log("nameselected: " + nameSelected);
    let currentPairRestrictions = pairRestrictions;
    console.log(currentPairRestrictions);
    //setPairRestrictions(prevPairRestrictions => {})
    //currentPairRestrictions.splice(pairRestrictions.length-1, 1, )
    //newArray.splice(index, 1, { key: index, name: newName });
  };
  const ChoosePairRestrictHandlerR = (event) => {
    let nameSelected = event.target.value.split("-")[2];
    console.log("nameselected: " + nameSelected);
    let currentPairRestrictions = pairRestrictions;
    console.log(currentPairRestrictions);
    //setPairRestrictions(prevPairRestrictions => {})
    //currentPairRestrictions.splice(pairRestrictions.length-1, 1, )
    //newArray.splice(index, 1, { key: index, name: newName });
  };

  return (
    <>
      <Container maxW="container.sm" centerContent className="app-body">
        <Stack spacing={4}>
          <Box boxShadow="md" p="6" rounded="md" bg="white">
            <Stack spacing={2} align="center">
              <HStack className="header">
                <img className="logo" src="gift-svgrepo-com.svg"></img>
                <Stack>
                  <Text className="banner-header">GiftXchange</Text>
                  <Text className="banner-subtitle" as="h6" size="xs">
                    A gift exchange webapp
                  </Text>
                </Stack>
              </HStack>
              {!magic && !error.state && (
                <>
                  {" "}
                  {names.map((name) => {
                    return (
                      <Input
                        focusBorderColor="cyan.500"
                        variant="filled"
                        borderRadius={"25px"}
                        isRequired="true"
                        size="lg"
                        color="black"
                        placeholder="Enter a name..."
                        className="txt-app-body"
                        id={`input-id-${name.key}`}
                        onChange={EnterNameHandler}
                      />
                    );
                  })}
                  <Button
                    className="btn-addName"
                    variant="outline"
                    onClick={AddNameHandler}
                    color="#00B5D8"
                    borderColor="#00B5D8"
                    borderRadius={"25px"}
                  >
                    <Text fontSize="2xl">+</Text>
                  </Button>
                  <Button
                    className="btn-submit"
                    color="white"
                    onClick={CreateSantasHandler}
                    backgroundColor="#00B5D8"
                  >
                    Generate Gifters!
                  </Button>
                </>
              )}

              {magic && !error.state && (
                <>
                  <Stack>
                    {names.map((name) => {
                      return (
                        <Center bg="white" h="50px">
                          <Text>
                            {name.name}{" "}
                            <span style={{ color: "#00B5D8" }}>has</span>{" "}
                            {pairs[name.key].name}
                          </Text>
                        </Center>
                      );
                    })}
                  </Stack>
                  <Button color="#00B5D8" onClick={ReworkMagicHandler}>
                    Rematch Gifters!
                  </Button>
                  <Text>...or...</Text>
                  <Button colorScheme="gray" onClick={ResetMagicHandler}>
                    RESET
                  </Button>
                </>
              )}

              {error.state && (
                <>
                <Text>{error.message}</Text>

<Button colorScheme="gray" onClick={ResetMagicHandler}>
                    RESET
                  </Button>
                </>
              )}
            </Stack>
          </Box>
          <Box boxShadow="md" p="6" rounded="md" bg="white">
            <Stack spacing={2} align="center">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="pair-restrict" mb="0">
                  <Text>Pair Restrictions (incomplete feature)</Text>
                </FormLabel>
                <Switch
                colorScheme="cyan"
                  id="pair-restrict"
                  size="lg"
                  onChange={PairRestrictHandler}
                />
              </FormControl>
              {pairRestrictMode && (
                <>
                  <Center h="100px" color="black">
                    <Select
                      placeholder="Select name"
                      onChange={ChoosePairRestrictHandlerL}
                    >
                      {names.map((name) => {
                        return (
                          <option value={`option-${name.key}-${name.name}`}>
                            {name.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Text>{CantPickText}</Text>
                    <Select
                      placeholder="Select name"
                      onChange={ChoosePairRestrictHandlerR}
                    >
                      {names.map((name) => {
                        return (
                          <option value={`option-${name.key}-${name.name}`}>
                            {name.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Center>
                </>
              )}
            </Stack>
          </Box>
          <Center className="footer-bx">
            <nav>webapp made by
            <a className="footer-link" href="https://github.com/interstellarYachtClub/">{` ${LinkText}`}</a>
            </nav>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default SecretSanta3;
