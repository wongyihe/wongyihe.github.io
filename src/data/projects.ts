import imgRectangle3 from "../assets/img/seesawbot_img.png";
import imgRectangle7 from "../assets/img/invertedtinge_img.png";
import imgStarRescue from "../assets/img/starrescue_img.png";

export const projects = [
  {
    title: "SeeSawBot",
    dates: "Sept 2024 - Sept 2025",
    category: "Human-AI Interaction",
    details: [
      "SeeSawBot is a multi-user, context-aware chatbot designed to explore how large language models can mediate, facilitate, or disrupt group dynamics in collaborative environments. Deployed through Slack, the bot orchestrates \"seesaw-like\" oscillations between cooperation and tension, surfacing the hopes and fears people have when working alongside AI.",
      "Tech Stack: LLMs, Slack API"
    ],
    media: {
      type: 'image' as const,
      src: imgRectangle3,
      alt: "SeeSawBot interface mockup"
    },
    links: [
      {
        label: "CHI 2026",
        url: "/assets/pdf/Wang et al. - 2026 - SeeSawBot An LLM-Driven Chatbot Mediating Across Private and Shared Slack Channels to Support Team.pdf"
      }
    ]
  },
  {
    title: "StarRescue",
    dates: "Jul 2021 - Sep 2022",
    category: "Technology-Supported Learning",
    details: [
      "StarRescue is a collaborative tablet game for autistic children that visually conveys the concept of turn-taking by transforming a familiar Pong-style interaction into a playful, narrative-driven, level-progressive game.",
      "Tech Stack: Unity (C#), Multi-touch Interfaces, iOS Deployment",
      "Research Methods: Semi-structured Interviews, Playtesting, Behavioral Evaluation, Controlled User Study"
    ],
    media: {
      type: 'image' as const,
      src: imgStarRescue,
      alt: "StarRescue game interface with 'Star Rescue' text in Chinese"
    },
    links: [
      {
        label: "CHI PLAY 2022",
        url: "/assets/pdf/Huang et al. - 2022 - StarRescue Transforming A Pong Game to Visually C.pdf"
      },
      {
        label: "CHI 2024",
        url: "/assets/pdf/Bei et al. - 2024 - StarRescue the Design and Evaluation of A Turn-Taking Collaborative Game for Facilitating Autistic.pdf"
      }
    ]
  },
  {
    title: "Inverted Tinge",
    dates: "Dec 2018 - Jul 2019",
    category: "Interactive Installation",
    details: [
      "Inverted Tinge is an interactive water-painting installation that asks: How do we paint in the water?",
      "The work was exhibited at Songshan Cultural and Creative Park, Taipei, Taiwan (2019).",
      "Tech Stack: Arduino, Hall Effect Sensors, Motor Control"
    ],
    media: {
      type: 'image' as const,
      src: imgRectangle7,
      alt: "Inverted Tinge installation"
    },
    links: [
      {
        label: "Songshan 2019",
        url: "https://www.youtube.com/watch?v=wZ2kF5PmpBs"
      }
    ]
  }
];
