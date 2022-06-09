import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

let DefaultNamesOnLoad = [
  { key: 0, name: "" },
  { key: 1, name: "" },
  { key: 2, name: "" },
];

const SecretSanta = () => {
  const [names, setNames] = useState(DefaultNamesOnLoad);
  const [pairs, setPairs] = useState([]);
  //const [pairRestrictMode, setPairRestrictMode] = useState(false);
  const [magic, setMagic] = useState(false);
  const [error, setError] = useState({ state: false, message: "OK" });

  const AddNameHandler = () => {
    setNames((prevNames => prevNames.concat({key: names.length, name: ''})
    ));
  };

  const CreatePairs = (newPairs) => {
    setPairs((prevPairs => newPairs
    ));
  };

  const EnterNameHandler = (event) => {
    event.preventDefault();
    let newName = event.target.value;
    let index = event.target.id.slice(9);
    let newArray = names;
    newArray.splice(index, 1, {key: index, name: newName});
    setNames((newArray));
  }

  const ReworkMagicHandler = () => {
    CreateSantasHandler();
  }

  const ResetMagicHandler = () => {
    setError({ state: false, message: "OK" })
    setMagic(false);
    setNames(DefaultNamesOnLoad)
    setPairs(['']);
  }
  const RebootMagicHandler = () => {
    setError({ state: false, message: "OK" })
    setMagic(false);
    setPairs(['']);
    setNames((prevNames => prevNames));
  }

  let allSantas = [];
  const CreateSantasHandler = () => {
    allSantas = [];
    let e = 0;
    let i = 0;
    while (i < names.length) {
      let roll = RollRandom(names.length);
      if (names[roll].name === '') {
        setError({state: true, message: "Sant can't read minds. Please don't leave names blank!"});
        return null;
      } else if (e > 100 ) {
        setError({state: true, message: 'Sorry, Santa has made a terrible mistake. Please try again.'});
        return null;
      }
      else if (i === roll) {
        //reject
        e++;
      } else if (allSantas.includes(names[roll])) {
        //reject
        e++;
      } else if (e > 100 ) {
        setError({state: true, message: 'Sorry, Santa has made a terrible mistake. Please try again.'});
        return null;
      } else if (i !== roll){
        allSantas.push(names[roll])
        i++;
      } else if (!allSantas.includes(names[roll])) {
        allSantas.push(names[roll])
        i++;
      } else {
        i = names.length;
        setError({state: true, message: 'Sorry, Santa has made a terrible mistake.'})
      }
    }
    CreatePairs(allSantas);
    setMagic(true);
  }

  const RollRandom = (int) => {
    return Math.floor(Math.random() * int);
  };

  const FestiveHo = (string) => {
    return <span className="festive">{string}</span>;
  };
  return (
    <>
      <Container maxW="container.sm" centerContent>
        <Stack spacing={1} align="center">
          <Heading>🎄
            {FestiveHo("Ho,")} {FestiveHo("Ho, ")} {FestiveHo("Ho")}
            🎄</Heading>
          <Heading as="h6" size="xs">
            A secret santa generator!
          </Heading>
          {(!magic && !error.state) && <> {names.map((name) => {
            return (
              <Input
                variant="flushed"
                isRequired="true"
                size="lg"
                color="green"
                focusBorderColor="green"
                placeholder="Enter a name..."
                className={`txt-input`}
                id={`input-id-${name.key}`}
                onChange={EnterNameHandler}
              />
            );
          })}

          <Button
            colorScheme="green"
            variant="outline"
            onClick={AddNameHandler}
          >
            <Text fontSize="2xl">+</Text>
          </Button>
          <Button colorScheme="green" onClick={CreateSantasHandler}>
            Generate Secret Santas!
          </Button></>}

          {(magic && !error.state) && <>
          <Stack direction='row'>
            <Stack>
          {names.map((name) => {
            return (
              <>
              <Input
              variant='unstyled'
                size="lg"
                color="red"
                focusBorderColor="red"
                className={`txt-name-output`}
                id={`name-id-${name.key}`}
                value={name.name}

              />
              </>
            );
          })}
          </Stack>

          <Stack>
          {pairs.map((name) => {
            return (
              <Input
              variant='unstyled'
                size="lg"
                color="green"
                focusBorderColor="green"
                className={`txt-santa-output`}
                id={`santa-id-${name.key}`}
                value={name.name}
              />
            );
          })}
          </Stack>
          </Stack>
          <Text>Hate these pairs?</Text>
          <Button colorScheme="red" onClick={ReworkMagicHandler}>
            Rework Santas Magic!
          </Button>
          <Text>...or...</Text>
          <Button colorScheme="gray" onClick={ResetMagicHandler}>
            RESET
          </Button>
          </>}
          {error.state && <><Text fontSize="xl">{error.message}</Text><Button colorScheme="red" onClick={RebootMagicHandler}>
            <Text fontSize="xl" color="white">ERROR! REBOOT APP!</Text>
          </Button></>}

        </Stack>
      </Container>
    </>
  );
};

export default SecretSanta;