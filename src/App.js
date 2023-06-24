import { useEffect, useState } from "react";
import { Card } from "./component/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [disable, setDisable] = useState(true);
  const [score, setScore] = useState(0);

  const image = [
    { src: "/img/apple.png", type: "apple", matched: false },
    { src: "/img/plane.png", type: "plane", matched: false },
    { src: "/img/car.png", type: "car", matched: false },
    { src: "/img/house.png", type: "house", matched: false },
    { src: "/img/pizza.png", type: "pizza", matched: false },
  ];

  const generateCardData = () => {
    const cardData = [...image, ...image]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    return cardData;
  };
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const checkMatch = () => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.type === choiceTwo.type) {
        console.log(123);
        setTimeout(() => {
          setScore((prevScore) => prevScore + 1);
        }, 500);

        setCards((prevCards) => {
          return prevCards.map((prev) => {
            if (prev.type === choiceOne.type) {
              return { ...prev, matched: true };
            } else {
              return prev;
            }
          });
        });
        resetChoice();
      } else {
        setTimeout(() => {
          resetChoice();
        }, 600);
      }
    }
  };

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisable(false);
  };

  useEffect(() => {
    setCards(generateCardData());
    setDisable(false);
  }, []);

  useEffect(() => {
    checkMatch();
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App font-mono p-4 bg-gradient-to-r from-cyan-300 to-blue-400 min-h-screen">
      <div className="lg:w-[50%] w-full mx-auto">
        <div className="text-center my-5">
          <h1 className="text-4xl">Match game</h1>
          <h2 className="text-2xl">Score: {score}</h2>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              image={image}
              card={card}
              handleChoice={handleChoice}
              flippedCard={
                card === choiceOne || card === choiceTwo || card.matched
              }
              disable={disable}
              score={score}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
