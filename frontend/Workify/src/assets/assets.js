import Workify_logo from './Workify_logo.png';
import Hero_sec from './hero_sec.png'
import google from './google.png';
import insta from './instagram.png';
import mit from './mit.png';
import microsoft from './microsoft.png';
import airbnb from './airbnb.png';
import nvidia from './nvidia.png';
import teamwork from './teamwork.png';
import facebook from './facebook.png'
import insta_black from './insta_black.png'
import twitter from './twitter.png'
import ytube from './ytube.png'
import apple from './apple.png'
import android from './android.png'
import web_dev_1 from './web_dev_icon.png'
import web_dev_2 from './web-dev-icon_2.png'
import graphic_designer from './graphic_design-rbg.png/'
import default_background_img from './background_image.png'
import default_profile_icon from './default_profile_icon.png'
import workify_logo_2 from './WORKIFY.svg';


export const assets = {
    Workify_logo,
    workify_logo_2,
    Hero_sec,
    google,
    insta,
    mit,
    microsoft,
    nvidia,
    airbnb,
    teamwork,
    facebook,
    insta_black,
    twitter,
    ytube,
    apple,
    android,
    web_dev_1,
    web_dev_2,
    graphic_designer,
    default_background_img,
    default_profile_icon
};

const clientFooter = [
    "How to hire",
    "Talent Marketplace",
    "Project Catalog",
    "Hire an agency",
    "Enterprise",
    "Business Plus",
    "Any Hire",
    "Contract-to-hire",
    "Direct Contracts",
    "Hire worldwide",
    "Hire in the USA"
];

const freeLancerFooter = [
    "How to find work",
    "Direct Contracts",
    "Find freelance jobs worldwide",
    "Find freelance jobs in the USA",
    "Win work with ads",
    "Exclusive resources with Freelancer Plus"
]

const follow = [
    {
        "id":1,
        "img":assets.insta_black,
        "url":"https:/www.instagram.com",
        "desc":"instagram"
    },
    {
        "id":2,
        "img":assets.facebook,
        "url":"https:/www.facebook.com",
        "desc":"facebook" 
    },
    {
        "id":3,
        "img":assets.twitter,
        "url":"https:/www.twitter.com",
        "desc":"twitter"
    },
    {
        "id":4,
        "img":assets.ytube,
        "url":"https:/www.youtube.com",
        "desc":"youtube"
    }
]


  
  const Services = [
    {
      title: "Web Development",
      description: "Custom websites, web apps, and e-commerce solutions using modern technologies.",
      performance: "High-speed, SEO-optimized, and mobile-responsive websites.",
      tools: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
      img:web_dev_1,
      rating: 4.9,
      projectsCompleted: 50,
       color:"#015551"
    },
    {
      title: "UI/UX Design",
      description: "Creating visually appealing and user-friendly designs for web and mobile applications.",
      performance: "Pixel-perfect designs with high usability and accessibility.",
      tools: ["Figma", "Adobe XD", "Sketch"],
     
      rating: 4.8,
      projectsCompleted: 40,
       color:"#57B4BA"
    },
    {
      title: "Graphic Design",
      description: "Logos, branding, social media posts, and marketing materials for businesses.",
      performance: "Creative and high-quality visuals with brand consistency.",
      tools: ["Adobe Photoshop", "Illustrator", "Canva"],
      
      rating: 4.7,
      projectsCompleted: 60,
      color:"#A62C2C"
    },
    {
      title: "Interior Design",
      description: "Modern and aesthetic interior designs for homes, offices, and commercial spaces.",
      performance: "3D visualizations and space optimization for stunning interiors.",
      tools: ["AutoCAD", "SketchUp", "3ds Max"],
     
      rating: 4.9,
      projectsCompleted: 30,
      color:"#FE4F2D"
    },
    {
      title: "Digital Marketing",
      description: "SEO, PPC advertising, and social media marketing to grow online businesses.",
      performance: "Increased engagement, leads, and sales through strategic campaigns.",
      tools: ["Google Ads", "Facebook Ads", "SEMRush"],
      
      rating: 4.9,
      projectsCompleted: 45,
      color:"#E50046"
    },
    {
      title: "Mobile App Development",
      description: "Custom mobile applications for Android and iOS platforms.",
      performance: "Fast, scalable, and user-friendly mobile apps.",
      tools: ["React Native", "Flutter", "Firebase"],
     
      rating: 4.8,
      projectsCompleted: 35,
      color:"#98D8EF"
    },
    {
      title: "Video Editing",
      description: "Professional video editing for commercials, YouTube, and social media.",
      performance: "Smooth transitions, color grading, and cinematic effects.",
      tools: ["Adobe Premiere Pro", "Final Cut Pro", "After Effects"],
      
      rating: 4.7,
      projectsCompleted: 50,
      color:"#9ABF80"
    },
    {
      title: "Photography",
      description: "High-quality product, portrait, and event photography services.",
      performance: "Professional shots with post-processing and retouching.",
      tools: ["Adobe Lightroom", "Photoshop", "Canon/Nikon Cameras"],
      
      rating: 4.9,
      projectsCompleted: 40,
      color:"#FD8B51"
    }
  ];
  
  
  



export {clientFooter , freeLancerFooter , follow  , Services};