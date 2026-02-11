import imgPortrait from "../assets/img/headshot_img.png";

export const bioData = {
  header: "Thanks for reading all the way through!",
  description: [
    "My dissertation examines how context-aware, cross-space AI mediators can be designed to reason about group-level Theory of Mind, and how such mediation reshapes group dynamics and relational agency in practice.",
    "Drawing on insights from critical disability studies and culturally situated computing, my work advances a participatory view of knowledge-making, examining computational systems as sociotechnical actors that shape, limit, and reconfigure power dynamics in groups."
  ],
  portrait: {
    src: imgPortrait,
    alt: "Yihe Eve Wang"
  },
  connect: {
    title: "Connect",
    links: [
      { label: "Email", url: "mailto:ywan1125@ucsc.edu", type: "email" },
      { label: "Linkedin", url: "https://www.linkedin.com/in/wangyihe/", type: "external" },
      { label: "GitHub", url: "https://github.com/wongyihe", type: "external" },
      { label: "CV", url: "https://docs.google.com/document/d/19v-5khckm2q5-35_Ebb4LmhKCcHK2As-PKVZJUKHlP8/edit?usp=sharing", type: "external" }
    ]
  }
};
