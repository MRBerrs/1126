window.STORY_CHAPTERS = {
  intro: {
    bg: "bg-chat",
    lines: [
      "Everything started with simple messages.",
      "Different countries, different time zones.",
      "But feelings...",
      "felt real."
    ],
    next: "conflict"
  },

  conflict: {
    bg: "bg-chat",
    lines: [
      "Then the nights got longer.",
      "Messages became shorter.",
      "Overthinking started to grow.",
      "Small misunderstandings...",
      "turned into arguments."
    ],
    choices: [
      { text: "Stay silent", next: "silent" },
      { text: "Say sorry", next: "sorry" },
      { text: "Fight back", next: "fight" }
    ]
  },

  silent: {
    lines: [
      "Silence felt safer.",
      "But it slowly created distance."
    ],
    next: "ending"
  },

  sorry: {
    bg: "bg-sorry",
    lines: [
      "You chose to swallow your pride.",
      "Apologies were sent, one by one."
    ],
    next: "ending"
  },

  fight: {
    bg: "bg-argue",
    lines: [
      "Words were thrown without thinking.",
      "The distance felt even heavier."
    ],
    next: "ending"
  }
};
