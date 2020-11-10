import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Spacer,
  Text,
} from "@geist-ui/react";
import {
  Divider as DividerIcon,
  Minus,
  Plus,
  Trash2,
  X,
} from "@geist-ui/react-icons";
import Head from "next/head";
import { useState } from "react";
import { Layout } from "../components";
import { useCounter } from "../hooks";

export default function Counter() {
  const [inputValue, setInputValue] = useState(12);
  const {
    CounterContextProvider,
    incrementCount,
    decrementCount,
    multiplyCount,
    divideCount,
    resetCount,
    counterState,
  } = useCounter();

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(Number(value));
  };

  return (
    <>
      <Head>
        <title>Counter Context API</title>
      </Head>
      <Layout>
        <CounterContextProvider>
          <Text h1>Context API Example</Text>

          <Card shadow>
            <Row gap={0.8}>
              <Col>
                <Text h2>Increment / Decrement</Text>
              </Col>
            </Row>
            <Divider y={1} />
            <Card.Content>
              <Row gap={0.8}>
                <Col>
                  <Button
                    type="success"
                    icon={<Plus />}
                    onClick={incrementCount}
                    auto
                  >
                    1
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="warning"
                    icon={<Minus />}
                    onClick={decrementCount}
                    auto
                  >
                    1
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="error"
                    icon={<Trash2 />}
                    onClick={resetCount}
                    auto
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Card.Content>
            <Card.Footer>
              <Text h3>Count = {counterState.count}</Text>
            </Card.Footer>
          </Card>

          <Spacer y={1} />

          <Card shadow>
            <Row gap={0.8}>
              <Col>
                <Text h2>Multiply / Divide</Text>
              </Col>
            </Row>
            <Divider y={1} />
            <Card.Content>
              <Row gap={0.8}>
                <Col>
                  <Input
                    size="large"
                    placeholder="Input number"
                    value={String(inputValue)}
                    onChange={handleInputValue}
                  />
                </Col>
                <Col>
                  <Button
                    type="secondary"
                    icon={<X />}
                    onClick={() => multiplyCount(inputValue)}
                    auto
                  />
                </Col>
                <Col>
                  <Button
                    type="default"
                    icon={<DividerIcon />}
                    onClick={() => divideCount(inputValue)}
                    auto
                  />
                </Col>
                <Col>
                  <Button
                    type="error"
                    icon={<Trash2 />}
                    onClick={resetCount}
                    auto
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Card.Content>
            <Card.Footer>
              <Text h3>Count = {counterState.count}</Text>
            </Card.Footer>
          </Card>
        </CounterContextProvider>
      </Layout>
    </>
  );
}
