import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Input from "../components/Inputs/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { X, ArrowLeft, Briefcase, Target, BookOpen, FileText } from "lucide-react";
import SpinnerLoader from "../components/Loader/SpinnerLoader";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

const EditInterviewSession = () => {
  // IT profession options for the role dropdown
  const roleOptions = [
    { value: "frontend-developer", label: "Frontend Developer" },
    { value: "backend-developer", label: "Backend Developer" },
    { value: "full-stack-developer", label: "Full Stack Developer" },
    { value: "devops-engineer", label: "DevOps Engineer" },
    { value: "ui-ux-designer", label: "UI/UX Designer" },
    { value: "data-scientist", label: "Data Scientist" },
    { value: "data-analyst", label: "Data Analyst" },
    { value: "mobile-developer", label: "Mobile Developer" },
    { value: "ios-developer", label: "iOS Developer" },
    { value: "android-developer", label: "Android Developer" },
    { value: "qa-engineer", label: "QA Engineer" },
    { value: "software-engineer", label: "Software Engineer" },
    { value: "machine-learning-engineer", label: "Machine Learning Engineer" },
    { value: "cloud-architect", label: "Cloud Architect" },
    { value: "cybersecurity-specialist", label: "Cybersecurity Specialist" },
    { value: "product-manager", label: "Product Manager (Technical)" },
    { value: "technical-lead", label: "Technical Lead" },
    { value: "solutions-architect", label: "Solutions Architect" },
    { value: "database-administrator", label: "Database Administrator" },
    { value: "game-developer", label: "Game Developer" },
    { value: "blockchain-developer", label: "Blockchain Developer" },
    { value: "embedded-systems-engineer", label: "Embedded Systems Engineer" },
    { value: "site-reliability-engineer", label: "Site Reliability Engineer (SRE)" },
    { value: "technical-writer", label: "Technical Writer" },
  ];

  // Experience level options with year ranges
  const experienceOptions = [
    { value: "entry-level", label: "Entry Level (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid-level", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior (5-8 years)" },
    { value: "lead", label: "Lead (8-12 years)" },
    { value: "principal", label: "Principal (12+ years)" },
  ];

  // Tech stack options organized by categories
  const techStackOptions = [
    // Frontend Technologies
    { value: "react", label: "React", category: "Frontend" },
    { value: "vue", label: "Vue.js", category: "Frontend" },
    { value: "angular", label: "Angular", category: "Frontend" },
    { value: "javascript", label: "JavaScript", category: "Frontend" },
    { value: "typescript", label: "TypeScript", category: "Frontend" },
    { value: "html", label: "HTML", category: "Frontend" },
    { value: "css", label: "CSS", category: "Frontend" },
    { value: "sass", label: "Sass/SCSS", category: "Frontend" },
    { value: "tailwind", label: "Tailwind CSS", category: "Frontend" },
    { value: "bootstrap", label: "Bootstrap", category: "Frontend" },
    { value: "jquery", label: "jQuery", category: "Frontend" },
    { value: "webpack", label: "Webpack", category: "Frontend" },
    { value: "vite", label: "Vite", category: "Frontend" },
    
    // Backend Technologies
    { value: "nodejs", label: "Node.js", category: "Backend" },
    { value: "python", label: "Python", category: "Backend" },
    { value: "java", label: "Java", category: "Backend" },
    { value: "php", label: "PHP", category: "Backend" },
    { value: "go", label: "Go", category: "Backend" },
    { value: "csharp", label: "C#", category: "Backend" },
    { value: "ruby", label: "Ruby", category: "Backend" },
    { value: "rust", label: "Rust", category: "Backend" },
    { value: "scala", label: "Scala", category: "Backend" },
    { value: "kotlin", label: "Kotlin", category: "Backend" },
    { value: "express", label: "Express.js", category: "Backend" },
    { value: "django", label: "Django", category: "Backend" },
    { value: "flask", label: "Flask", category: "Backend" },
    { value: "spring", label: "Spring Boot", category: "Backend" },
    { value: "laravel", label: "Laravel", category: "Backend" },
    { value: "rails", label: "Ruby on Rails", category: "Backend" },
    
    // Databases
    { value: "mongodb", label: "MongoDB", category: "Database" },
    { value: "postgresql", label: "PostgreSQL", category: "Database" },
    { value: "mysql", label: "MySQL", category: "Database" },
    { value: "redis", label: "Redis", category: "Database" },
    { value: "elasticsearch", label: "Elasticsearch", category: "Database" },
    { value: "sqlite", label: "SQLite", category: "Database" },
    { value: "cassandra", label: "Cassandra", category: "Database" },
    { value: "dynamodb", label: "DynamoDB", category: "Database" },
    
    // Cloud & DevOps
    { value: "aws", label: "AWS", category: "Cloud/DevOps" },
    { value: "azure", label: "Azure", category: "Cloud/DevOps" },
    { value: "gcp", label: "Google Cloud", category: "Cloud/DevOps" },
    { value: "docker", label: "Docker", category: "Cloud/DevOps" },
    { value: "kubernetes", label: "Kubernetes", category: "Cloud/DevOps" },
    { value: "jenkins", label: "Jenkins", category: "Cloud/DevOps" },
    { value: "gitlab-ci", label: "GitLab CI", category: "Cloud/DevOps" },
    { value: "github-actions", label: "GitHub Actions", category: "Cloud/DevOps" },
    { value: "terraform", label: "Terraform", category: "Cloud/DevOps" },
    { value: "ansible", label: "Ansible", category: "Cloud/DevOps" },
    
    // Mobile Development
    { value: "react-native", label: "React Native", category: "Mobile" },
    { value: "flutter", label: "Flutter", category: "Mobile" },
    { value: "ios", label: "iOS (Swift)", category: "Mobile" },
    { value: "android", label: "Android (Java/Kotlin)", category: "Mobile" },
    { value: "xamarin", label: "Xamarin", category: "Mobile" },
    
    // Testing
    { value: "jest", label: "Jest", category: "Testing" },
    { value: "cypress", label: "Cypress", category: "Testing" },
    { value: "selenium", label: "Selenium", category: "Testing" },
    { value: "junit", label: "JUnit", category: "Testing" },
    { value: "pytest", label: "PyTest", category: "Testing" },
    { value: "mocha", label: "Mocha", category: "Testing" },
    
    // Version Control & Tools
    { value: "git", label: "Git", category: "Tools" },
    { value: "linux", label: "Linux", category: "Tools" },
    { value: "bash", label: "Bash/Shell Scripting", category: "Tools" },
    { value: "vim", label: "Vim", category: "Tools" },
    { value: "vscode", label: "VS Code", category: "Tools" },
    
    // Data & Analytics
    { value: "pandas", label: "Pandas", category: "Data Science" },
    { value: "numpy", label: "NumPy", category: "Data Science" },
    { value: "tensorflow", label: "TensorFlow", category: "Data Science" },
    { value: "pytorch", label: "PyTorch", category: "Data Science" },
    { value: "scikit-learn", label: "Scikit-learn", category: "Data Science" },
    { value: "r", label: "R", category: "Data Science" },
    { value: "sql", label: "SQL", category: "Data Science" },
    { value: "tableau", label: "Tableau", category: "Data Science" },
    { value: "powerbi", label: "Power BI", category: "Data Science" },
    
    // Other Technologies
    { value: "graphql", label: "GraphQL", category: "API" },
    { value: "rest", label: "REST APIs", category: "API" },
    { value: "microservices", label: "Microservices", category: "Architecture" },
    { value: "serverless", label: "Serverless", category: "Architecture" },
    { value: "blockchain", label: "Blockchain", category: "Emerging Tech" },
    { value: "web3", label: "Web3", category: "Emerging Tech" },
    { value: "ai-ml", label: "AI/Machine Learning", category: "Emerging Tech" },
  ];

  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: [], // Array for multi-select
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [sessionLoading, setSessionLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      setSessionLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(id));
      const session = response.data.session;
      
      // Convert session data to form format
      const roleValue = roleOptions.find(opt => opt.label === session.role)?.value || session.role;
      const experienceValue = experienceOptions.find(opt => opt.label === session.experience)?.value || session.experience;
      
      // Convert topics string to array of values
      let topicsArray = [];
      if (session.topicsToFocus) {
        const topicsLabels = session.topicsToFocus.split(', ');
        topicsArray = topicsLabels.map(label => {
          const topic = techStackOptions.find(opt => opt.label === label.trim());
          return topic ? topic.value : label.toLowerCase().replace(/[^a-z0-9]/g, '-');
        });
        
        // Add custom topics that weren't found in predefined options
        topicsLabels.forEach(label => {
          const trimmedLabel = label.trim();
          const customValue = trimmedLabel.toLowerCase().replace(/[^a-z0-9]/g, '-');
          if (!techStackOptions.some(opt => opt.label === trimmedLabel)) {
            techStackOptions.push({
              value: customValue,
              label: trimmedLabel,
              category: 'Custom'
            });
          }
        });
      }

      setFormData({
        role: roleValue,
        experience: experienceValue,
        topicsToFocus: topicsArray,
        description: session.description || "",
      });
    } catch (error) {
      setError("Failed to load session");
      console.error("Error fetching session:", error);
    } finally {
      setSessionLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle topic selection for multi-select
  const toggleTopic = (topicValue) => {
    setFormData((prevData) => {
      const currentTopics = prevData.topicsToFocus;
      const isSelected = currentTopics.includes(topicValue);
      
      if (isSelected) {
        // Remove topic
        return {
          ...prevData,
          topicsToFocus: currentTopics.filter(topic => topic !== topicValue)
        };
      } else {
        // Add topic
        return {
          ...prevData,
          topicsToFocus: [...currentTopics, topicValue]
        };
      }
    });
  };

  // Remove topic from selection
  const handleTopicRemove = (e, topicValue) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFormData((prevData) => ({
      ...prevData,
      topicsToFocus: prevData.topicsToFocus.filter(topic => topic !== topicValue)
    }));
  };

  // Filter topics by category
  const getFilteredTopics = () => {
    if (selectedFilter === 'all') {
      return techStackOptions;
    }
    return techStackOptions.filter(option => option.category === selectedFilter);
  };

  // Add custom topic
  const handleAddCustomTopic = () => {
    const trimmedTopic = customTopic.trim();
    if (!trimmedTopic) return;
    
    // Create a custom topic object
    const customTopicValue = trimmedTopic.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Check if it already exists (by label or value)
    const existsInPredefined = techStackOptions.some(
      option => option.label.toLowerCase() === trimmedTopic.toLowerCase() || 
                option.value === customTopicValue
    );
    const existsInSelected = formData.topicsToFocus.includes(customTopicValue);
    
    if (!existsInPredefined && !existsInSelected) {
      // Add to tech stack options for this session
      techStackOptions.push({
        value: customTopicValue,
        label: trimmedTopic,
        category: 'Custom'
      });
      
      // Add to selected topics
      setFormData((prevData) => ({
        ...prevData,
        topicsToFocus: [...prevData.topicsToFocus, customTopicValue]
      }));
    } else if (!existsInSelected) {
      // If it exists in predefined but not selected, just add to selected
      const existingTopic = techStackOptions.find(
        option => option.label.toLowerCase() === trimmedTopic.toLowerCase()
      );
      if (existingTopic) {
        setFormData((prevData) => ({
          ...prevData,
          topicsToFocus: [...prevData.topicsToFocus, existingTopic.value]
        }));
      }
    }
    
    setCustomTopic('');
  };

  const handleUpdateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus || topicsToFocus.length === 0) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Get the role and experience labels for display and API call
      const selectedRole = roleOptions.find(option => option.value === role);
      const selectedExperience = experienceOptions.find(option => option.value === experience);
      const roleLabel = selectedRole ? selectedRole.label : role;
      const experienceLabel = selectedExperience ? selectedExperience.label : experience;
      
      // Convert selected topics to readable labels and format as string
      const selectedTopicLabels = topicsToFocus.map(topicValue => {
        const topic = techStackOptions.find(option => option.value === topicValue);
        return topic ? topic.label : topicValue;
      });
      const topicsString = selectedTopicLabels.join(', ');

      // First, generate new questions based on updated session info
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: roleLabel,
          experience: experienceLabel,
          topicsToFocus: topicsString,
          numberOfQuestions: 10,
        }
      );

      // Should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      // Update session with new questions
      const response = await axiosInstance.put(API_PATHS.SESSION.UPDATE(id), {
        role: roleLabel, // Store the readable label in the database
        experience: experienceLabel, // Store the readable experience label
        topicsToFocus: topicsString, // Store as comma-separated string
        description: formData.description,
        questions: generatedQuestions, // Include the new questions
      });

      if (response.data?.success) {
        toast.success("Session updated successfully with new questions!", {
          position: "bottom-center",
          duration: 3000,
          style: {
            padding: "10px",
            border: "1px solid #bffcd9",
            background: "#ecfdf3",
            color: "#008a2e"
          },
        });
        navigate(`/interview-prep/${id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <SpinnerLoader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-sm mx-auto sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:min-w-5xl">
          {/* Header */}
          <div className="mb-2">
            <Button 
              variant="ghost" 
              className="mb-6 text-slate-600 hover:text-slate-900"
              onClick={() => navigate('/interview-prep')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sessions
            </Button>
          </div>

          {/* Main Form Card */}
          <Card className="shadow-xl border bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-slate-900">Edit Interview Session</CardTitle>
              <CardDescription className="text-base text-slate-600">
                Update your interview practice session settings
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleUpdateSession} className="space-y-8">
                {/* Target Role & Experience Level Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      Target Role <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select your target IT role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      Experience Level <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.experience} onValueChange={(value) => handleChange("experience", value)}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Topics to Focus On */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    Topics to Focus On <span className="text-red-500">*</span>
                  </Label>

                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    {/* Selected Topics Display */}
                    {formData.topicsToFocus.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.topicsToFocus.map((topicValue) => {
                          const topic = techStackOptions.find(option => option.value === topicValue);
                          return (
                            <Badge
                              key={topicValue}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 cursor-pointer flex items-center gap-1"
                              onClick={(e) => handleTopicRemove(e, topicValue)}
                            >
                              {topic ? topic.label : topicValue}
                              <X className="w-3 h-3" />
                            </Badge>
                          );
                        })}
                      </div>
                    )}

                    {/* Category Filters */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[
                          { key: 'all', label: 'All Categories', color: 'bg-gray-600 hover:bg-gray-700' },
                          { key: 'Frontend', label: 'Frontend', color: 'bg-blue-600 hover:bg-blue-700' },
                          { key: 'Backend', label: 'Backend', color: 'bg-green-600 hover:bg-green-700' },
                          { key: 'Database', label: 'Database', color: 'bg-purple-600 hover:bg-purple-700' },
                          { key: 'Cloud/DevOps', label: 'Cloud/DevOps', color: 'bg-orange-600 hover:bg-orange-700' },
                          { key: 'Mobile', label: 'Mobile', color: 'bg-pink-600 hover:bg-pink-700' },
                          { key: 'Data Science', label: 'Data Science', color: 'bg-indigo-600 hover:bg-indigo-700' },
                        ].map((filter) => (
                          <Badge
                            key={filter.key}
                            className={`cursor-pointer text-white px-3 py-1 transition-colors ${
                              selectedFilter === filter.key ? filter.color : 'bg-gray-400 hover:bg-gray-500'
                            }`}
                            onClick={() => setSelectedFilter(filter.key)}
                          >
                            {filter.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Custom Topic Input */}
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom technology/tool..."
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomTopic();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddCustomTopic}
                          disabled={!customTopic.trim()}
                          className="px-4 py-2 text-sm"
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {/* Available Topics */}
                    <div className="flex flex-wrap gap-2">
                      {getFilteredTopics()
                        .filter((option) => !formData.topicsToFocus.includes(option.value))
                        .slice(0, showAllTopics ? undefined : 12)
                        .map((option) => (
                          <Badge
                            key={option.value}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            onClick={() => toggleTopic(option.value)}
                          >
                            + {option.label}
                          </Badge>
                        ))}
                    </div>

                    {/* Show More/Less Button */}
                    {getFilteredTopics().filter(option => !formData.topicsToFocus.includes(option.value)).length > 12 && (
                      <div className="mt-3 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAllTopics(!showAllTopics)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {showAllTopics ? 'Show Less' : `Show More (${getFilteredTopics().filter(option => !formData.topicsToFocus.includes(option.value)).length - 12} more)`}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    Description (Optional)
                  </Label>
                  <Textarea
                    placeholder="Any specific goals or notes for this session..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="min-h-[120px] border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Update Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading && <SpinnerLoader />}
                    Update Session
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditInterviewSession;