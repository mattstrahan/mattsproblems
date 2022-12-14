// This is a list of messages to appear when you get something right.
const correct: string[] =
    [
        "You got it right!",
        "Great going!",
        "You legend!",
        "Who has approximately two thumbs and got that right? You do!",
        "Congratulations!",
        "Another one down!",
        "Right again!",
        "What an answer!",
        "Great stuff!",
        "That's it!",
        "Correct!",
        "Brilliant!",
        "Another right answer!"
    ]

const randomCorrectMessage = () =>  correct[Math.floor(Math.random()*correct.length)];

export default randomCorrectMessage;
