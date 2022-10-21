export const tryagain:string[] =
[
    "Better luck next time!",
    "You're getting there!",
    "You weren't quite right there",
    "Try again!"
    ]

export const randomTryAgain = () =>  tryagain[Math.floor(Math.random()*tryagain.length)];

export { };