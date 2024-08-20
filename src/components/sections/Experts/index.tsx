"use client";
import { Search, Expert, End } from "@/components";
import styles from "./style.module.scss";

const experts = [
  {
    id: "1",
    avatar: null,
    name: "Jeremy Thorne",
    description: "Specializes in modern web design and responsive development.",
    tags: [
      {
        id: 1,
        name: "Website Design & Development",
      },
      { id: 2, name: "Graphic Design" },
    ],
    hour_price: 60,
    location: "San Francisco, CA",
  },
  {
    id: "2",
    avatar: null,
    name: "Lila Caldwell",
    description:
      "Expert in mobile app development with a focus on user experience.",
    tags: [
      {
        id: 1,
        name: "Mobile Development",
      },
      { id: 2, name: "User Experience" },
    ],
    hour_price: 55,
    location: "New York, NY",
  },
  {
    id: "3",
    avatar: null,
    name: "Jane Williams",
    description:
      "Skilled graphic designer with over 10 years of experience in branding.",
    tags: [
      {
        id: 1,
        name: "Graphic Design",
      },
      { id: 2, name: "Branding" },
    ],
    hour_price: 50,
    location: "Austin, TX",
  },
  {
    id: "4",
    avatar: null,
    name: "Mike Johnson",
    description:
      "Professional copywriter specializing in SEO and content strategy.",
    tags: [
      {
        id: 1,
        name: "Copywriting",
      },
      { id: 2, name: "SEO" },
    ],
    hour_price: 45,
    location: "Denver, CO",
  },
  {
    id: "5",
    avatar: null,
    name: "Emily Brown",
    description:
      "Experienced social media manager for small to medium businesses.",
    tags: [
      {
        id: 1,
        name: "Social Media",
      },
      { id: 2, name: "Marketing" },
    ],
    hour_price: 40,
    location: "Seattle, WA",
  },
  {
    id: "6",
    avatar: null,
    name: "David Lee",
    description:
      "Software engineer with expertise in backend development and APIs.",
    tags: [
      {
        id: 1,
        name: "Backend Development",
      },
      { id: 2, name: "APIs" },
    ],
    hour_price: 70,
    location: "Boston, MA",
  },
  {
    id: "7",
    avatar: null,
    name: "Sarah Kim",
    description:
      "Specializes in e-commerce solutions and online store management.",
    tags: [
      {
        id: 1,
        name: "E-commerce",
      },
      { id: 2, name: "Store Management" },
    ],
    hour_price: 65,
    location: "Chicago, IL",
  },
  {
    id: "8",
    avatar: null,
    name: "Robert Wilson",
    description: "Expert in digital marketing and growth hacking strategies.",
    tags: [
      {
        id: 1,
        name: "Digital Marketing",
      },
      { id: 2, name: "Growth Hacking" },
    ],
    hour_price: 55,
    location: "Miami, FL",
  },
  {
    id: "9",
    avatar: null,
    name: "Jessica Taylor",
    description:
      "Professional photographer with a focus on lifestyle and product shoots.",
    tags: [
      {
        id: 1,
        name: "Photography",
      },
      { id: 2, name: "Lifestyle" },
    ],
    hour_price: 50,
    location: "Los Angeles, CA",
  },
  {
    id: "10",
    avatar: null,
    name: "Chris Davis",
    description: "Experienced project manager in software development and IT.",
    tags: [
      {
        id: 1,
        name: "Project Management",
      },
      { id: 2, name: "IT" },
    ],
    hour_price: 60,
    location: "Atlanta, GA",
  },
  {
    id: "11",
    avatar: null,
    name: "Laura Martinez",
    description:
      "Expert in user interface design for mobile and web applications.",
    tags: [
      {
        id: 1,
        name: "UI Design",
      },
      { id: 2, name: "Mobile Applications" },
    ],
    hour_price: 45,
    location: "Portland, OR",
  },
  {
    id: "12",
    avatar: null,
    name: "James Anderson",
    description:
      "Data scientist specializing in machine learning and AI solutions.",
    tags: [
      {
        id: 1,
        name: "Data Science",
      },
      { id: 2, name: "AI" },
    ],
    hour_price: 80,
    location: "San Diego, CA",
  },
  {
    id: "13",
    avatar: null,
    name: "Linda Clark",
    description:
      "Experienced business consultant for startups and small businesses.",
    tags: [
      {
        id: 1,
        name: "Business Consulting",
      },
      { id: 2, name: "Startups" },
    ],
    hour_price: 70,
    location: "Houston, TX",
  },
  {
    id: "14",
    avatar: null,
    name: "Kevin Lewis",
    description:
      "Full-stack developer with expertise in JavaScript frameworks.",
    tags: [
      {
        id: 1,
        name: "Full-Stack Development",
      },
      { id: 2, name: "JavaScript" },
    ],
    hour_price: 65,
    location: "Dallas, TX",
  },
  {
    id: "15",
    avatar: null,
    name: "Amanda Hall",
    description: "Expert in content creation and digital storytelling.",
    tags: [
      {
        id: 1,
        name: "Content Creation",
      },
      { id: 2, name: "Digital Storytelling" },
    ],
    hour_price: 50,
    location: "Nashville, TN",
  },
];

export const Experts = () => {
  const handleSearch = (value: string) => {
    // console.log(value);
  };

  return (
    <div className={styles.experts}>
      <div className={styles.experts__header}>
        <h2 className="page__title">Experts</h2>
        <Search
          placeholder="Find an Expert by Name or Tags"
          icon="/icons/search-icon.svg"
          clear
          onChange={(value) => handleSearch(value)}
        />
      </div>
      <div className={styles.experts__body}>
        <div className={styles.experts__list}>
          {experts.map((expert) => (
            <div key={expert.id} className={styles.experts__list_item}>
              <Expert {...expert} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.experts__footer}>
        <End
          text="You have viewed all Experts that are available at the moment"
          icon="/icons/eye-icon-large.svg"
        />
      </div>
    </div>
  );
};
