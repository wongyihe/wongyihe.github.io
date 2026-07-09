import imgRectangle3 from "../assets/img/seesawbot_img.png";
import imgRectangle7 from "../assets/img/invertedtinge_img.png";
import imgStarRescue from "../assets/img/starrescue_img.png";
// Figures extracted from the project papers (public/assets/pdf)
import imgSsbPipeline from "../assets/img/projects/seesawbot/pipeline-sense-plan-act.png";
import imgSsbCrossSpace from "../assets/img/projects/seesawbot/cross-space-interaction.png";
import imgSsbDelegation from "../assets/img/projects/seesawbot/private-delegation-example.png";
import imgSrLevels from "../assets/img/projects/starrescue/four-level-scaffold.png";
import imgSrRewards from "../assets/img/projects/starrescue/reward-spacecraft.png";
import imgSrCoplay from "../assets/img/projects/starrescue/coplay-teaser.png";
import imgSrSuperpower from "../assets/img/projects/starrescue/superpower-chain.png";
import imgItTank from "../assets/img/projects/inverted-tinge/pigment-tank.jpg";
import imgItModule from "../assets/img/projects/inverted-tinge/mixing-module-diagram.png";
import imgItColor from "../assets/img/projects/inverted-tinge/color-calibration.jpg";
import imgItWires from "../assets/img/projects/inverted-tinge/wire-modules.jpg";
import imgItSyringes from "../assets/img/projects/inverted-tinge/syringe-array.jpg";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

/** A captioned image rendered as a <figure> inside a section. */
export interface ProjectFigure {
  src: string;
  alt: string;
  caption: string;
}

/**
 * A single long-form section on a project detail page. `body` paragraphs and
 * `list` items both support inline markdown links: [text](url). `quote`
 * renders as a styled pull quote after the body; `figures` render last,
 * each with its caption.
 */
export interface ProjectSection {
  heading: string;
  body?: string[];
  list?: string[];
  quote?: { text: string; attribution?: string };
  figures?: ProjectFigure[];
}

/**
 * Optional case-study content for a project. Only projects that have a `detail`
 * get a dedicated page at /projects/<slug>/ and a "Read more" link on the card.
 * Any field left out is simply not rendered.
 */
export interface ProjectDetail {
  slug: string;
  summary: string; // one-sentence tagline shown under the title
  hero?: ProjectMedia; // optional; falls back to the card `media`
  meta: {
    role?: string;
    year?: string;
    collaborators?: string[];
    venue?: string;
    methods?: string[];
    technologies?: string[];
  };
  sections: ProjectSection[];
  publications?: ProjectLink[];
  /** Heading for the publications/links block; defaults to "Publications and links". */
  linksLabel?: string;
  media?: ProjectMedia[]; // optional image gallery below the body
  citation?: string; // optional formatted citation string
}

export interface Project {
  title: string;
  dates: string;
  category: string;
  details: string[];
  media: ProjectMedia;
  links?: ProjectLink[];
  detail?: ProjectDetail;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const projects: Project[] = [
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
    ],
    // Full case-study page. Content is drafted from the CHI 2026 paper
    // (Wang et al., DOI 10.1145/3772318.3791880); edit freely per section.
    detail: {
      slug: "seesawbot",
      summary:
        "An LLM-driven chatbot that mediates across private DMs and public Slack channels to support team dynamics in real classroom project teams.",
      meta: {
        role: "First author — led system design, deployment & analysis",
        year: "2024 – 2025",
        collaborators: [
          "Kehua Lei",
          "Sheng-Yang Chiu",
          "Katherine Isbister",
          "David Lee",
          "Kathryn E. Ringland"
        ],
        venue: "CHI 2026 (ACM CHI Conference on Human Factors in Computing Systems), Barcelona",
        methods: [
          "Technology probe",
          "Formative focus groups",
          "8-week field deployment",
          "Bi-weekly reflection surveys",
          "Post-deployment interviews",
          "Thematic analysis"
        ],
        technologies: ["GPT-4o", "Slack API", "Google Cloud"]
      },
      sections: [
        {
          heading: "Overview",
          body: [
            "SeeSawBot is an LLM-driven Slack chatbot that mediates team communication across two kinds of spaces at once: private direct messages and public team channels. I deployed it for eight weeks in real undergraduate project teams as a technology probe — a deliberately evolving prototype used to study how people actually work with it — asking a question most AI mediators ignore: not just when, what, or to whom an AI should intervene, but where."
          ]
        },
        {
          heading: "Why this project",
          body: [
            "Teams don't communicate in one place. People test concerns quietly in private before raising them in the group, and work through disagreements one-on-one before discussing them publicly. These movements between \"backstage\" and \"frontstage\" shape how people open up, coordinate, and repair relationships.",
            "Yet most computational mediators live in a single space — a group channel or a private chat — and miss exactly the moments where communication has to cross that boundary. SeeSawBot was built to probe this gap: how do group dynamics unfold when an AI mediator can engage teams across private DMs and public channels?"
          ]
        },
        {
          heading: "What I built",
          body: [
            "SeeSawBot is a GPT-4o-powered Slack chatbot that operates in both team channels and private DMs. Teams could tag it or message it directly (reactive), or let it monitor conversations and step in on its own (proactive) — for example, following up privately with someone after a tense public thread.",
            "Under the hood it runs a sense–plan–act pipeline: each incoming message is tagged by space (DM vs. channel), analyzed for task and emotional cues, and — if intervention seems warranted — the bot plans who to address, in which space, and with what framing before generating a response.",
            "The system evolved through four versions during deployment, each responding to student feedback:"
          ],
          list: [
            "V1 — baseline: weekly recap DMs and to-do reminders in the team channel.",
            "V2 — participation balancing: noticing and nudging quiet members.",
            "V3 — assignment-aware answers, grounded in the actual course specs.",
            "V4 — relationship-aware reasoning that tracked how teammates engaged with one another."
          ],
          figures: [
            {
              src: imgSsbPipeline,
              alt: "Diagram of SeeSawBot's sense-plan-act pipeline with long-term memory",
              caption:
                "Every message flows through a sense–plan–act pipeline: it's tagged by space, read for relational cues, then routed to the right person, in the right space, with the right framing."
            },
            {
              src: imgSsbCrossSpace,
              alt: "Slack mockup showing SeeSawBot responding proactively and reactively in a team channel and in a private DM",
              caption:
                "SeeSawBot in action across both spaces: nudging the team in the public channel while workshopping one member's idea privately — proactively or when asked."
            }
          ]
        },
        {
          heading: "How I studied it",
          body: [
            "The study had two phases. First, a formative study: 10 participants role-played scripted Slack scenarios (team formation, deadline pressure, disagreement) with an early prototype. This surfaced what people actually wanted from an AI mediator — and where they drew hard privacy lines around their DMs.",
            "Then the real deployment: eight weeks in an undergraduate course, with 18 Slack project teams of 5–6 students — 105 participants in total. Students reflected on the bot in bi-weekly surveys, and nine sat for hour-long post-deployment interviews. I analyzed everything through thematic analysis, treating the bot's frictions as design signals rather than failures."
          ]
        },
        {
          heading: "What I found",
          list: [
            "Cross-space mediation created new information flows. Students \"workshopped\" tentative ideas with the bot in private before it surfaced them to the group, and channel activity was reframed as personalized DM prompts — one student only realized they had been lurking when the bot nudged them privately, which got them participating again.",
            "SeeSawBot redistributed the social and emotional labor of teamwork. It acted as a gateway for hesitant voices, a participation balancer, and a social buffer: students delegated awkward accountability nudges (\"remind them — but don't tell them I told you\") to the bot, so reminders landed as neutral observations rather than personal critique.",
            "Where an intervention happens changes how it feels. Private DMs preserved autonomy — room to resist without reputational risk — while public channel prompts carried real weight and enforced accountability, but could feel like being \"called out.\"",
            "The bot's role shifted with team development: a playful icebreaker while teams formed, a tension-surfacer during conflict, part of informal stand-up routines as norms settled, and a third-party \"time/project manager\" once teams were performing.",
            "Mediation had clear limits: poorly timed interventions read as spam, and the bot could be manipulated or agree too readily instead of holding its own stance — a reminder that an AI mediator's authority is fragile and continually negotiated."
          ],
          figures: [
            {
              src: imgSsbDelegation,
              alt: "Anonymized DM excerpts: a student asks SeeSawBot to remind teammates without revealing who asked, and the bot delivers a neutral reminder",
              caption:
                "The social buffer in practice: a student privately delegates an awkward reminder, and SeeSawBot delivers it in a neutral voice — keeping the requester out of it."
            }
          ]
        },
        {
          heading: "Why it matters",
          body: [
            "The work positions where an AI intervenes as a first-class design variable — alongside the familiar when, what, and whom — showing how spatial placement shapes people's sense of autonomy, agency, and legitimacy.",
            "For anyone building AI teammates for real workspaces like Slack or Teams, the findings show these agents don't just relay information: they redistribute participation, authority, and emotional labor within a group. Designing and evaluating them means looking at relational dynamics across private and shared spaces, not just single-channel task outcomes."
          ]
        }
      ],
      publications: [
        {
          label: "Paper (PDF) — CHI 2026",
          url: "/assets/pdf/Wang et al. - 2026 - SeeSawBot An LLM-Driven Chatbot Mediating Across Private and Shared Slack Channels to Support Team.pdf"
        },
        {
          label: "ACM DOI",
          url: "https://dl.acm.org/doi/10.1145/3772318.3791880"
        }
      ],
      citation:
        "Yihe Wang, Kehua Lei, Sheng-Yang Chiu, Katherine Isbister, David T. Lee, and Kathryn E. Ringland. 2026. SeeSawBot: An LLM-Driven Chatbot Mediating Across Private and Shared Slack Channels to Support Team Dynamics. In Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems (CHI '26), April 13–17, 2026, Barcelona, Spain. ACM, New York, NY, USA, 23 pages. https://doi.org/10.1145/3772318.3791880"
    }
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
    ],
    // Case-study page. Content drawn from the CHI PLAY 2022 EA and CHI 2024
    // papers (both in public/assets/pdf); edit freely per section.
    detail: {
      slug: "starrescue",
      summary:
        "A two-player tablet game that makes turn-taking visible for autistic children by reimagining Pong as a cooperative rescue mission.",
      meta: {
        role: "Co-lead — game design & development (co-first author, CHI PLAY 2022)",
        year: "2021 – 2022",
        collaborators: [
          "Yuxuan Huang",
          "Tongxin Xiao",
          "Rongqi Bei",
          "Yajie Liu",
          "Ming Li",
          "Yuhang Zhao",
          "Zhicong Lu",
          "Xin Tong"
        ],
        venue: "CHI PLAY 2022 (Extended Abstracts) · CHI 2024",
        methods: [
          "Game design",
          "Playtesting",
          "Caregiver interviews",
          "Controlled user study"
        ],
        technologies: ["Unity (C#)", "Multi-touch tablets", "iOS"]
      },
      sections: [
        {
          heading: "Overview",
          body: [
            "StarRescue is a two-player tablet game that teaches turn-taking to young autistic children — not by enforcing rules, but by making the rhythm of taking turns something you can see. It reimagines Pong as a cooperative rescue mission, and grew from a design prototype (CHI PLAY 2022) into a controlled evaluation with 32 autistic children (CHI 2024)."
          ]
        },
        {
          heading: "Why this project",
          body: [
            "Turn-taking is one of the most fundamental social skills, and one many autistic children find difficult. Most digital interventions handle it with enforced rules — the computer simply tells you when it's your turn — which often fails for younger children who find abstract instructions hard to follow.",
            "StarRescue takes a different approach: instead of telling children when it's their turn, show them. A ball bouncing between two paddles makes the whole cycle of turn-taking — pay attention, wait, respond — visible on screen."
          ],
          quote: {
            text: "Ball movement can make children willingly wait for their turn!",
            attribution: "— a mother of an autistic child, from the pilot study"
          }
        },
        {
          heading: "What I designed and built",
          body: [
            "We transformed Pong from a competitive game into a collaborative one: two children sit around a shared tablet and bounce a ball back and forth to zap alien monsters and rescue an occupied planet. I co-led the game's design and development, built in Unity (C#) for multi-touch iOS tablets.",
            "Good turn-taking earns diamonds, which players spend on building a shared spacecraft — so the reward itself is something the pair creates together."
          ],
          figures: [
            {
              src: imgSrCoplay,
              alt: "Illustration of two children playing StarRescue together on one shared tablet",
              caption:
                "Two children share one tablet — the game is played face to face, not screen to screen."
            },
            {
              src: imgSrRewards,
              alt: "Two game screenshots: a results page showing earned diamonds, and a spacecraft assembled from purchased components",
              caption:
                "Turn-taking earns diamonds; the pair spends them on parts for a spacecraft they build together."
            }
          ]
        },
        {
          heading: "Interaction design",
          body: [
            "The game scaffolds collaboration step by step, following a four-stage model we designed — from building solo confidence to free collaboration:"
          ],
          list: [
            "Practice mode — a child plays alone against a \"wall,\" getting comfortable with the mechanics at their own pace.",
            "Level 1 — partners join, each responsible for their own half of the field.",
            "Level 2 — each player gets a unique superpower: one can freeze a flying monster, the other can destroy it. Neither can succeed alone.",
            "Level 3 — both players wield all superpowers and freely negotiate how to collaborate."
          ],
          figures: [
            {
              src: imgSrLevels,
              alt: "Four game screenshots showing practice mode, Level 1, Level 2 with assigned superpowers, and Level 3 with all superpowers",
              caption:
                "The four levels, left to right: solo practice against a wall, a shared field, complementary superpowers, then free collaboration."
            },
            {
              src: imgSrSuperpower,
              alt: "Icon sequence: freeze power freezes a flying monster, then fire power destroys it",
              caption:
                "The superpower chain behind Level 2: one player freezes a flying monster, the other destroys it — neither can do it alone."
            }
          ]
        },
        {
          heading: "What this project demonstrates",
          list: [
            "Turning an abstract social concept into something visible and playable — the turn-taking \"rules\" live in the game mechanics themselves, not in instructions.",
            "Designing scaffolded difficulty: interdependence is introduced gradually, so children build confidence before they're asked to coordinate.",
            "Carrying a project through the full arc: design concept → Unity prototype → pilot interviews with 9 caregivers (parents and special-education teachers) → a controlled study with 32 autistic children, published at CHI 2024.",
            "The evaluation found StarRescue has strong potential to foster turn-taking and social communication skills — prompting, negotiating, allocating tasks — both within the game and beyond it."
          ]
        }
      ],
      publications: [
        {
          label: "Design paper (PDF) — CHI PLAY 2022",
          url: "/assets/pdf/Huang et al. - 2022 - StarRescue Transforming A Pong Game to Visually C.pdf"
        },
        {
          label: "DOI — CHI PLAY 2022",
          url: "https://doi.org/10.1145/3505270.3558320"
        },
        {
          label: "Trailer — CHI PLAY 2022",
          url: "https://www.youtube.com/watch?v=PCWmleTNXPo"
        },
        {
          label: "Evaluation paper (PDF) — CHI 2024",
          url: "/assets/pdf/Bei et al. - 2024 - StarRescue the Design and Evaluation of A Turn-Taking Collaborative Game for Facilitating Autistic.pdf"
        },
        {
          label: "DOI — CHI 2024",
          url: "https://doi.org/10.1145/3613904.3642829"
        },
        {
          label: "Video — CHI 2024",
          url: "https://www.youtube.com/watch?v=9A4jfRjnGWQ"
        }
      ],
      citation:
        "Rongqi Bei, Yajie Liu, Yihe Wang, Yuxuan Huang, Ming Li, Yuhang Zhao, and Xin Tong. 2024. StarRescue: the Design and Evaluation of A Turn-Taking Collaborative Game for Facilitating Autistic Children's Social Skills. In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '24), May 11–16, 2024, Honolulu, HI, USA. ACM, New York, NY, USA, 19 pages. https://doi.org/10.1145/3613904.3642829"
    }
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
    ],
    // Case-study page. Content drawn from the archived portfolio write-up
    // (wongyihe/archive-portfolio, _portfolio/invertedtinge.md).
    detail: {
      slug: "inverted-tinge",
      summary:
        "An interactive water-painting installation that mixes and injects pigments into a water column — asking: how do we paint in the water?",
      meta: {
        role: "Developer — physical prototyping",
        year: "2018 – 2019 (undergraduate graduation project)",
        venue: "Exhibited at Songshan Cultural and Creative Park, Taipei, Taiwan (2019)",
        methods: ["Physical prototyping", "Iterative prototyping", "Color calibration"],
        technologies: ["Arduino", "Hall-effect sensors", "Motor control", "CMYW pigment system"]
      },
      sections: [
        {
          heading: "Overview",
          body: [
            "Inverted Tinge is an interactive installation that paints in water: motor-driven syringe modules mix cyan, magenta, yellow, and white pigments, then release them into a water column, where they bloom into slow, unrepeatable paintings. I built the physical prototype — the mixing hardware, the color pipeline, and the wiring that kept it alive through a public exhibition."
          ],
          figures: [
            {
              src: imgItTank,
              alt: "A tall water tank with magenta and yellow pigment clouds diffusing through it",
              caption: "Pigments released into the water column — the painting paints itself."
            }
          ]
        },
        {
          heading: "What I built",
          body: [
            "The heart of the installation is a set of detachable color-mixing modules. In each one, a motor drives a screw-and-stud linkage that pushes a syringe piston: pulling draws CMYW pigments in, pushing injects the mixed color into the water. A Hall-effect sensor tracks the piston's position, and a spring-mounted panel absorbs motor vibration.",
            "The modules connect into a color-supply network of pipelines and T- and Y-connectors, so one set of pigment reservoirs feeds every injection point. Everything was designed to be detachable — built fast, and serviceable during the exhibition."
          ],
          figures: [
            {
              src: imgItModule,
              alt: "Labeled diagram of the color-mixing module: syringe, stud, coupling, Hall-effect sensor, motor, and CMYW pipelines",
              caption:
                "Each mixing module: a motor-driven syringe with Hall-effect position sensing, fed by CMYW pigment lines."
            }
          ]
        },
        {
          heading: "Getting the colors right",
          body: [
            "Screens think in RGB; pigments don't. I wrote a conversion that maps RGB to a CMYW mix — using white pigment for lightness, since you can't mix white from CMY — so the system could take a target color and translate it into syringe volumes.",
            "The math alone wasn't enough: real pigments have different densities, so equal volumes don't mix to the expected color. I calibrated the algorithm by hand — mixing physical swatches, comparing them against the digital targets, and correcting the pigment proportions until they matched."
          ],
          figures: [
            {
              src: imgItColor,
              alt: "A hand-painted swatch card held next to a laptop showing a digital color chart",
              caption: "Calibrating reality against the screen: hand-mixed swatches vs. the target digital palette."
            }
          ]
        },
        {
          heading: "Prototyping and process",
          body: [
            "The installation went through three prototypes: a throw-away version to test water pressure and injection, an incremental version for the pigment supply and mixing algorithm, and a full-height evolutionary version to test pressure and waterproofing at exhibition scale.",
            "Hard-won lesson from a previous installation: wiring is where exhibitions die. I designed detachable wire modules that sped up production, survived transport, and made on-site maintenance possible during the show."
          ],
          figures: [
            {
              src: imgItSyringes,
              alt: "Close-up of the syringe and valve array mounted on the installation frame",
              caption: "The injection plumbing: syringe modules and valves feeding the water column."
            },
            {
              src: imgItWires,
              alt: "A dense array of red, yellow, and blue wires connecting the module electronics",
              caption: "Hundreds of connections, organized into detachable wire modules — designed to be serviceable mid-exhibition."
            }
          ]
        },
        {
          heading: "What this project demonstrates",
          list: [
            "End-to-end physical computing: from Arduino control and sensing to pumps, plumbing, and waterproofing.",
            "Working across software and matter — a color-conversion algorithm is only half the job; the other half is calibrating it against real pigments.",
            "Designing for the exhibition floor: modular, detachable everything, because the piece has to survive transport, humidity, and three weeks of visitors."
          ]
        }
      ],
      linksLabel: "Links",
      publications: [
        {
          label: "Exhibition video — Songshan 2019",
          url: "https://www.youtube.com/watch?v=wZ2kF5PmpBs"
        },
        {
          label: "System test — color supply",
          url: "https://www.youtube.com/watch?v=7uOCZ9BqnfQ"
        }
      ]
    }
  }
];
