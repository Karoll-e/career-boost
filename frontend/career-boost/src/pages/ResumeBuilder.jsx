import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Download,
  Edit,
  Plus,
  FileText
} from "lucide-react";

const ResumeBuilder = () => {
  // Sample resume data - this will be replaced with dynamic data later
  const [resumeData] = useState({
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "www.alexjohnson.dev",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      summary: "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about creating scalable web applications and leading development teams to deliver high-quality software solutions."
    },
    experience: [
      {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "Present",
        current: true,
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Mentored 3 junior developers and conducted code reviews",
          "Reduced application load time by 40% through performance optimization",
          "Implemented CI/CD pipelines reducing deployment time by 60%"
        ]
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: [
          "Developed and maintained React-based dashboard with 50+ components",
          "Built RESTful APIs using Node.js and Express serving 100k+ requests/day",
          "Collaborated with design team to implement responsive UI/UX designs",
          "Integrated third-party APIs including Stripe, SendGrid, and AWS services"
        ]
      },
      {
        id: 3,
        title: "Frontend Developer",
        company: "Digital Agency Pro",
        location: "New York, NY",
        startDate: "2019-01",
        endDate: "2020-05",
        current: false,
        description: [
          "Created responsive websites for 20+ clients using React and Vue.js",
          "Optimized website performance achieving 95+ Google Lighthouse scores",
          "Implemented modern CSS techniques including Flexbox and Grid",
          "Worked closely with clients to gather requirements and deliver solutions"
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2015-09",
        endDate: "2019-05",
        gpa: "3.8",
        achievements: [
          "Magna Cum Laude",
          "Dean's List for 6 semesters",
          "CS Department Outstanding Student Award"
        ]
      }
    ],
    skills: {
      technical: [
        "JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", 
        "Java", "HTML5", "CSS3", "SASS", "Tailwind CSS", "MongoDB", "PostgreSQL", 
        "MySQL", "Redis", "AWS", "Docker", "Kubernetes", "Git", "Jest", "Cypress"
      ],
      soft: [
        "Team Leadership", "Project Management", "Problem Solving", 
        "Communication", "Agile/Scrum", "Code Review", "Mentoring"
      ]
    },
    projects: [
      {
        id: 1,
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React frontend and Node.js backend",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
        link: "https://github.com/alexjohnson/ecommerce-platform",
        highlights: [
          "Implemented secure payment processing with Stripe",
          "Built admin dashboard for inventory management",
          "Achieved 99.9% uptime with AWS infrastructure"
        ]
      },
      {
        id: 2,
        name: "Task Management App",
        description: "Collaborative task management application with real-time updates",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        link: "https://github.com/alexjohnson/task-manager",
        highlights: [
          "Real-time collaboration using WebSocket connections",
          "Drag-and-drop interface with React DnD",
          "Role-based access control and user authentication"
        ]
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-06",
        credentialId: "AWS-SA-2023-001234"
      },
      {
        id: 2,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2022-11",
        credentialId: "META-REACT-2022-5678"
      }
    ]
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short" 
    });
  };

  const formatDateRange = (startDate, endDate, current) => {
    const start = formatDate(startDate);
    const end = current ? "Present" : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  Resume Builder
                </h1>
                <p className="text-gray-600">
                  Create and customize your professional resume with our AI-powered builder
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{resumeData.personalInfo.fullName}</h3>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{resumeData.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{resumeData.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{resumeData.personalInfo.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span>{resumeData.personalInfo.website}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Linkedin className="w-4 h-4" />
                        <span>{resumeData.personalInfo.linkedin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Github className="w-4 h-4" />
                        <span>{resumeData.personalInfo.github}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Professional Summary</h4>
                    <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-blue-200 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1"></div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.location}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        </Badge>
                      </div>
                      <ul className="space-y-1 text-gray-700">
                        {exp.description.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.projects.map((project) => (
                    <div key={project.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-gray-600 mt-1">{project.description}</p>
                        </div>
                        {project.link && (
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            View
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <ul className="space-y-1 text-sm text-gray-700">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-green-600 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.location}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDateRange(edu.startDate, edu.endDate, false)}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-700 mb-2">GPA: {edu.gpa}/4.0</p>
                      )}
                      {edu.achievements && (
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.technical.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.soft.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-orange-600 text-sm font-medium">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{formatDate(cert.date)}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {cert.credentialId}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Plus className="w-4 h-4" />
                    Add Certification
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;