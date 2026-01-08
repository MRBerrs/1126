window.STORY_CHAPTERS_I18N = {
  en: {
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
  },

  tr: {
    intro: {
      bg: "bg-chat",
      lines: [
        "Her şey basit mesajlarla başladı.",
        "Farklı ülkeler, farklı zaman dilimleri.",
        "Ama duygular...",
        "gerçek gibi hissetti."
      ],
      next: "conflict"
    },

    conflict: {
      bg: "bg-chat",
      lines: [
        "Sonra geceler uzadı.",
        "Mesajlar kısaldı.",
        "Aşırı düşünceler büyümeye başladı.",
        "Küçük yanlış anlaşılmalar...",
        "tartışmalara dönüştü."
      ],
      choices: [
        { text: "Sessiz kal", next: "silent" },
        { text: "Özür dile", next: "sorry" },
        { text: "Karşılık ver", next: "fight" }
      ]
    },

    silent: {
      lines: [
        "Sessizlik daha güvenli hissettirdi.",
        "Ama yavaşça mesafe yarattı."
      ],
      next: "ending"
    },

    sorry: {
      bg: "bg-sorry",
      lines: [
        "Gururunu yutmayı seçtin.",
        "Özürler teker teker gönderildi."
      ],
      next: "ending"
    },

    fight: {
      bg: "bg-argue",
      lines: [
        "Sözler düşünmeden söylendi.",
        "Mesafe daha da ağırlaştı."
      ],
      next: "ending"
    }
  }
};  