const STORE = {
    planets: [
        { 
            mercury: [
                {   
                    id: 1,
                    question: "Which is bigger, Mercury or the Moon?",
                    options: [
                        "The Moon is bigger",
                        "Mercury is bigger",
                        "They are the same size",
                        `That's no moon that's a space station`
                    ],
                    correct: "Mercury is bigger",
                    factoid: "Mercury is slightly larger than the moon."
                },
                {
                    id: 2,
                    question: "How many Earth days does Mercury take to orbit the sun?",
                    options: [
                        "101 Earth days",
                        "75 Earth days",
                        "81 Earth days",
                        "88 Earth days"
                    ],
                    correct: "88 Earth days",
                    factoid: "Mercury has a short orbit but a very long rotation.  It takes just 88 Earth days to orbit the Sun, but one day on Mercury is 59 Earth days!"
                },
                {
                    facts: [
                        {circumference: '15,329.1 KM'},
                        {distance: '3.879122 mins'},
                        {type: 'Terrestrial'},
                        {temp: '430 degrees Celsius'}
                    ]
                }
            ],
    },
    { 
        venus: [
            {
                id: 3,
                question: "Who or what are the majority of Venus' surface features named after?",
                options: [
                    "Animals",
                    "Famous or noteworthy men",
                    "Famous or noteworthy women",
                    "Places on Earth"
                ],
                correct: "Famous or noteworthy women",
                factoid: "Nearly every surface feature on the planet is named after both mythological and real women from Earth."
            },
            {
                id: 4,
                question: "Venus is a goddess from which ancient mythology?",
                options: [
                    "Greek",
                    "Egyptian",
                    "Roman",
                    "Sumerian"
                ],
                correct: "Roman",
                factoid: "Venus is the Roman goddess of love and beauty who was known as Aphrodite in Greek mythology."
            },
            {
                facts: [
                    {circumference: '38,024.6 KM'},
                    {distance: '6.014074 mins'},
                    {type: 'Terrestrial'},
                    {temp: '465 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        earth: [
            {
                id: 5,
                question: "Who or what was the first thing to orbit the Earth?",
                options: [
                    "A monkey",
                    "A dog",
                    "Buzz Lightyear",
                    "John Glenn"
                ],
                correct: "A dog",
                factoid: "The first creature from Earth to orbit the planet was Laika the dog, sent on the Soviet Sputnik 2 in 1957."
            },
            {
                id: 6,
                question: "How old is the name 'Earth' for our planet?",
                options: [
                    "1500+ Years",
                    "2000+ Years",
                    "1000+ Years",
                    "3000+ Years"
                ],
                correct: "1000+ Years",
                factoid: "Humans have called the planet 'Earth' for at least 1000 years, its name is Germanic in origin and means simply 'the ground'."
            },
            {
                facts: [
                    {circumference: '40,030.2 KM'},
                    {distance: '8.326467 mins'},
                    {type: 'Terrestrial'},
                    {temp: '14 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        mars: [
            {
                id: 7,
                question: "How long is Mars' longest canyon?",
                options: [
                    "50 kilometers",
                    "545 kilometers",
                    "10,361 kilometers",
                    "4,800 kilometers"
                ],
                correct: "4,800 kilometers",
                factoid: "The Martian canyon Valles Marineris is 4,800 kilometers long and up to 320 kilometers wide in some places.  This is roughly 10 times the size of the Grand Canyon in Nevada."
            },
            {
                id: 8,
                question: "Mars has the largest Volcano in our Solar System, what is it's name?",
                options: [
                    "Mount Vesuvius",
                    "Mount Rushmore",
                    "olympus Mons",
                    "Ben Nevis"
                ],
                correct: "Olympus Mons",
                factoid: "Olympus Mons is monstrous in size, it is 3 times taller than Mount Everest and its base covers an area the size of New Mexico!"
            },
            {
                facts: [
                    {circumference: '21,296.9 KM'},
                    {distance: '13.800348 mins'},
                    {type: 'Terrestrial'},
                    {temp: '+20 to -153 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        jupiter: [
            {
                id: 9,
                question: "Jupiter is known for having many moons, how many does it have?",
                options: [
                    "45",
                    "63",
                    "102",
                    "79"
                ],
                correct: "79",
                factoid: "Jupiter has 79 known moons, and possibly more!  It has the most moons of any planet in our Solar System."
            },
            {
                id: 10,
                question: "Jupiter takes a lot longer to travel around the Sun when compared to the Earth.  How long does it take for one complete orbit?",
                options: [
                    "1,438 Earth days",
                    "750 Earth days",
                    "6,000 Earth days",
                    "4,333 Earth days"
                ],
                correct: "4,333 Earth days",
                factoid: "That's right, 4,333 days! One year on Jupiter is about 12 years on Earth."
            },
            {
                facts: [
                    {circumference: '439,263.8 KM'},
                    {distance: '43.748913 mins'},
                    {type: 'Gas Giant'},
                    {temp: '-145 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        saturn: [
            {
                id: 11,
                question: "How many rings does Saturn have?",
                options: [
                    "Nine",
                    "Four",
                    "Twelve",
                    "Seven"
                ],
                correct: "Seven",
                factoid: "Saturn has seven distinct rings with clear divisions between them, in addition there are thousands of smaller ringlets.  Saturn has the most complex ring system of any planet in the Solar System."
            },
            {
                id: 12,
                question: "Which two gases is Saturn's atmosphere primarily comprised of?",
                options: [
                    "Methane and Sulfur",
                    "Hexane and Oxygen",
                    "Hydrogen and Helium",
                    "Nitrogen and Phosphine"
                ],
                correct: "Hydrogen and Helium",
                factoid: "Saturn is made up mostly of Hydrogen and Helium these gases create extremely turbulent winds with speeds in excess of 1,600 feet per second!"
            },
            {
                facts: [
                    {circumference: '365,882.4 KM'},
                    {distance: '83.523509 mins'},
                    {type: 'Gas Giant'},
                    {temp: '-177.8 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        uranus: [
            {
                id: 13,
                question: "While it is not known for having rings, Uranus actually has more than Saturn, they are just not as large or vibrant.  How many does it have?",
                options: [
                    "15",
                    "19",
                    "8",
                    "11"
                ],
                correct: "11",
                factoid: "Uranus has eleven rings, it has nine, greyish colored inner rings, and two outer rings, one which is reddish and the other which is blue."
            },
            {
                id: 14,
                question: "Even though it is an Ice Giant Uranus has a hot rocky core.  What temperatures can it reach?",
                options: [
                    "4,500 degrees Celsius",
                    "6,100 degrees Celsius",
                    "9,001 degrees Celsius",
                    "4,982 degrees Celsius"
                ],
                correct: "4,982 degrees Celsius",
                factoid: "Uranus can reach temperatures of over 4,982 degrees Celsius in its core!"
            },
            {
                facts: [
                    {circumference: '159,354.1 KM'},
                    {distance: '164.918561 mins'},
                    {type: 'Ice Giant'},
                    {temp: '-216.11 degrees Celsius'}
                ]
            }
        ],
    },
    { 
        neptune: [
            {
                id: 15,
                question: "Neptune is the farthest planet from the Sun, how long does it take to orbit the Sun in Earth days?",
                options: [
                    "20,780 Earth days",
                    "14,210 Earth days",
                    "60,190 Earth days",
                    "73,230 Earth days"
                ],
                correct: "60,190 Earth days",
                factoid: "Neptune takes a whopping 60,190 Earth days to orbit the sun once.  That's 165 years!"
            },
            {
                id: 16,
                question: "Neptune is the windiest planet in our Solar System, what is the fastest wind speed we've recorded?",
                options: [
                    "1,200 kilometers per hour",
                    "2,500 kilometers per hour",
                    "2,000 kilometers per hour",
                    "1,000 kilometers per hour"
                ],
                correct: "2,000 kilometers per hour",
                factoid: "Winds on Neptune reach speeds of 2,000 kilometers per hour or more, for comparison the fastest winds seen on Earth are bout 400 kilometers per hour."
            },
            {
                facts: [
                    {circumference: '154,704.6 KM'},
                    {distance: '248.956123 mins'},
                    {type: 'Ice Giant'},
                    {temp: '-235 degrees Celsius'}
                ]
            }
        ],
    }],
    currentPlanet: 'not-started',
    questionNumber: 0,
    scoreCorrect: 0,
    scoreIncorrect: 0
}


//Planets 
    //console.log(STORE.planets);
        // Planet 0
            // Question One
                // console.log(STORE.planets[0].mercury[0].question); // First question for planet 0
                // console.log(STORE.planets[0].mercury[0].options); // Options for question 1 for planet 0
                // console.log(STORE.planets[0].mercury[0].correct); // Correct answer for question 1 for planet 0
                // console.log(STORE.planets[0].mercury[0].factoid); // Factoid for question 1 for planet 0
                // console.log(" ");
            // Question Two
                // console.log(STORE.planets[0].mercury[1].question); // Second question for planet 0
                // console.log(STORE.planets[0].mercury[1].options); // Options for question 1 for planet 0
                // console.log(STORE.planets[0].mercury[1].correct); // Correct answer for question 2 for planet 0
                // console.log(STORE.planets[0].mercury[0].factoid); // Factoid for question 1 for planet 0
                // console.log(" ");
            // Facts about the planet
                // console.log(STORE.planets[0].mercury[2].facts[0].circumference); // Circumference fact for planet 0
                // console.log(STORE.planets[0].mercury[2].facts[1].distance); // Distance fact for planet 0
                // console.log(STORE.planets[0].mercury[2].facts[2].type); // Type fact for planet 0
                // console.log(STORE.planets[0].mercury[2].facts[3].temp); // Temperature fact for planet 0
