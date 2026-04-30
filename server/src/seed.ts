import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Education from './models/Education';
import Experience from './models/Experience';
import Project from './models/Project';
import Skill from './models/Skill';

dotenv.config();

const dummyUser = {
  name: "Alex Developer",
  title: "Senior Full-Stack Engineer",
  bio: "I build exceptional and accessible digital experiences for the web. With over 5 years of experience in modern JavaScript frameworks, I turn complex problems into elegant solutions.",
  email: "alex@example.com",
  location: "San Francisco, CA",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
};

const dummyEducation = [
  { degree: "B.S. Computer Science", institution: "Tech University", year: "2015 - 2019" }
];

const dummyExperience = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Corp",
    duration: "2021 - Present",
    description: "Led the frontend migration to Next.js, improving page load speed by 40%. Mentored junior developers and established code quality standards."
  },
  {
    role: "Full Stack Developer",
    company: "StartUp Inc",
    duration: "2019 - 2021",
    description: "Developed scalable APIs using Node.js and MongoDB. Built responsive UIs with React and Tailwind CSS."
  }
];

const dummyProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    githubLink: "#",
    liveLink: "#"
  },
  {
    title: "AI Writing Assistant",
    description: "An AI-powered application that helps writers overcome block and generate creative ideas using OpenAI API.",
    techStack: ["React", "Express", "OpenAI API", "Tailwind"],
    githubLink: "#",
    liveLink: "#"
  }
];

const dummySkills = [
  { name: "React / Next.js", level: "Expert" },
  { name: "Node.js / Express", level: "Advanced" },
  { name: "TypeScript", level: "Advanced" },
  { name: "MongoDB", level: "Advanced" },
  { name: "Tailwind CSS", level: "Expert" },
  { name: "GraphQL", level: "Intermediate" }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});

    // Insert new data
    await User.create(dummyUser);
    await Education.insertMany(dummyEducation);
    await Experience.insertMany(dummyExperience);
    await Project.insertMany(dummyProjects);
    await Skill.insertMany(dummySkills);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
